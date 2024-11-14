import { ref } from 'vue'

export function useStorage() {
  const error = ref<string | null>(null)

  // 画像をリサイズしストレージにアップロードする関数
  const resizeAndUploadToBlobStorage = async (
    imageUrl: string,
    containerName: string,
    width: number,
    height: number
  ): Promise<string> => {
    // 戻り値の型をPromise<string>として明示
    try {
      const response = await fetch('/api/resizeAndUploadToBlobStorage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, containerName, width, height }),
      })

      if (!response.ok) {
        throw new Error('Failed to upload image to blob storage')
      }

      const data = await response.json()

      if (data == null || typeof data.image !== 'string') {
        throw new Error('Invalid response from the server')
      }

      return data.image
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
      throw err
    }
  }

  return { resizeAndUploadToBlobStorage, error }
}
