import { defineEventHandler, createError } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'

/**
 * 指定されたユーザーIDに基づいてユーザーのサブスクリプションIDを取得します。
 *
 * @param {string} userId - ユーザーの一意識別子。
 * @returns {Promise<Object|null>} ユーザーのサブスクリプションIDのオブジェクト、または見つからない場合はnull。
 */

export default defineEventHandler(async (event) => {
  try {
    if (event.context.params == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'event is required',
      })
    }
    const userId = event.context.params.userId
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required',
      })
    }
    //  ユーザーIDを参照にしてユーザー情報を取得する
    const container = getContainer('users')
    // 注意：idとパーテーションキーがどちらもuserIdであること。
    const { resource: user } = await container.item(userId, userId).read()

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }
    // ユーザーのサブスクリプションIDを返す
    return { subscriptionId: user.subscription.id }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
