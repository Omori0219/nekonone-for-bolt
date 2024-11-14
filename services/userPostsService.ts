import { type TimelineItemPublicData } from '@/types/timeline'

export const fetchUserPosts = async (
  userId: string,
  skip: number,
  take: number
): Promise<TimelineItemPublicData[]> => {
  const query = new URLSearchParams({
    authorUserId: userId,
    skip: skip.toString(),
    take: take.toString(),
  })
  const response = await fetch(`/api/userPosts?${query}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user posts')
  }
  return await response.json()
}
