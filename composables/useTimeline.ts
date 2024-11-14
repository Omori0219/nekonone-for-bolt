// composables/useTimeline.ts

import { ref, computed } from 'vue'
import { type TimelineItemPublicDataWithUserData } from '@/types/timeline'
import { type NawabariType } from '@/types/nawabariType'
import { useTimelineService } from '@/services/useTimelineService'

export function useTimeline() {
  const { fetchTimelinePosts } = useTimelineService()

  const timelinePosts = ref<TimelineItemPublicDataWithUserData[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)
  const currentPage = ref(0)

  const loadTimelinePosts = async (nawabari: NawabariType, page: number) => {
    isLoading.value = true
    error.value = null

    try {
      const { posts, hasMorePosts } = await fetchTimelinePosts(nawabari, page)
      if (page === 0) {
        timelinePosts.value = posts
      } else {
        timelinePosts.value = [...timelinePosts.value, ...posts]
      }
      hasMore.value = hasMorePosts
    } catch (err) {
      error.value = 'Failed to fetch posts'
      console.error('Failed to fetch posts:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadMorePosts = async (nawabari: NawabariType) => {
    currentPage.value++
    await loadTimelinePosts(nawabari, currentPage.value)
  }

  return {
    timelinePosts: computed(() => timelinePosts.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    hasMore: computed(() => hasMore.value),
    loadTimelinePosts,
    loadMorePosts,
  }
}
