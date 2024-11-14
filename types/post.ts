import { type NawabariType } from './nawabariType'
export interface PostCreationRequestData {
  authorUserId: string // 投稿者のユーザーID
  originalText: string // 変換前のテキスト
  translatedText: string // 変換後のテキスト
  score: number // 投稿文章の評価値
  nawabari: NawabariType // その投稿が属するナワバリ（サークル）の名前（ない場合は"none"）
}

export interface CreatedPostData {
  id: string // UUIDで生成された投稿データの固有のID（postIdと同じ）
  postId: string //  UUIDで生成された投稿データの固有のID（idと同じ）
  authorUserId: string // 投稿者のユーザーID
  originalText: string // 変換前のテキスト
  translatedText: string // 変換後のテキスト
  score: number // 投稿文章の評価値
  nawabari: NawabariType // その投稿が属するナワバリ（サークル）の名前（ない場合は"none"）
  repliesCount: number // 返信の数（デフォルトは0）
  repostsCount: number // リポストの数（デフォルトは0）
  likesCount: number //  いいねの数（デフォルトは0）
  partitionYearMonth: string // 投稿日時をYYYY-MM形式で表したもの（パーティションキーを構成する要素）
  userPostYearMonthKey: string // パーティションキーとして使用する値（{userId}-{partitionYearMonth}の形式）
  createdAt: string // 投稿日時（タイムゾーン情報を含むISO 8601形式の文字列）
  updatedAt: string // 更新日時（タイムゾーン情報を含むISO 8601形式の文字列）
  isDeleted: boolean // 論理削除用のフラグ（デフォルトはfalse）
}
