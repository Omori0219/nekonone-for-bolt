import { useUserStore } from '@/store/userStore'
import {
  type User,
  type PublicUser,
  type SimplePublicUser,
  type sponsorUser,
} from '@/types/user'

export function useUser() {
  const userStore = useUserStore()

  onMounted(() => {
    userStore.loadUserFromCookie()
  })

  // ユーザーIDがすでに使われているかを確認する関数
  const isUserIdAvailable = async (userId: string) => {
    try {
      const response = await $fetch(`/api/checkUserId/${userId}`).catch(
        (error) => {
          // エラーが404の場合はユーザーが存在しないと判断
          if (error.statusCode === 404) {
            return false
          } else {
            // その他のエラーはログに記録し、例外を投げる
            console.error('ユーザーIDチェック中にエラー:', error) // eslint-disable-line no-console
            throw error
          }
        }
      )

      // responseがnullまたはundefinedでないこと、そして'isAvailable'プロパティを持っていることを確認
      if (
        response !== null &&
        response !== undefined &&
        typeof response === 'object' &&
        'isAvailable' in response
      ) {
        return response.isAvailable
      } else {
        // responseが期待する形式でない場合は例外を投げる
        throw new Error('APIのレスポンス形式が正しくありません。')
      }
    } catch (e) {
      // エラーハンドリング
      console.error('APIからのレスポンスの処理中にエラーが発生しました:', e) // eslint-disable-line no-console
      throw e // またはエラーに基づいた適切なハンドリングを行う
    }
  }
  // 新しいユーザーアカウントを作成する関数
  const createUser = async (userId: string, userData: Partial<User>) => {
    try {
      // ユーザーID、ユーザー名、ねこのプロフィールも含めたユーザーデータを送信
      const response = await $fetch('/api/createUser', {
        method: 'POST',
        body: {
          ...userData,
          userId,
        },
      })
      return response
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(
          '新しいユーザーアカウントの作成に失敗しました。エラー詳細:',
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
  // 特定のユーザーIDに基づいてすべてのユーザー情報を取得する関数
  const getAllUserDataByUserId = async (
    userId: string
  ): Promise<User | null> => {
    try {
      const data = await $fetch<User>(`/api/users/app/${userId}`)
      // ユーザーデータを返す
      return data
    } catch (error) {
      console.error('ユーザー情報の取得中にエラーが発生しました:', error) // eslint-disable-line no-console
      return null
    }
  }
  // ユーザーがDBに存在するか確認し、あればそのデータを取得する。
  const getAllUserDataByUserEmail = async (userEmail: string) => {
    try {
      const data = await $fetch(`/api/users/email/${userEmail}`)
      if (data == null) {
        // ユーザーが存在しない場合、undefinedで返ってくる。
        return { user: null, success: false }
      }
      return { user: data as User, success: true }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `ユーザー情報の取得中にエラーが発生しました。メールアドレス: ${userEmail}`,
        error
      )
      throw error
    }
  }
  // 特定のユーザーIDに基づいて公開ユーザー情報を取得する関数
  const getPublicUserDataByUserId = async (
    userId: string
  ): Promise<PublicUser | null> => {
    try {
      const data = await $fetch<PublicUser>(`/api/users/public/${userId}`)
      // ユーザーデータを返す
      return data
    } catch (error) {
      console.error('ユーザー情報の取得中にエラーが発生しました:', error) // eslint-disable-line no-console
      return null
    }
  }
  const latestUsersCacheExpiry = ref<number | null>(null)
  const latestUsersCacheExpiryDuration = 60 * 1000 // 60秒

  const latestUsersCache = ref<SimplePublicUser[]>([])
  // 最新のユーザー公開情報を取得
  const getLatestPublicUsers = async (
    limit: number = 20
  ): Promise<SimplePublicUser[]> => {
    if (limit <= 0 || !Number.isInteger(limit)) {
      throw new Error('limitは正の整数でなければなりません。')
    }
    if (
      latestUsersCache.value.length > 0 &&
      latestUsersCacheExpiry.value !== null &&
      Date.now() < latestUsersCacheExpiry.value
    ) {
      return latestUsersCache.value.slice(0, limit)
    }
    try {
      const data = await $fetch<PublicUser[]>('/api/users/public/latest', {
        params: { limit },
      })
      if (data) {
        latestUsersCache.value = data
        latestUsersCacheExpiry.value =
          Date.now() + latestUsersCacheExpiryDuration
        return data
      } else {
        throw new Error(data)
      }
    } catch (error) {
      console.error('Failed to fetch latest users:', error) // eslint-disable-line no-console
      return []
    }
  }
  // 金額が大きい順にスポンサーユーザーを取得する関数
  const getSponsorUsersByLargestAmount = async (limit: number = 20) => {
    if (limit <= 0 || !Number.isInteger(limit)) {
      throw new Error('limitは正の整数でなければなりません。')
    }
    try {
      const data = await $fetch<sponsorUser[]>(
        '/api/users/subscription/largestAmount',
        {
          params: { limit },
        }
      )
      return data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'スポンサーユーザー情報の取得中にエラーが発生しました:',
        error
      )
      throw error
    }
  }
  return {
    isUserIdAvailable,
    createUser,
    getAllUserDataByUserId,
    getAllUserDataByUserEmail,
    getPublicUserDataByUserId,
    getLatestPublicUsers,
    getSponsorUsersByLargestAmount,
  }
}
