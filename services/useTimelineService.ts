import { type NawabariType } from '@/types/nawabariType'
import { type CreatedPostData } from '@/types/post'
import { useTimelineHelpers } from '@/composables/useTimelineHelpers'

const TIMELINE_POSTS_PER_PAGE = 10

export function useTimelineService() {
  const { fetchPostDetails, convertToTimelineItem, addUserDataToPosts } =
    useTimelineHelpers()

  const fetchTimelinePosts = async (nawabari: NawabariType, page: number) => {
    const skip = page * TIMELINE_POSTS_PER_PAGE
    const take = TIMELINE_POSTS_PER_PAGE

    const query = new URLSearchParams({
      nawabari,
      skip: skip.toString(),
      take: take.toString(),
    })
    const response = await fetch(`/api/timeline?${query}`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    const timelinePostRefs = await response.json()

    if (timelinePostRefs.length === 0) {
      return { posts: [], hasMorePosts: false }
    }

    const postIdsAndAuthorUserIds = timelinePostRefs.map(
      (ref: { referencePostId: string; authorUserId: string }) => ({
        postId: ref.referencePostId,
        authorUserId: ref.authorUserId,
      })
    )
    const posts: CreatedPostData[] = await fetchPostDetails(
      postIdsAndAuthorUserIds
    )
    const timelineConvertedPosts = posts.map(convertToTimelineItem)
    const timelinePostsWithUserData = await addUserDataToPosts(
      timelineConvertedPosts
    )

    return {
      posts: timelinePostsWithUserData,
      hasMorePosts: timelinePostRefs.length === take,
    }
  }

  // const addPost = (post: TimelineItemPublicDataWithUserData) => {
  //   // ここでは実装せず、リアルタイム通信の実装時に行う
  // }

  // const updatePost = async (updatedPost: CreatedPostData) => {
  //   // ここでは実装せず、リアルタイム通信の実装時に行う
  // }

  // const reflectUserPostImmediately = async (post: PostCreationRequestData) => {
  //   // ここでは実装せず、リアルタイム通信の実装時に行う
  // }

  return {
    fetchTimelinePosts,
  }
}
