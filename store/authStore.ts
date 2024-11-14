import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
export const useAuthStore = defineStore('auth', {
  getters: {
    // ユーザーがログインしているかどうかを判定するゲッター
    isLoggedIn: () => {
      const userStore = useUserStore()
      //  userStore.user が null または userStore.user.userId が空文字列の場合はログアウト状態
      const isLoggedOut =
        userStore.user === null || userStore.user?.userId === ''
      const isLoggedIn = !isLoggedOut
      return isLoggedIn
    },
  },
})
