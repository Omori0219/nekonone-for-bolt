<!-- components/pages/home/Timeline.vue -->

<template>
  <div ref="timelineRef" class="timeline">
    <div v-if="error" class="timeline__error">
      {{ error }}
    </div>
    <div v-else>
      <div
        v-for="(item, index) in timelineItems"
        :key="item.type === 'post' ? item.post.referencePostId : `ad-${index}`"
        class="timeline__item"
      >
        <PostItem
          v-if="item.type === 'post'"
          :post-type="item.post.postType"
          :reference-post-id="item.post.referencePostId"
          :author-user-id="item.post.authorUserId"
          :author-screen-name="item.post.authorScreenName"
          :author-icon-path="item.post.authorIconPath"
          :nawabari="item.post.nawabari"
          :created-at="item.post.createdAt"
          :translated-text="item.post.translatedText"
          :likes-count="item.post.likesCount"
          :reposts-count="item.post.repostsCount"
          :replies-count="item.post.repliesCount"
        >
        </PostItem>
        <RakutenAdsForTimeline v-else></RakutenAdsForTimeline>
      </div>
    </div>
    <div v-if="isLoading" class="loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
  import PostItem from '@/components/pages/home/PostItem.vue'
  import { type TimelineItemPublicDataWithUserData } from '@/types/timeline'

  const AD_DISPLAY_INTERVAL = 12
  // const THRESHOLD = 0 // 追加読み込みをトリガーするスクロールの閾値
  const THROTTLE_INTERVAL = 0 // スロットルのインターバル（ミリ秒）
  let lastInvoked = 0 // 最後にイベントハンドラーが呼ばれた時刻

  type TimelineItem =
    | {
        type: 'post'
        post: TimelineItemPublicDataWithUserData
      }
    | {
        type: 'ad'
      }

  const props = defineProps<{
    posts: TimelineItemPublicDataWithUserData[]
    isLoading: boolean
    error: string | null
    hasMore: boolean
  }>()

  const emit = defineEmits<{
    (event: 'load-more'): void
  }>()

  const timelineItems = computed(() => {
    const items: TimelineItem[] = []
    props.posts.forEach((post, index) => {
      items.push({ type: 'post', post })
      if ((index + 1) % AD_DISPLAY_INTERVAL === 0) {
        items.push({ type: 'ad' })
      }
    })
    return items
  })

  const handleScroll = () => {
    if (!props.isLoading && props.hasMore) {
      const now = Date.now()
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      const halfPageHeight = scrollHeight / 2 // ページ全体の半分の高さ
      if (now - lastInvoked > THROTTLE_INTERVAL) {
        // ビューポートの上部がページ全体の中央に達したかどうかをチェック
        if (scrollTop + clientHeight >= halfPageHeight) {
          lastInvoked = now
          emit('load-more')
        }
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style lang="scss" scoped>
  .timeline {
    width: 100%;
  }

  .loading {
    text-align: center;
    padding: 20px;
  }
</style>
