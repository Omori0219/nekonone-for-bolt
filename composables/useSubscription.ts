import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'

interface SubscriptionResponse {
  subscriptionId: string
}
export function useSubscription() {
  const userStore = useUserStore()
  const isLoading = ref(false)
  const error = ref(null)
  const isCanceled = ref(false)

  // ユーザーIDに基づいてサブスクリプションIDを取得する関数
  const getSubscriptionId = async (userId: string) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await $fetch(`/api/users/subscription/${userId}`, {
        method: 'GET',
      })
      // レスポンスを適切な型にキャスト
      const subscriptionResponse = response as SubscriptionResponse
      return subscriptionResponse.subscriptionId
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(
          'サブスクリプションIDの取得に失敗しました。エラー詳細:',
          error.message,
          error.stack
        )
      } else {
        // eslint-disable-next-line no-console
        console.error('予期せぬエラータイプ:', error)
      }
      // エラーを再スロー
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // サブスクリプションをキャンセルする関数
  const cancelSubscription = async (subscriptionId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/stripe/cancelSubscription', {
        method: 'POST',
        body: {
          subscriptionId,
        },
      })
      isCanceled.value = true
      // ストアのユーザー情報を更新
      if (userStore.user && userStore.user.subscription) {
        userStore.setUser({
          ...userStore.user,
          subscription: {
            ...userStore.user.subscription,
            cancelAtPeriodEnd: true,
          },
        })
      }
      return response
      // 以下のコードは、サブスクリプションのキャンセルに失敗した場合のエラーハンドリング
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(
          'サブスクリプションのキャンセルに失敗しました。エラー詳細:',
          error.message,
          error.stack
        )
      } else {
        // eslint-disable-next-line no-console
        console.error('予期せぬエラータイプ:', error)
      }
      // エラーを再スロー
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    getSubscriptionId,
    cancelSubscription,
    isCanceled,
  }
}
