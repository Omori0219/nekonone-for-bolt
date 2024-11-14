import { defineEventHandler, createError, setResponseStatus } from 'h3'
import { getContainer } from '../../utils/cosmosClient'

/**
 * 指定されたユーザーIDが既に使用されているかどうかをチェックします。
 *
 * @param {string} userId - チェックするユーザーの一意識別子。
 * @returns {Promise<{isAvailable: boolean}>} ユーザーIDが利用可能な場合はtrue、そうでない場合はfalse。
 */
export default defineEventHandler(async (event) => {
  try {
    // リクエストからuserIdパラメータを取得し、検証する
    const userId = event.context.params?.userId
    if (userId == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'userId parameter is required',
      })
    }
    const container = getContainer('users')
    // Cosmos DBから指定されたuserIdを検索するクエリを実行
    // 指定されたuserIdを持つユーザーの数をカウントする。
    const query = 'SELECT VALUE COUNT(1) FROM users u WHERE u.userId = @userId'
    const { resources: count } = await container.items
      .query({ query, parameters: [{ name: '@userId', value: userId }] })
      .fetchAll()
    // userIdが既に存在するかどうかをチェック
    // count[0]が0の場合、該当userIdはなかったとみなし、userIdは利用可能です。
    const isAvailable = count[0] === 0
    return { isAvailable }
  } catch (error) {
    // エラーハンドリング: ステータスコード500を設定し、エラーメッセージをログに記録
    setResponseStatus(event, 500)
    console.error('Error checking userId availability:', error) // eslint-disable-line no-console
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
