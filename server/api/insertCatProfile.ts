import {
  defineEventHandler,
  createError,
  readBody,
  setResponseStatus,
  type H3Event,
} from 'h3'
import { type Container } from '@azure/cosmos'
import { getContainer } from '../utils/cosmosClient'
import { type CatProfile } from '@/types/catProfile'
// リクエストボディの型を定義
interface CatProfileRequestBody {
  userId: string
  catProfile: CatProfile
}
// カスタムエラー型の定義
interface CustomError extends Error {
  statusCode?: number
  statusMessage?: string
}

// ユーザーの猫のプロファイルをデータベースに挿入するイベントハンドラー
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // リクエストボディのバリデーション
    if (!isValidCatProfile(body)) {
      throw createError({
        statusCode: 400,
        statusMessage: '無効なリクエストボディ',
      })
    }

    const container = getContainer('users')
    const user = await findUserById(container, body.userId)

    // ユーザーの猫のプロファイルを更新
    user.catProfile = body.catProfile
    await container.items.upsert(user)

    return { success: true }
  } catch (error) {
    // エラーハンドリングを関数に分離
    return handleInsertCatProfileError(event, error)
  }
})

// リクエストボディが有効な猫のプロファイルかどうかをチェックする関数
function isValidCatProfile(body: unknown): body is CatProfileRequestBody {
  const typedBody = body as CatProfileRequestBody
  return (
    typedBody != null &&
    typeof typedBody === 'object' &&
    typeof typedBody.userId === 'string' &&
    typedBody.catProfile != null &&
    typeof typedBody.catProfile === 'object' &&
    typeof typedBody.catProfile.breed === 'string' &&
    typeof typedBody.catProfile.eyeColor === 'string' &&
    typeof typedBody.catProfile.personality === 'string' &&
    typeof typedBody.catProfile.favorite === 'string' &&
    typeof typedBody.catProfile.others === 'string'
  )
}

// 指定されたIDでユーザーを検索する関数
async function findUserById(container: Container, userId: string) {
  const { resources: users } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.userId = @userId',
      parameters: [{ name: '@userId', value: userId }],
    })
    .fetchAll()

  if (users.length !== 1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ユーザーが見つかりません',
    })
  }

  return users[0]
}

// エラーオブジェクトがCustomError型であるかをチェックする型ガード
function isCustomError(error: unknown): error is CustomError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'statusMessage' in error
  )
}

// エラーハンドリングを行う関数
function handleInsertCatProfileError(event: H3Event, error: unknown) {
  // errorがCustomError型であることを確認
  if (isCustomError(error)) {
    const statusCode = error.statusCode ?? 500
    setResponseStatus(event, statusCode)
    // eslint-disable-next-line no-console
    console.error('Error inserting cat profile:', error)
    return createError({
      statusCode,
      statusMessage: error.statusMessage ?? 'Internal Server Error',
    })
  } else {
    // errorがCustomError型でない場合の処理
    setResponseStatus(event, 500)
    // eslint-disable-next-line no-console
    console.error('An unexpected error occurred:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
}
