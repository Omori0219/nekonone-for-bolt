import { type LikeData, type LikeRequestData } from '@/types/like'

export const createLike = async (
  likeData: LikeRequestData
): Promise<LikeData> => {
  const response = await fetch('/api/likes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeData),
  })
  if (!response.ok) {
    throw new Error('Failed to create like')
  }
  return await response.json()
}

export const deleteLike = async (likeData: LikeRequestData): Promise<void> => {
  const response = await fetch(`/api/likes/${likeData}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeData),
  })
  if (!response.ok) {
    throw new Error('Failed to delete like')
  }
}
