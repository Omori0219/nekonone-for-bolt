import { defineEventHandler, createError, getQuery } from 'h3'
import { getContainer } from '../../utils/cosmosClient'
// 定数の定義
const DEFAULT_LIMIT = 10
const ORDER_BY_DESC = 'DESC'
const ORDER_BY_ASC = 'ASC'
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { params } = event.context
    if (params?.userId == null) {
      throw createError({
        statusCode: 400,
        message: 'userId is required',
      })
    }
    const userId = params.userId
    const queryLimit = query.limit
    const limit = Number.isInteger(Number(queryLimit))
      ? Number(queryLimit)
      : DEFAULT_LIMIT
    const orderBy = query.orderBy === 'asc' ? ORDER_BY_ASC : ORDER_BY_DESC // デフォルトは降順（新しい順）

    const container = getContainer('footprints')
    const cosmosQuery = `SELECT * FROM c WHERE c.visitedUserId = @userId ORDER BY c.createdAt ${orderBy} OFFSET 0 LIMIT @limit`
    const { resources: footprints } = await container.items
      .query({
        query: cosmosQuery,
        parameters: [
          { name: '@userId', value: userId },
          { name: '@limit', value: limit },
        ],
      })
      .fetchAll()
    // 該当のユーザーに関連する足跡がない場合は空の配列を返す
    if (footprints.length === 0) {
      return []
    }
    return footprints.map((footprint) => {
      // 型アサーションを使用して `createdAt` と `updatedAt` が文字列であることを明示
      const createdAt = new Date(footprint.createdAt as string).toISOString()
      const updatedAt = new Date(footprint.updatedAt as string).toISOString()

      return {
        ...footprint,
        createdAt,
        updatedAt,
      }
    })
  } catch (error) {
    // エラーログはサーバーのログファイルに記録するなど、適切なロギングメカニズムを使用する
    // 例: `console.error` の代わりに `winston` や `pino` などのロギングライブラリを使用する
    // console.error('Error retrieving footprints:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error', // `statusMessage` ではなく `message` を使用する
    })
  }
})
