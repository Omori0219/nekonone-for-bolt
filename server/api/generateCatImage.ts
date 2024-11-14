import {
  defineEventHandler,
  createError,
  readBody,
  setResponseStatus,
} from 'h3'
import { AzureKeyCredential, OpenAIClient } from '@azure/openai'
import createCatImagePrompt from '../utils/createCatImagePrompt'
import { validateField } from '../../utils/catProfileUtils'
import { type CatProfile } from '@/types/catProfile'

const openaiEndPoint = 'https://usedalle3.openai.azure.com/'
const openaiApiKeyUseDalle3 = process.env.OPENAI_API_KEY_USE_DALLE3 ?? ''

// OpenAIクライアントの初期化と画像の生成を行う関数
const generateImageWithOpenAI = async (prompt: string) => {
  if (openaiApiKeyUseDalle3 === '') {
    throw new Error('openaiAPIの環境変数が設定されてません')
  }
  const client = new OpenAIClient(
    openaiEndPoint,
    new AzureKeyCredential(openaiApiKeyUseDalle3)
  )
  if (client == null) {
    throw new Error('OpenAIクライアントが初期化できませんでした')
  }
  const deploymentName = 'generateCatImage'
  const size = '1024x1024'
  const n = 1
  const imageResponse = await client.getImages(deploymentName, prompt, {
    n,
    size,
  })

  const imageUrl = imageResponse.data[0].url
  if (typeof imageUrl !== 'string') {
    throw new TypeError('画像のURLが正しく生成されませんでした。')
  }

  return imageUrl
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const catInfo: CatProfile = body
    // 入力バリデーション
    for (const key in catInfo) {
      const value = catInfo[key as keyof CatProfile]
      if (typeof value === 'undefined')
        throw new Error(`${key}は必須のフィールドです。`)
      const errorMessage = validateField(value)
      if (errorMessage !== null) {
        throw new Error(errorMessage)
      }
    }
    // プロンプト生成
    const prompt = createCatImagePrompt(catInfo)
    // OpenAIクライアントの初期化と画像の生成
    const imageUrl = await generateImageWithOpenAI(prompt)
    // 生成画像のURLを返す
    return { success: true, image: imageUrl }
  } catch (error) {
    console.error('Error create catImage:', error) // eslint-disable-line no-console
    if (isErrorWithCode(error) && error.code === 'contentFilter') {
      setResponseStatus(event, 400)
      return createError({
        statusCode: 400,
        statusMessage:
          '生成された内容が安全基準に違反しているため、画像を生成できませんでした。',
      })
    }
    setResponseStatus(event, 500)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
// エラーオブジェクトが特定の構造を持つかチェックするユーザー定義の型ガード
function isErrorWithCode(error: unknown): error is { code: string } {
  return typeof error === 'object' && error !== null && 'code' in error
}
