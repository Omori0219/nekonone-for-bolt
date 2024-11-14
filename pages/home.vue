<!-- pages/index.vue -->

<template>
  <div class="p-homePage">
    <header class="p-homePage__header">
      <TimelineTabs :selected-tab="selectedTab" @tab-changed="onTabChanged" />
      <TimelineSettings />
    </header>
    <section class="p-homePage__postArea">
      <div class="p-homePage__postArea--inner">
        <div class="p-homePage__postArea__loginUserIcon">
          <LoginUserIcon :icon-size="40" />
        </div>
        <PostForm />
      </div>
    </section>
    <section class="p-homePage__timeline">
      <Timeline
        :posts="timelinePosts"
        :is-loading="isLoading"
        :error="error"
        :has-more="hasMore"
        @load-more="loadMorePosts(selectedTab)"
      />
      <p v-if="isLoading" class="p-homePage__timeline__loadingText">
        タイムラインよみこみちゅう...
      </p>
    </section>
    <button class="p-homePage__fab" @click="scrollToTop">
      <p class="p-homePage__fab__text">
        つぶ<br />
        やく
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
  import TimelineTabs from '@/components/pages/home/TimelineTabs.vue'
  import TimelineSettings from '@/components/pages/home/TimelineSettings.vue'
  import LoginUserIcon from '@/components/common/LoginUserIcon.vue'
  import PostForm from '@/components/pages/home/PostForm.vue'
  import Timeline from '@/components/pages/home/Timeline.vue'
  import { type NawabariType } from '@/types/nawabariType'
  import { useTimeline } from '@/composables/useTimeline'

  definePageMeta({
    layout: 'three-column',
  })

  const selectedTab = ref<NawabariType>('none')
  const {
    timelinePosts,
    isLoading,
    error,
    hasMore,
    loadTimelinePosts,
    loadMorePosts,
  } = useTimeline()

  const onTabChanged = (tab: NawabariType) => {
    selectedTab.value = tab
    loadTimelinePosts(selectedTab.value, 0)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  onMounted(() => {
    loadTimelinePosts(selectedTab.value, 0)
  })
</script>

<style lang="scss" scoped>
  .p-homePage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .p-homePage__header {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .p-homePage__postArea {
    width: 100%;
    margin-top: 12px;
    border-bottom: 1px solid $off-white;
    &--inner {
      display: flex;
      padding: 0 16px;
    }
  }
  .p-homePage__postArea__loginUserIcon {
    margin-right: 24px;
    flex-shrink: 0;
  }
  .p-homePage__timeline {
    width: 100%;
  }
  .p-homePage__timeline__loadingText {
    font-size: 12px;
    text-align: center;
    font-family: 'Darumadrop One', sans-serif;
    margin: 24px 0;
  }
  .p-homePage__fab {
    position: fixed;
    bottom: 40px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: $accent-color;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    z-index: 1;
    &:hover {
      transform: scale(1.1);
    }
  }

  .p-homePage__fab__text {
    font-size: 12px;
    font-family: 'Darumadrop One', sans-serif;
    text-align: left;
    color: #fff;
    line-height: 2;
  }
  @media screen and (max-width: 1024px) {
    .p-homePage__header {
      height: 48px;
    }
    .p-homePage__fab {
      bottom: 100px;
      right: 24px;
    }
  }
</style>
