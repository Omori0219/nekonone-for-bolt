import { defineEventHandler, createError } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'

export default defineEventHandler(async (event) => {
  try {
    // event.context.queryがundefinedでないことを確認し、limitを取得
    const rawLimit = event.context.query?.limit
    const limit = Number.isInteger(parseInt(rawLimit as string, 20))
      ? parseInt(rawLimit as string, 20)
      : 20

    const container = getContainer('users')
    const query = `
      SELECT TOP @limit u.userId, u.userScreenName, u.userIconPath, u.subscription.createdAt
      FROM users u
      WHERE u.isSubscribed = true
      ORDER BY u.subscription.amount DESC
    `
    const { resources: sponsorUsers } = await container.items
      .query({
        query,
        parameters: [{ name: '@limit', value: limit }],
      })
      .fetchAll()
    // sponsorUsersの各ユーザーについて、subscription.createdAtをsubscriptionStartDateに変更
    const mappedSponsorUsers = sponsorUsers.map((user) => ({
      ...user,
      subscriptionCreatedAt: user.createdAt,
    }))
    return mappedSponsorUsers
  } catch (error: unknown) {
    // errorをunknown型として扱う
    // errorがErrorインスタンスであるかを確認
    if (error instanceof Error) {
      console.error('Error fetching premium users:', error) // eslint-disable-line no-console
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error: Unable to fetch premium users.',
        data: { message: error.message },
      })
    }
    // errorがErrorインスタンスでない場合の処理
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Unable to fetch premium users.',
      data: { message: 'An unknown error occurred.' },
    })
  }
})
