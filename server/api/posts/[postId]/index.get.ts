import { defineEventHandler } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'
import { type CreatedPostData } from '@/types/post'

// 投稿を取得するイベントハンドラを定義します。
export default defineEventHandler(async (event) => {
  try {
    // イベントからpostIdとauthorUserIdを取得します。
    const postId = event.context.params?.postId
    const authorUserId = event.context.query?.userId as string | undefined

    // postIdが存在しない場合はエラーをスローします。
    if (!postId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing postId parameter',
      })
    }

    // 'posts'という名前のコンテナを取得します。
    const container = getContainer('posts')

    let post: CreatedPostData | undefined
    if (authorUserId) {
      // authorUserIdが指定されている場合は、パーティションキーを使用してクエリを実行します。
      const { resource } = await container
        .item(postId, authorUserId)
        .read<CreatedPostData>()
      post = resource
    } else {
      // authorUserIdが指定されていない場合は、クロスパーティションクエリを実行します。
      const { resources } = await container.items
        .query<CreatedPostData>({
          query: 'SELECT * FROM c WHERE c.id = @postId',
          parameters: [{ name: '@postId', value: postId }],
        })
        .fetchNext()
      post = resources[0]
    }

    // 投稿が存在しない場合はエラーをスローします。
    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
      })
    }

    // 投稿を返します。
    return post
  } catch (error) {
    // エラーオブジェクトの型を具体的に定義します。
    const err = error as { statusCode?: number }
    console.error('Error fetching post:', err) // eslint-disable-line no-console
    // エラーが404の場合は、投稿が見つからないことを示すエラーをスローします。
    if (err.statusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
      })
    }
    // それ以外のエラーの場合は、内部サーバーエラーをスローします。
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
