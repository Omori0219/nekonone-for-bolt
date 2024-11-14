import { ref } from 'vue'
import { type LikeData, type LikeRequestData } from '@/types/like'
import { createLike, deleteLike } from '@/services/likesService'
import { updatePostLikesCount } from '@/services/postService'
import { useUserStore } from '@/store/userStore'
export default function useLikes() {
  const userStore = useUserStore()
  const isLiking = ref(false)

  const toggleLike = async (postId: string) => {
    if (!userStore.user?.userId) return
    isLiking.value = true

    try {
      const likeData: LikeRequestData = {
        likedUserId: userStore.user.userId,
        likedPostId: postId,
      }
      const existingLike = await fetchLike(userStore.user.userId, postId)
      if (existingLike?.id == null || existingLike?.id === undefined) {
        await createLike(likeData) // いいねデータの作成
        await updatePostLikesCount(postId, 'increment') // いいね数を加算
      } else {
        await deleteLike(likeData)
        await updatePostLikesCount(postId, 'decrement') // いいね数を減算
      }
    } catch (error) {
      console.error('Error toggling like:', error) // eslint-disable-line no-console
    } finally {
      isLiking.value = false
    }
  }

  const fetchLike = async (
    userId: string,
    postId: string
  ): Promise<LikeData | null> => {
    const query = new URLSearchParams({
      likedUserId: userId,
      likedPostId: postId,
    })
    const response = await fetch(`/api/likes?${query}`)
    if (!response.ok) {
      throw new Error('Failed to fetch like')
    }
    const likes: LikeData[] = await response.json()
    return likes.length > 0 ? likes[0] : null
  }

  return {
    isLiking,
    fetchLike,
    toggleLike,
  }
}
