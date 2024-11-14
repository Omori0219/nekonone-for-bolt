import {
  defineEventHandler,
  createError,
  readBody,
  setResponseStatus,
} from 'h3'
import { getContainer } from '../utils/cosmosClient'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (body == null || typeof body !== 'object' || body.userId == null) {
      throw createError({
        statusCode: 400,
        statusMessage: '無効なユーザーデータ',
      })
    } // userIdをidフィールドに設定
    const userData = { ...body, id: body.userId }
    const container = getContainer('users')
    const { resource: createdItem } = await container.items.create(userData)
    return { success: true, createdItem }
  } catch (error) {
    // エラーハンドリング: ステータスコード500を設定し、エラーメッセージをログに記録
    setResponseStatus(event, 500)
    console.error('Error create userData:', error) // eslint-disable-line no-console
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
