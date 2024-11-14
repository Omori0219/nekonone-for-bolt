import { BlobServiceClient, type ContainerClient } from '@azure/storage-blob'

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING

let blobServiceClientInstance: BlobServiceClient | null = null

// BlobServiceClientのインスタンスを初期化する関数
export function initializeBlobServiceClient(): BlobServiceClient {
  if (blobServiceClientInstance !== null) {
    return blobServiceClientInstance
  }

  if (AZURE_STORAGE_CONNECTION_STRING == null) {
    throw new Error(
      '環境変数AZURE_STORAGE_CONNECTION_STRINGが設定されていません。'
    )
  }

  blobServiceClientInstance = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  )
  return blobServiceClientInstance
}

// Blobストレージにファイルをアップロードする関数
export async function uploadToBlobStorage(
  buffer: Buffer,
  containerName: string,
  blobName: string
): Promise<string> {
  const blobServiceClient = initializeBlobServiceClient()
  const containerClient: ContainerClient =
    blobServiceClient.getContainerClient(containerName)

  // コンテナが存在しない場合は作成する
  const createContainerResponse = await containerClient.createIfNotExists({
    access: 'container',
  })
  if (createContainerResponse.succeeded) {
    console.log(`新しいコンテナを作成しました: ${containerName}`) // eslint-disable-line no-console
  }

  // Blobをアップロードする
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)
  await blockBlobClient.uploadData(buffer)

  // アップロードされたBlobのURLを返す
  return blockBlobClient.url
}
