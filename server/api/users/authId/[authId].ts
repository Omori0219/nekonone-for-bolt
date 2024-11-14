import { defineEventHandler } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'

/**
 * 指定された識別子に対応するユーザーがCosmos DBに存在するかどうかを確認します。
 *
 * @param {string} authId - ユーザーの認証に使用した識別子。
 * @returns {Promise<boolean>} ユーザーが存在する場合はtrue、存在しない場合はfalse。
 */
export default defineEventHandler(async (event) => {
  try {
    if (event.context.params == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'event is required',
      })
    }
    const authId = event.context.params.authId
    if (authId == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'authId is required',
      })
    }
    const container = getContainer('users')
    const query = 'SELECT * FROM users u WHERE u.authId = @authId'
    const { resources: foundItems } = await container.items
      .query({
        query,
        parameters: [{ name: '@authId', value: authId }],
      })
      .fetchAll()
    return foundItems.length > 0
  } catch (error) {
    setResponseStatus(event, 500)
    console.error('Error checking user existence:', error) // eslint-disable-line no-console
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
