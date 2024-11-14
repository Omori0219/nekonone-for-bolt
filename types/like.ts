export type LikeData = {
  id: string
  likedUserId: string
  likedPostId: string
  likedReplyId?: string
  createdAt: string
}

export type LikeRequestData = {
  likedUserId: string
  likedPostId: string
  likedReplyId?: string
}

export type LikeOperation = 'increment' | 'decrement'
