import { type CatProfile } from './catProfile'
import { type Subscription } from './subscription'
// ユーザー設定のインターフェイス
interface UserSetting {
  setting01: boolean
  setting02: boolean
  setting03: boolean
}
interface UserSocialLinks {
  x?: string // Xのソーシャルリンク
  youtube?: string // YouTubeのリンク
  facebook?: string // Facebookのリンク
}
export interface UserCardInfo {
  userId?: string
  userName?: string
  userIconPath?: string
}
// リスト表示用の簡略化された公開ユーザー情報のインターフェイス
export interface SimplePublicUser {
  userId: string // ユーザーID
  userScreenName: string // ユーザー名
  userIconPath: string // アイコン画像のURL
  isSubscribed: boolean // サブスクリプションフラグ
}
export interface sponsorUser {
  userId: string // ユーザーID
  userScreenName: string // ユーザー名
  userIconPath: string // アイコン画像のURL
  subscriptionCreatedAt: Subscription['createdAt'] // サブスクリプション生成日時
}

// 公開ユーザー情報のインターフェイス
export interface PublicUser {
  userId: string // ユーザーID
  userScreenName: string // ユーザー名
  userIconPath: string // アイコン画像のURL
  ogpImageUrl?: string // OGP画像のURL
  userProfileText?: string // プロフィール文
  userSocialLinks?: UserSocialLinks // SNSリンク
  followCount: number // フォロー数
  followerCount: number // フォロワー数
  score: number // スコア
  catProfile?: CatProfile // 猫のプロフィール
  isSubscribed: boolean // サブスクリプションフラグ
  createdAt: Date // 生成日時
  updatedAt: Date // 更新日時
}
// ユーザー情報の統合されたインターフェイス
export interface User extends PublicUser {
  id: string // ユーザーIDと同じ
  userEmail?: string // ユーザーのメールアドレス
  setting?: UserSetting // ユーザー設定
  subscription?: Subscription // サブスクリプション情報
}
