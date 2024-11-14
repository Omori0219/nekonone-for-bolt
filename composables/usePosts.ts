import { ref, computed } from 'vue'
import {
  type CreatedPostData,
  type PostCreationRequestData,
} from '@/types/post'
import {
  fetchPostDetails,
  createPost,
  preprocessPost,
} from '@/services/postService'

export default function usePosts() {
  const post = ref<CreatedPostData | null>(null)
  const translatedText = ref('')
  const score = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getPostDetail = async (postId: string, authorUserId: string) => {
    isLoading.value = true
    error.value = null

    try {
      post.value = await fetchPostDetails(postId, authorUserId)
    } catch (err) {
      error.value = 'Failed to fetch post'
      console.error('Failed to fetch post:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createNewPost = async (
    postData: PostCreationRequestData
  ): Promise<CreatedPostData> => {
    isLoading.value = true

    try {
      const createdPost = await createPost(postData)
      return createdPost
    } catch (error) {
      console.error('Failed to create post:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const preprocessNewPost = async (text: string) => {
    try {
      const { translatedText: translated, score: postScore } =
        await preprocessPost(text)
      translatedText.value = translated
      score.value = postScore
    } catch (error) {
      console.error('Failed to translate text:', error)
    }
  }

  return {
    post: computed(() => post.value),
    translatedText: computed(() => translatedText.value),
    score: computed(() => score.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    getPostDetail,
    createNewPost,
    preprocessNewPost,
  }
}
