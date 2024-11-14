import { useUserStore } from '@/store/userStore'
import { useCatProfileStore } from '@/store/catProfileStore'
import { type User } from '@/types/user'
import { type CatProfile } from '@/types/catProfile'

// [A]nuxtAuthを使用して認証が完了しているかどうかを判断するヘルパー関数
const isAuthenticated = () => {
  const { status } = useAuth()
  return status.value === 'authenticated'
}

// [B]アカウント作成が完了しているかどうかを判断するヘルパー関数
// アカウント作成が完了しているユーザー ＝ ストアにユーザーIDがある
const hasCompletedCreateAccount = (user: User | null) => Boolean(user?.userId)

// [C]ステップ01が完了しているかどうかを判断するヘルパー関数
// step01の最後にねこの情報をストアに格納するので、ストアの猫情報を確認する。
const hasCompletedStep01 = (catProfile: CatProfile | null) =>
  Boolean(catProfile?.breed)

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  const catProfileStore = useCatProfileStore()
  // create-account/step01へのアクセスを禁止するのは以下の場合
  // [A]:ログインを行っていないユーザー
  // [B]:アカウント作成済みのユーザー：ストアにユーザーIDがある
  if (to.path === '/create-account/step01') {
    if (!isAuthenticated() || hasCompletedCreateAccount(userStore.user)) {
      return navigateTo('/') // ホームページにリダイレクト
    }
  }
  // create-account/step02へのアクセスを禁止するのは以下の場合
  // [A]:ログインを行っていないユーザー
  // [B]:アカウント作成済みのユーザー：ストアにユーザーIDがある
  // [C]:step01の工程を終えていないユーザー：ストアにねこの情報がない
  if (to.path === '/create-account/step02') {
    if (!isAuthenticated() || hasCompletedCreateAccount(userStore.user)) {
      return navigateTo('/') // ユーザーをホームページにリダイレクトします。
    } else if (!hasCompletedStep01(catProfileStore.catProfile)) {
      return navigateTo('/create-account/step01') // ユーザーをステップ01にリダイレクトします。
    }
  }
})
