import { defineStore } from 'pinia'
import { type CatProfile } from '@/types/catProfile'
const cookieOptions = {
  default: () => null,
  maxAge: 60 * 60 * 24 * 7, // 1週間の秒数
  secure: process.env.NODE_ENV === 'production', // httpsのみにするかどうか。本番環境ではtrueにする
  httpOnly: false, // JavaScriptからクッキーにアクセスするので、falseを設定。
  path: '/',
  sameSite: 'lax' as const, // CSRF攻撃防止のために'lax'を使用する
}
export const useCatProfileStore = defineStore('catProfile', {
  state: () => {
    // useCookieの第二引数にdefaultオプションを設定
    const catProfileCookie = useCookie<CatProfile | null>(
      'catProfile',
      cookieOptions
    )
    return {
      catProfile: catProfileCookie.value,
    }
  },
  actions: {
    clearCatProfile() {
      this.setCatProfile(null)
    },
    loadCatProfileFromCookie() {
      // サーバーサイドで実行される場合、リクエストヘッダーからCookieを取得する
      if (process.server) {
        // サーバーサイドで実行される場合
        const event = useRequestEvent()
        if (event != null) {
          const cookieValue = getCookie(event, 'catProfile')
          if (cookieValue != null && typeof cookieValue === 'string') {
            try {
              this.catProfile = JSON.parse(cookieValue)
            } catch (e) {
              console.error('Invalid JSON in the cookie', e) // eslint-disable-line no-console
              this.catProfile = null
            }
          } else {
            this.catProfile = null
          }
        }
      } else {
        // クライアントサイドで実行される場合、useCookieを使用する
        const catProfileCookie = useCookie<CatProfile | null>(
          'catProfile',
          cookieOptions
        )
        this.catProfile = catProfileCookie.value
      }
    },
    setCatProfile(catProfile: CatProfile | null) {
      // 環境に応じてクッキーのオプションを設定
      // ストアの状態とクッキーを更新する
      this.catProfile = catProfile
      const cookie = useCookie<CatProfile | null>('catProfile', cookieOptions)
      if (catProfile === null) {
        // ねこのプロフィール情報が null の場合はクッキーを削除
        cookie.value = null
      } else {
        // ねこのプロフィール情報が存在する場合はクッキーを更新
        cookie.value = catProfile
      }
    },
  },
})
