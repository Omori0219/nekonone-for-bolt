import { defineEventHandler } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'

/**
 * 指定されたユーザーIDに対応するユーザー情報をCosmos DBから取得します。
 *
 * @param {string} userId - ユーザーの一意識別子。
 * @returns {Promise<User|null>} ユーザー情報のオブジェクト、または見つからない場合はnull。
 */
export default defineEventHandler(async (event) => {
  try {
    if (event.context.params == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'userId is required',
      })
    }
    // リクエストのuserIdパラメータを検証
    const userId = event.context.params.userId
    if (userId == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'userId is required',
      })
    }
    const container = getContainer('users')
    // cosmosDBからuserIdを参考にユーザー情報を取得するクエリ
    const query = 'SELECT * FROM users u WHERE u.userId = @userId'
    // クエリを実行し結果を取得する
    const { resources: foundItems } = await container.items
      .query({
        query,
        parameters: [{ name: '@userId', value: userId }],
      })
      .fetchAll()
    // ユーザー情報を取得できなかった場合
    if (foundItems.length === 0) {
      setResponseStatus(event, 404)
      return null
    }
    // ユーザー情報を取得できた場合、ユーザー情報を返す
    return foundItems[0]
  } catch (error) {
    setResponseStatus(event, 500)
    console.error('Error retrieving user information:', error) // eslint-disable-line no-console
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
