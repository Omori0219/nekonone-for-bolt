import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserStore } from '@/store/userStore'

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  const currentUserId = userStore.user?.userId

  if (!currentUserId) {
    // ユーザーがログインしていなければ、TOPページにリダイレクト
    return navigateTo('/')
  }
})
