import { defineEventHandler, createError, readBody } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'
import { type LikeOperation } from '@/types/like'
export default defineEventHandler(async (event) => {
  try {
    const postId = event?.context?.params?.postId
    if (!postId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'postId is required',
      })
    }
    const body = await readBody<{ operation: LikeOperation }>(event)
    const { operation } = body

    const postsContainer = getContainer('posts')

    const { resources } = await postsContainer.items
      .query({
        query: 'SELECT * FROM c WHERE c.id = @postId',
        parameters: [{ name: '@postId', value: postId }],
      })
      .fetchAll()

    if (resources.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
      })
    }
    const post = resources[0]
    // いいね数を加算または減算します。
    post.likesCount += operation === 'increment' ? 1 : -1
    await postsContainer.items.upsert(post)

    return post
  } catch (error) {
    console.error('Error updating post likes count:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
