import { defineStore } from 'pinia'
import { getCookie, type H3Event, type EventHandlerRequest } from 'h3'
import { type User } from '@/types/user'
// Userの初期状態を定義
const initialUserState: User = {
  id: '',
  userId: '',
  userScreenName: '',
  userIconPath: '',
  followCount: 0,
  followerCount: 0,
  score: 0,
  isSubscribed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}
// クッキーのオプションを一箇所で定義
const cookieOptions = {
  default: () => null,
  maxAge: 60 * 60 * 24 * 7, // 1週間の秒数
  secure: process.env.NODE_ENV === 'production', // httpsのみにするかどうか。本番環境ではtrueにする
  httpOnly: false, // JavaScriptからクッキーにアクセスするので、falseを設定。
  path: '/',
  sameSite: 'lax' as const, // CSRF攻撃防止のために'lax'を使用する
}

export const useUserStore = defineStore('user', {
  state: () => {
    const userCookie = useCookie<User | null>('user', cookieOptions)
    return {
      user: userCookie.value,
    }
  },
  actions: {
    // 新たなUserオブジェクトを作成し、ユーザーメールを設定
    initializeUser(userEmail: string) {
      const newUser = { ...initialUserState, userEmail }
      this.setUser(newUser)
    },
    // ユーザー情報をストアとクッキーから削除
    clearUser() {
      this.user = null // ストアのユーザーデータを削除
      const cookie = useCookie<User | null>('user', cookieOptions) // クッキーのユーザーデータを削除
      cookie.value = null
    },
    // クッキーからストアにデータを同期させる関数
    loadUserFromCookie() {
      if (process.server) {
        // サーバーサイドで実行される場合
        const event = useRequestEvent() as H3Event<EventHandlerRequest>
        if (event != null) {
          const cookieValue = getCookie(event, 'user')
          if (cookieValue != null) {
            try {
              this.user = JSON.parse(cookieValue)
            } catch (e) {
              console.error('Invalid JSON in the cookie', e) // eslint-disable-line no-console
              this.user = null
            }
          } else {
            this.user = null
          }
        }
      } else {
        // クライアントサイドで実行される場合
        const userCookie = useCookie<User | null>('user', cookieOptions)
        this.user = userCookie.value
      }
    },
    // 基本の関数。ユーザー情報をストアとクッキーにセットする。
    setUser(user: User | null) {
      this.user = user // ストアを更新
      const cookie = useCookie<User | null>('user', cookieOptions) // クッキーを更新
      if (user === null) {
        // ユーザー情報が null の場合はクッキーを削除
        cookie.value = null
      } else {
        // ユーザー情報が存在する場合はクッキーを更新
        cookie.value = user
      }
    },
    // 特定のプロパティを更新する関数。
    updateUserProperty<T extends keyof User>(key: T, value: User[T]) {
      if (this.user !== null && key in this.user) {
        // ユーザーオブジェクトの指定されたプロパティを更新
        this.user[key] = value
        // クッキーも更新する
        const cookie = useCookie<User | null>('user', cookieOptions)
        cookie.value = this.user
      } else {
        console.error('Invalid key or user is null') // eslint-disable-line no-console
      }
    },
  },
})
