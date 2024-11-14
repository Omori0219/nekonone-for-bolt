// composables/useUserPosts.ts
import { ref, computed } from 'vue'
import { fetchUserPosts } from '@/services/userPostsService'
import { type TimelineItemPublicDataWithUserData } from '@/types/timeline'
import { useTimelineHelpers } from '@/composables/useTimelineHelpers'

export function useUserPosts(userId: string) {
  const { fetchPostDetails, convertToTimelineItem, addUserDataToPosts } =
    useTimelineHelpers()

  const userPosts = ref<TimelineItemPublicDataWithUserData[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)

  const fetchPosts = async (skip = 0, take = 10) => {
    isLoading.value = true
    error.value = null

    try {
      const timelinePostRefs = await fetchUserPosts(userId, skip, take)

      const postIdsAndAuthorUserIds = timelinePostRefs.map(
        (ref: { referencePostId: string; authorUserId: string }) => ({
          postId: ref.referencePostId,
          authorUserId: ref.authorUserId,
        })
      )

      const posts = await fetchPostDetails(postIdsAndAuthorUserIds)
      const timelineConvertedPosts = posts.map(convertToTimelineItem)
      const timelinePostsWithUserData = await addUserDataToPosts(
        timelineConvertedPosts
      )

      if (skip === 0) {
        userPosts.value = timelinePostsWithUserData
      } else {
        userPosts.value = [...userPosts.value, ...timelinePostsWithUserData]
      }

      hasMore.value = timelinePostRefs.length >= take
    } catch (err) {
      error.value = 'Failed to fetch user posts'
      console.error('Failed to fetch user posts:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadMoreUserPosts = async (currentPage: number) => {
    await fetchPosts(currentPage * 10, 10)
  }

  return {
    userPosts: computed(() => userPosts.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    hasMore: computed(() => hasMore.value),
    fetchPosts,
    loadMoreUserPosts,
  }
}
