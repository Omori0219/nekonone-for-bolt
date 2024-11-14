import { defineEventHandler, createError } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'
/**
 * 指定されたユーザーIDに基づいてユーザーの公開情報を取得します。
 * 公開情報には以下が含まれます:
 * - userId: ユーザーID
 * - userScreenName: ユーザーの表示名
 * - userIconPath: ユーザーのアイコン画像のパス
 * - createdAt: アカウントの作成日時
 * - updatedAt: アカウントの更新日時
 * - followCount: フォローしているユーザーの数
 * - followerCount: フォロワーの数
 * - isSubscribed: サブスクリプションの状態
 * - score : ユーザーの得点
 * - userProfileText (任意): ユーザーのプロフィールテキスト
 * - userSocialLinks (任意): ユーザーのソーシャルリンク
 * - catProfile (任意): ユーザーの猫のプロフィール
 *
 * @param {string} userId - ユーザーの一意識別子。
 * @returns {Promise<Object|null>} ユーザーの公開情報のオブジェクト、または見つからない場合はnull。
 */
function createPublicUserInfoQuery() {
  const baseQuery =
    'SELECT u.userId, u.userScreenName, u.userIconPath, u.createdAt, u.updatedAt, u.followCount, u.followerCount, u.isSubscribed,u.score'
  let query = baseQuery

  // userProfileTextとuserSocialLinksが存在する場合はクエリに追加
  query += ', u.userProfileText, u.userSocialLinks'

  // catProfileが存在する場合はクエリに追加
  query += ', u.catProfile'

  query += ' FROM users u WHERE u.userId = @userId'

  return query
}

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

    const container = getContainer('users')
    const query = createPublicUserInfoQuery()
    const { resources: foundItems } = await container.items
      .query({
        query,
        parameters: [{ name: '@userId', value: userId }],
      })
      .fetchAll()

    if (foundItems.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    return foundItems[0]
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
