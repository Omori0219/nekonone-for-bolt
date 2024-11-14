import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
export function useAppAuth() {
  const error = ref<string | null>(null)
  const router = useRouter()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const { signIn, signOut } = useAuth()

  // ログアウト処理を行う関数
  const appSignOut = async () => {
    try {
      await userStore.clearUser()
      await signOut({ callbackUrl: '/' })
    } catch (e) {
      error.value =
        'ログアウト中にエラーが発生しました。もう一度お試しください。'
    }
  }

  // ログインボタンが押された時などに実装される、ログイン処理を行う中央的な関数
  const signInWithGoogle = async () => {
    await commonSignInLogic()
    await signIn('google')
    // これ以降は、server/api/auth/[...].tsのcallbacksのsignIn関数で処理される。ここに書いても動かない。
  }

  // 全てのログイン手法に対しての共通のロジック。
  // ログイン済みかどうかを判定し、ログイン済みの場合はユーザーマイページにリダイレクトする関数
  const commonSignInLogic = async () => {
    userStore.loadUserFromCookie() // クッキーからユーザー情報を読み込む
    if (
      authStore.isLoggedIn &&
      userStore.user?.userId !== '' &&
      userStore.user?.userId !== undefined
    ) {
      // もしログイン済みなら、ユーザーマイページにリダイレクト
      await router.push(`/users/${userStore.user.userId}`)
    }
  }
  return { appSignOut, signInWithGoogle, error }
}
