<!-- PostForm.vue -->
<template>
  <form class="p-postFrom" @submit.prevent="submitForm">
    <textarea
      v-model="postText"
      maxlength="140"
      placeholder="いまにゃにしてる?"
      required
      class="p-postFrom__textArea"
      style="white-space: pre-wrap"
    ></textarea>
    <div class="p-postFrom__textLength">{{ postText.length }} / 140</div>
    <button
      v-if="userStore.user?.userId"
      type="submit"
      class="p-postFrom__postButton c-button c-button--main c-button--designed"
      :class="{ 'p-postFrom__postButton--isPosting': isPosting }"
      :disabled="!postText || isLoading || isPosting"
    >
      {{ isPosting ? 'つぶやきちゅう...' : 'つぶやく' }}
    </button>
    <button
      v-else
      class="p-postFrom__loginButton c-button c-button--main c-button--designed"
      @click="signIn('google', { callbackUrl: '/callback' })"
    >
      ログインしてつぶやく
    </button>
  </form>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/userStore'
  import {
    type PostCreationRequestData,
    type CreatedPostData,
  } from '@/types/post'
  import { preprocessPost, createPost } from '@/services/postService'

  const userStore = useUserStore()

  const { signIn } = useAuth()
  const { isLoading } = usePosts()

  const isPosting = ref(false)
  const postText = ref('')

  // フォームが送信されたときに実行する関数
  const submitForm = async () => {
    if (isLoading.value || !userStore.user?.userId) return
    isPosting.value = true // 投稿中は isPosting を true に設定
    const post: PostCreationRequestData = {
      authorUserId: userStore.user.userId,
      originalText: postText.value,
      translatedText: '', // 初期値は空文字列
      score: 0, // 初期値は0
      nawabari: 'none' as const, // 仮で設定。TODO:ナワバリ実装時に設定するようにする。
    }
    // 変換前のテキストで構成された投稿データを親コンポーネントに通知
    emit('post-created', post)

    try {
      const { translatedText: translated, score: postScore } =
        await preprocessPost(postText.value)
      post.translatedText = translated
      post.score = postScore

      const createdPost = await createPost(post)
      postText.value = ''
      emit('post-updated', createdPost)
      isPosting.value = false
      // ページのリロードを実行
      window.location.reload()
    } catch (error) {
      console.error('Failed to create post:', error)
      isPosting.value = false
    }
  }

  // 投稿が更新されたときに発行するカスタムイベントを定義
  const emit = defineEmits<{
    (event: 'post-created', post: PostCreationRequestData): void
    (event: 'post-updated', post: CreatedPostData): void
  }>()
</script>

<style lang="scss" scoped>
  .p-postFrom {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .p-postFrom__textArea {
    background-color: $off-white;
    border: 1px solid $off-white;
    border: none;
    resize: none;
    width: 100%;
    height: 160px;
    background-color: $white;
    border-radius: 12px;
    padding: 12px;
    &:focus-visible {
      border: 2px solid $dark-green;
      outline: none;
    }
  }
  .p-postFrom__textLength {
    position: absolute;
    font-size: 12px;
    color: $text-gray;
    right: 12px;
    bottom: 80px;
  }
  .p-postFrom__postButton {
    margin-top: 12px;
    margin-bottom: 12px;
    &--isPosting {
      background-color: $bg-gray;
    }
  }
  .p-postFrom__loginButton {
    margin-top: 12px;
    margin-bottom: 12px;
    font-family: 'Darumadrop One', sans-serif;
    color: $off-white;
    background-color: $accent-color;
    border-radius: 12px;
    font-size: 16px;
    padding: 12px 40px;
    cursor: pointer;
    opacity: 1;
    transition: 0.2s ease-in-out;
    &:hover {
      opacity: 0.7;
      transition: 0.2s ease-in-out;
    }
  }
</style>
