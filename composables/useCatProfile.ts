import { ref, onMounted } from 'vue'
import { useCatProfileStore } from '@/store/catProfileStore'
import { type CatProfile } from '@/types/catProfile'

export function useCatProfile() {
  const catProfileStore = useCatProfileStore()
  const catImageUrl = ref<string | null>(null)
  const error = ref<string | null>(null)

  onMounted(() => {
    catProfileStore.loadCatProfileFromCookie()
  })

  const generateCatImage = async (catProfile: CatProfile) => {
    if (catProfile == null || typeof catProfile !== 'object') {
      throw new Error('Invalid catProfile')
    }

    try {
      const response = await fetch('/api/generateCatImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catProfile),
      })

      if (!response.ok) {
        throw new Error('Failed to generate cat image')
      }

      const data = await response.json()

      if (data == null || typeof data.image !== 'string') {
        throw new Error('Invalid response from the server')
      }
      // URLを直接返す
      return data.image
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
      throw err
    }
  }
  // ねこの情報をDBに書き込む関数
  const insertCatProfile = async (userId: string, catProfile: CatProfile) => {
    try {
      const response = await $fetch('/api/insertCatProfile', {
        method: 'POST',
        body: {
          catProfile,
          userId,
        },
      })
      return response
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(
          'ねこ情報の保存に失敗しました。エラー詳細:',
          error.message,
          error.stack
        )
      } else {
        // eslint-disable-next-line no-console
        console.error('予期せぬエラータイプ:', error)
      }
      // エラーを再スロー
      throw error
    }
  }
  return {
    catImageUrl,
    error,
    generateCatImage,
    insertCatProfile,
  }
}
