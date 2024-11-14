import {
  type CreatedPostData,
  type PostCreationRequestData,
} from '@/types/post'
import { type LikeOperation } from '@/types/like'
export const getPostDetail = async (
  postId: string
): Promise<CreatedPostData> => {
  const response = await fetch(`/api/posts/${postId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch post details')
  }
  return await response.json()
}

export const fetchPostDetails = async (
  postId: string,
  authorUserId: string
): Promise<CreatedPostData> => {
  const response = await fetch(`/api/posts/${postId}?userId=${authorUserId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch post details')
  }
  return await response.json()
}

export const createPost = async (
  post: PostCreationRequestData
): Promise<CreatedPostData> => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error('Failed to create post')
  }
  const createdPost: CreatedPostData = await response.clone().json()
  return createdPost
}

export const preprocessPost = async (
  text: string
): Promise<{ translatedText: string; score: number }> => {
  const response = await fetch('/api/openai/preprocessPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text.replace(/\r\n/g, '\n') }),
  })
  if (!response.ok) {
    throw new Error('Failed to preprocess post')
  }
  return await response.json()
}

export const updatePostLikesCount = async (
  postId: string,
  operation: LikeOperation
): Promise<void> => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ operation }),
  })
  if (!response.ok) {
    throw new Error('Failed to update post likes count')
  }
}
