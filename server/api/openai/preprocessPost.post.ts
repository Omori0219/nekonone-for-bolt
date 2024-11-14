// 必要なモジュールをインポートします
import { defineEventHandler, createError, readBody } from 'h3'
import { AzureKeyCredential, OpenAIClient } from '@azure/openai'
import createPostPrompt from '../../utils/prompt/createPost'

// OpenAIのエンドポイントとAPIキーを設定します
const openaiEndPoint = process.env.OPENAI_ENDPOINT_BASE ?? ''
const openaiApiKey = process.env.OPENAI_API_KEY_BASE ?? ''
const deploymentId = process.env.OPENAI_DEPLOYMENT_ID ?? ''

// テキストを前処理する非同期関数を定義します
const preprocessPost = async (text: string) => {
  // APIキーが設定されていない場合はエラーをスローします
  if (openaiEndPoint === '' || openaiApiKey === '' || deploymentId === '') {
    throw new Error('OpenAI APIの環境変数が設定されていません')
  }

  // OpenAIクライアントを初期化します
  const client = new OpenAIClient(
    openaiEndPoint,
    new AzureKeyCredential(openaiApiKey)
  )
  // クライアントが正しく初期化されなかった場合はエラーをスローします
  if (client == null) {
    throw new Error('OpenAIクライアントが初期化できませんでした')
  }
  // console.log(`「${text}」`)
  // プロンプトを作成します
  const prompt = createPostPrompt()
  // メッセージを作成します
  const messages = [
    {
      role: 'system',
      content: prompt,
    },
    { role: 'user', content: `変換対象の文章「${text}」` },
  ]
  // OpenAI APIにリクエストを送信し、レスポンスを取得します
  const response = await client.getChatCompletions(deploymentId, messages, {
    responseFormat: { type: 'json_object' },
  })

  // レスポンスが空の場合はエラーをスローします
  if (!response.choices[0].message?.content) {
    throw new Error('OpenAIからのレスポンスが空です')
  }

  // レスポンスをフォーマットします
  const formatResponse = response.choices[0].message.content
  console.log(formatResponse)
  // フォーマットしたレスポンスを返します
  return formatResponse
}

// イベントハンドラをエクスポートします
export default defineEventHandler(async (event) => {
  try {
    // リクエストボディを読み込みます
    const body = await readBody(event)
    const { text } = body

    // テキストが文字列でない場合はエラーをスローします
    if (typeof text !== 'string') {
      throw new TypeError('テキストは必須のフィールドです')
    }

    // テキストを前処理し、結果を取得します
    const result = await preprocessPost(text)

    // 結果を返します
    return result
  } catch (error) {
    // エラーが発生した場合は、それをログに出力し、500エラーをスローします
    console.error('Error preprocessing post:', error) //eslint-disable-line
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
