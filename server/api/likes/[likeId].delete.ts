import { defineEventHandler, createError } from 'h3'
import { getContainer } from '../../utils/cosmosClient'
import { type LikeRequestData } from '@/types/like'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LikeRequestData>(event)
    const { likedUserId, likedPostId } = body

    if (typeof likedPostId !== 'string') {
      throw new TypeError('likedPostId is required')
    }
    if (typeof likedUserId !== 'string') {
      throw new TypeError('likedUserId is required')
    }
    const likesContainer = getContainer('likes')

    // クロスパーティションクエリを使用して対象のアイテムを検索します。
    const { resources: likes } = await likesContainer.items
      .query({
        query:
          'SELECT * FROM c WHERE c.likedUserId = @likedUserId AND c.likedPostId = @likedPostId',
        parameters: [
          { name: '@likedUserId', value: likedUserId },
          { name: '@likedPostId', value: likedPostId },
        ],
      })
      .fetchAll()

    if (likes.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Like not found',
      })
    }

    // パーティションキーとアイテムIDを使用してアイテムを削除します。
    const { resource: like } = await likesContainer
      .item(likes[0].id, likedUserId)
      .delete()

    return like
  } catch (error) {
    console.error('Error deleting like:', error) // eslint-disable-line no-console
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
