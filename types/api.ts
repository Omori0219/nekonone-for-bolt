import { type User } from '@/types/user'
// 基本的なAPIレスポンス型
interface BaseApiResponse {
  success: boolean
  message?: string
}

// ユーザー情報を含むAPIレスポンス型
export interface UserApiResponse extends BaseApiResponse {
  user: User | null
}

// 他のAPIレスポンス型
// interface OtherApiResponse extends BaseApiResponse {
//   // 他のプロパティをここに追加
// }
