import { type NawabariType } from './nawabariType'

/**
 * timelineコンテナに格納するデータの型を定義するインターフェース
 */
// 共通のデータ型
export interface CreatedTimelineCommonData {
  id: string // ランダムで固有のID
  postType: 'post' | 'repost' // 投稿の種類を格納する。
  referencePostId: string // 参照する投稿のpost ID（投稿時にUUIDで生成されたもの）
  authorUserId: string // 投稿したユーザーのユーザーID（ユーザーマイページでの表示に使う）
  nawabari: NawabariType // ナワバリの名前。ないときは"none"
  isLatestVersion: boolean // リポスト用に、複数回リポストされた同じ投稿が複数回表示されないためのフラグ
  partitionDate: string // 投稿日時をYYYY-MM-DDで表したもの。パーテーションキー用
  createdAt: string // 投稿日時。"2023-06-08T10:30:00Z"のように、タイムゾーン情報を含めたISO 8601形式の文字列
  updatedAt: string // 更新日時。"2023-06-08T10:30:00Z"のように、タイムゾーン情報を含めたISO 8601形式の文字列
}
// 通常の投稿の際のデータ型
export interface CreatedTimelinePostData extends CreatedTimelineCommonData {
  postType: 'post'
}
// リポストの際のデータ型
export interface CreatedTimelineRepostData extends CreatedTimelineCommonData {
  postType: 'repost'
  repostedUserId: string
}
/**
 * タイムラインを構築する際に使用するデータの型を定義するインターフェース
 */
// 参照する投稿のIDと投稿者のIDのみを格納する型
export interface TimelineItemPublicDataReference {
  postType: 'post' | 'repost' // 投稿の種類
  referencePostId: string // 参照する投稿のpostId
  repostedUserId?: string // リポストだった場合、リポストユーザーのユーザーID（ユーザーマイページでの表示と、「〇〇さんがリポストしました」に使う）
  authorUserId: string // 投稿したユーザーのユーザーID
  nawabari: NawabariType // ナワバリの名前。
  createdAt: string // 投稿日時。
}
export interface UseFetchTimelinePostsData {
  postId: string
  authorUserId: string
}
// 通常の投稿の際のデータ型
export interface TimelineItemPublicData
  extends TimelineItemPublicDataReference {
  translatedText: string // 変換後のテキスト
  repliesCount: number // 返信の数
  repostsCount: number // リポストの数
  likesCount: number // いいねの数
}
// ユーザーデータを追加したデータ型
export interface TimelineItemPublicDataWithUserData
  extends TimelineItemPublicData {
  authorScreenName: string
  authorIconPath: string
}
