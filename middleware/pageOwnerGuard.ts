import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserStore } from '@/store/userStore'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  const currentUserId = userStore.user?.userId
  const ownerUserId = to.params.userId

  if (currentUserId === ownerUserId) {
    // ユーザーがページの持ち主であれば、アクセスを許可
  } else {
    // ユーザーがページの持ち主でなければ、トップページにリダイレクト
    return navigateTo('/')
  }
})
