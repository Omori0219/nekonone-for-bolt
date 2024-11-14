import { defineEventHandler, createError } from 'h3'
import { getContainer } from '../../utils/cosmosClient'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const likedUserId = query.likedUserId as string
    const likedPostId = query.likedPostId as string

    if (!likedUserId || !likedPostId) {
      throw new TypeError('likedUserId and likedPostId are required')
    }

    const likesContainer = getContainer('likes')
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

    return likes
  } catch (error) {
    console.error('Error fetching likes:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
