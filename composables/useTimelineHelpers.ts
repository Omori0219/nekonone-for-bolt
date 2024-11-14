// timelineとユーザーの投稿を取得するための関数を共通化する
import { useUser } from '@/composables/useUser'
import { type CreatedPostData } from '@/types/post'
import {
  type TimelineItemPublicData,
  type TimelineItemPublicDataWithUserData,
} from '@/types/timeline'

export function useTimelineHelpers() {
  const { getPublicUserDataByUserId } = useUser()

  // 投稿の詳細を取得する関数
  // 引数：postIds（投稿IDの配列）
  // 戻り値：投稿データの配列（Promise）
  const fetchPostDetails = async (
    postIdsAndUserIds: { postId: string; authorUserId: string }[]
  ) => {
    const promises = postIdsAndUserIds.map(async ({ postId, authorUserId }) => {
      const response = await fetch(
        `/api/posts/${postId}?userId=${authorUserId}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch post details')
      }
      return await response.json()
    })
    return await Promise.all(promises)
  }
  // postAPIで取得した投稿データをTimelineItemPublicData型に変換する関数
  const convertToTimelineItem = (
    post: CreatedPostData
  ): TimelineItemPublicData => {
    return {
      postType: 'post',
      referencePostId: post.postId,
      authorUserId: post.authorUserId,
      nawabari: post.nawabari,
      createdAt: post.createdAt,
      translatedText: post.translatedText,
      repliesCount: post.repliesCount,
      repostsCount: post.repostsCount,
      likesCount: post.likesCount,
    }
  }
  // 投稿詳細データにユーザーデータを追加する関数
  // 引数：posts（投稿データの配列）
  // 戻り値：ユーザーデータ付きの投稿データの配列（Promise）
  const addUserDataToPosts = async (
    posts: TimelineItemPublicData[]
  ): Promise<TimelineItemPublicDataWithUserData[]> => {
    return await Promise.all(
      posts.map(async (post) => {
        const userData = await getPublicUserDataByUserId(post.authorUserId)
        return {
          ...post,
          authorScreenName: userData?.userScreenName || '',
          authorIconPath: userData?.userIconPath || '',
        }
      })
    )
  }
  return {
    fetchPostDetails,
    convertToTimelineItem,
    addUserDataToPosts,
  }
}
