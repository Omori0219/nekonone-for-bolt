import { CosmosClient } from '@azure/cosmos'

let clientInstance: CosmosClient | null = null

// Cosmos DBクライアントの初期化を行う関数
export function initializeCosmosClient(): CosmosClient {
  if (clientInstance !== null) {
    return clientInstance
  }
  const endpoint = process.env.COSMOS_DB_ENDPOINT ?? ''
  const key = process.env.COSMOS_DB_KEY ?? ''
  const databaseName = process.env.COSMOS_DB_DATABASE_NAME ?? ''

  if (endpoint == null || key == null || databaseName == null) {
    throw new Error('環境変数が設定されていません。')
  }

  clientInstance = new CosmosClient({ endpoint, key })
  return clientInstance
}
// 指定されたコンテナ名でCosmos DBのコンテナ参照を取得する関数
export function getContainer(containerName: string) {
  const client = initializeCosmosClient()
  const databaseName = process.env.COSMOS_DB_DATABASE_NAME
  if (databaseName == null) {
    throw new Error('環境変数COSMOS_DB_DATABASE_NAMEが設定されていません。')
  }
  const database = client.database(databaseName)
  const container = database.container(containerName)
  return container
}
