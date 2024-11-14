export interface Footprint {
  id: string // 足跡のID
  visitorUserId: string // 訪問者のユーザーID
  visitedUserId: string // 訪問されたユーザーID
  createdAt: string // 生成日時（ISO形式の文字列）
  updatedAt: string // 更新日時（ISO形式の文字列）
}
