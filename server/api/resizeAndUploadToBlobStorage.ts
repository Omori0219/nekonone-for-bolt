import {
  defineEventHandler,
  createError,
  readBody,
  setResponseStatus,
} from 'h3'
import fetch from 'node-fetch'
import sharp from 'sharp'
import { initializeBlobServiceClient } from '../utils/blobStorageClient'

// 画像を取得し、リサイズする関数
const fetchAndResizeImage = async (
  imageUrl: string,
  width: number,
  height: number
) => {
  const response = await fetch(imageUrl)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return await sharp(buffer).resize(width, height).toBuffer()
}

// ストレージにアップする関数
const uploadToBlobStorage = async (
  resizedBuffer: Buffer,
  containerName: string
) => {
  if (containerName == null) {
    throw new Error('ストレージの環境変数が設定されてません')
  }
  const blobServiceClient = initializeBlobServiceClient()
  const containerClient = blobServiceClient.getContainerClient(containerName)
  const blobName = `cat-icon-${Date.now()}.jpg`
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)
  const blobHTTPHeaders = { blobContentType: 'image/jpeg' }
  await blockBlobClient.upload(resizedBuffer, resizedBuffer.length, {
    blobHTTPHeaders,
  })
  // 環境変数からCDNのエンドポイントを取得
  const cdnEndpoint = process.env.CDN_ENDPOINT
  return `https://${cdnEndpoint}/${containerName}/${blobName}`
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const {
      imageUrl,
      containerName,
      width,
      height,
    }: {
      imageUrl: string
      containerName: string
      width: number
      height: number
    } = body
    // 画像の取得とリサイズ
    const resizedBuffer = await fetchAndResizeImage(imageUrl, width, height)
    // ストレージへの保存
    const uploadedImageUrl = await uploadToBlobStorage(
      resizedBuffer,
      containerName
    )
    // ストレージに保存された生成画像のURLを返す
    return { success: true, image: uploadedImageUrl }
  } catch (error) {
    setResponseStatus(event, 500)
    console.error('Error upload image to blob storage:', error) // eslint-disable-line no-console
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
