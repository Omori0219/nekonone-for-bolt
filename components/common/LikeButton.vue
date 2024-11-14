<template>
  <button class="c-likeButton" :disabled="isLiking" @click="handleToggleLike">
    <div class="c-likeButton__icon--container">
      <img
        v-show="!isLiked"
        src="/icon/ic-heart--unPush.svg
        "
        alt="いいねぼたん"
        class="c-likeButton__icon"
      />
      <img
        v-show="isLiked"
        src="/icon/ic-heart--pushed.svg
        "
        alt="いいね済みぼたん"
        class="c-likeButton__icon"
      />
    </div>
    <p
      class="c-likeButton__count"
      :class="{ 'c-likeButton__count--isLiked': isLiked }"
    >
      {{ displayLikesCount }}
    </p>
  </button>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import useLikes from '@/composables/useLikes'
  import { useUserStore } from '@/store/userStore'
  const userStore = useUserStore()
  const props = defineProps<{
    postId: string
    initialLikesCount: number
  }>()
  const { isLiking, toggleLike, fetchLike } = useLikes()
  const isLiked = ref(false)
  const displayLikesCount = ref(props.initialLikesCount)

  const fetchLikeStatus = async () => {
    if (userStore.user) {
      const like = await fetchLike(userStore.user.userId, props.postId)
      isLiked.value = !!like
    }
  }

  const handleToggleLike = async () => {
    isLiked.value = !isLiked.value
    displayLikesCount.value += isLiked.value ? 1 : -1
    await toggleLike(props.postId)
  }

  onMounted(async () => {
    await fetchLikeStatus()
  })
</script>

<style lang="scss" scoped>
  .c-likeButton {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    width: 32px;
    height: 100%;
    padding: 8px 8px;
    :hover {
      transform: scale(1.2);
      transition: 0.2s;
    }
  }
  .c-likeButton__icon {
    width: 12px;
    height: 12px;
    object-fit: contain;
    margin-right: 6px;
  }
  .c-likeButton__count {
    display: block;
    font-family: 'Darumadrop One', sans-serif;
    font-size: 10px;
    line-height: 1;
    margin-bottom: 2px;
  }
  .c-likeButton__count--isLiked {
    color: red;
  }
</style>
