import { defineEventHandler, createError, readBody } from 'h3'
import { v4 as uuidv4 } from 'uuid'
import { getContainer } from '../../utils/cosmosClient'
import { type LikeRequestData } from '@/types/like'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LikeRequestData>(event)
    const { likedUserId, likedPostId, likedReplyId } = body

    if (typeof likedPostId !== 'string') {
      throw new TypeError('likedPostId is required')
    }
    if (typeof likedUserId !== 'string') {
      throw new TypeError('likedUserId is required')
    }
    const likesContainer = getContainer('likes')

    const like = {
      id: uuidv4(),
      likedUserId,
      likedPostId,
      likedReplyId,
      createdAt: new Date().toISOString(),
    }
    await likesContainer.items.create(like)

    return like
  } catch (error) {
    console.error('Error creating like:', error) // eslint-disable-line no-console
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
