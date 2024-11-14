export type SubscriptionStatus =
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'

export interface Subscription {
  id: string // サブスクリプションID
  status: SubscriptionStatus // stripeのサブスクリプションステータス
  amount: string // 金額
  createdAt: string // 生成日時（ISO形式の文字列）
  updatedAt: string // 更新日時（ISO形式の文字列）
  cancelAtPeriodEnd: boolean // サブスクリプションが期間終了時にキャンセルされるかどうか
}
