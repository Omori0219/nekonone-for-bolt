import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
export const useSubscriptionStore = defineStore('subscription', {
  getters: {
    // ユーザーがキャンセル待ち状態かどうかを返す関数
    isWaitingCancel: () => {
      const userStore = useUserStore()
      const user = userStore.user
      if (!user || !user.subscription) {
        return false
      }
      // サブスクリプションがアクティブかつ、この期間で終わるフラグが立っている＝キャンセル待ち状態である
      return (
        user.subscription.status === 'active' &&
        user.subscription.cancelAtPeriodEnd
      )
    },
  },
  actions: {},
})
