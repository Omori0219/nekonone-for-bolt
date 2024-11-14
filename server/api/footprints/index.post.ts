import {
  defineEventHandler,
  createError,
  readBody,
  setResponseStatus,
} from 'h3'
import { getContainer } from '../../utils/cosmosClient'

const containerName = 'footprints' // Cosmos DBのコンテナー名
// TODO:セキュリティのために、認証されたユーザーのみがこのエンドポイントにアクセスできるようにする必要があるかも
export default defineEventHandler(async (event) => {
  try {
    if (event.method !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'HTTP method is not allowed.',
      })
    }
    const body = await readBody(event)
    if (body == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'リクエストボディが空です',
      })
    }
    const { visitorUserId, visitedUserId } = body
    if (visitedUserId == null) {
      throw createError({
        statusCode: 400,
        statusMessage: '訪問されたユーザーIDが指定されていません',
      })
    }
    if (visitorUserId == null) {
      throw createError({
        statusCode: 400,
        statusMessage: '訪問者のユーザーIDが指定されていません',
      })
    }
    const container = getContainer(containerName) // Cosmos DBのコンテナーを取得
    const footprintId = `${visitorUserId}-${visitedUserId}` // 足跡のIDは訪問者のIDと訪問されたユーザーのIDを組み合わせて作成
    let existingFootprint
    try {
      const response = await container.item(footprintId, visitedUserId).read()
      existingFootprint = response.resource
    } catch (error) {
      // errorがErrorインスタンスであるかチェック
      if (error instanceof Error && 'code' in error) {
        // Cosmos DBが404エラーを返した場合、アイテムは存在しません
        if (error.code === 404) {
          existingFootprint = undefined
        } else {
          throw error
        }
      } else {
        throw new Error('An unexpected error occurred')
      }
    }
    let updatedItem
    if (existingFootprint != null) {
      // 既存の足跡がある場合は、updatedAtのみ更新
      updatedItem = {
        ...existingFootprint,
        updatedAt: new Date().toISOString(),
      }
    } else {
      // 新しい足跡の場合は、createdAtとupdatedAtを設定
      updatedItem = {
        id: footprintId,
        visitorUserId,
        visitedUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
    // upsertメソッドを使用して、ドキュメントを更新または作成
    await container.items.upsert(updatedItem)

    return { success: true, updatedItem }
  } catch (error) {
    // エラーハンドリング: ステータスコード500を設定し、エラーメッセージをログに記録
    setResponseStatus(event, 500)
    console.error('Error updating footprint:', error) // eslint-disable-line no-console
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
