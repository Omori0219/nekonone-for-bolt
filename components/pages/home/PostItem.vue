<template>
  <div class="p-postItem">
    <NuxtLink
      class="p-postItem__linkCover"
      :to="`/users/${authorUserId}/status/${referencePostId}`"
    >
    </NuxtLink>
    <div v-if="postType === 'repost'" class="p-postItem__repostInfo">
      {{ authorScreenName }} がリポストしました
    </div>
    <div class="p-postItem__main">
      <NuxtLink :to="`/users/${authorUserId}`">
        <img
          :src="authorIconPath"
          :alt="authorScreenName"
          class="p-postItem__userIcon"
        />
      </NuxtLink>
      <div class="p-postItem__content">
        <div class="p-postItem__content__header">
          <h3 class="p-postItem__authorName" :style="{ color: randomColor }">
            {{ authorScreenName }}
          </h3>
          <span class="p-postItem__authorId" :style="{ color: randomColor }"
            >@{{ authorUserId }}</span
          >
          <span class="p-postItem__createdAt">{{
            formatElapsedTime(createdAt)
          }}</span>
        </div>
        <p class="p-postItem__content__text" style="white-space: pre-wrap">
          {{ translatedText }}
        </p>
      </div>
    </div>
    <div class="p-postItem__footer">
      <LikeButton
        :post-id="referencePostId"
        :initial-likes-count="likesCount"
        class="p-postItem__footer__likeButton"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import LikeButton from '@/components/common/LikeButton.vue'
  import { useDateFormat } from '@/composables/useDateFormat'
  defineProps<{
    postType: string
    referencePostId: string
    authorUserId: string
    authorScreenName: string
    authorIconPath: string
    nawabari: string
    createdAt: string
    translatedText: string
    likesCount: number
    repostsCount: number
    repliesCount: number
  }>()
  // 色の配列を定義
  const colors = [
    '#ebc3e1', // $pink
    '#406ea6', // $dark-blue
    '#94cac4', // $dark-green
    '#E3C800', // $yellow
    '#83dfbe', // $green
    '#d2b9dd', // $purple
    '#95a5c7', // $dark-purple
  ]
  // ランダムに色を選択する関数
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
  // ランダムに選択した色を保持するリアクティブな参照
  const randomColor = ref(getRandomColor())
  const { formatElapsedTime } = useDateFormat()
</script>

<style lang="scss" scoped>
  .p-postItem {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    padding: 12px 16px 0;
    border-bottom: 1px solid $off-white;
    &:hover {
      opacity: 0.7;
    }
  }
  .p-postItem__linkCover {
    position: absolute;
    inset: 0;
    cursor: pointer;
    z-index: 1;
  }
  .p-postItem__main {
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .p-postItem__userIcon {
    position: absolute;
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 100%;
    margin-right: 16px;
    inset: 0;
    z-index: 2;
    &:hover {
      opacity: 0.5;
    }
  }

  .p-postItem__content__header {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }

  .p-postItem__authorName {
    font-size: 18px;
    font-weight: bold;
    margin-right: 6px;
    line-height: 1;
    letter-spacing: 0.04em;
    font-family: 'Darumadrop One', sans-serif;
  }

  .p-postItem__authorId {
    font-size: 12px;
    margin-right: 8px;
    line-height: 1;
    font-weight: bold;
    letter-spacing: 0.04em;
    font-family: 'Darumadrop One', sans-serif;
  }

  .p-postItem__createdAt {
    font-size: 12px;
    color: $bg-gray;
    line-height: 1;
    font-family: 'Darumadrop One', sans-serif;
  }

  .p-postItem__content {
    width: 100%;
    padding-left: 48px;
  }

  .p-postItem__content__text {
    font-size: 14px;
    line-height: 1.75;
    color: $text-main;
    text-decoration: none;
  }

  .p-postItem__footer {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 24px;
    width: 100%;
  }
  .p-postItem__footer__likeButton {
    position: absolute;
    z-index: 2;
  }

  .p-postItem__actions {
    display: flex;
  }

  .p-postItem__counts {
    display: flex;
    font-size: 12px;
    color: #999;
  }

  .p-postItem__likes-count {
    margin-right: 10px;
  }
</style>
