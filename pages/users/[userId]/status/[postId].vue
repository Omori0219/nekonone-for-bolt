<template>
  <div class="p-postDetailPage">
    <div v-if="!post && !isLoading" class="none">
      <p class="none-text text-designed">そのとうこうはないよ。</p>
    </div>
    <div v-else-if="post" class="p-postDetailPage--inner">
      <NuxtLink to="/home" class="p-postDetailPage__backBar">
        <p class="p-postDetailPage__backBar--text">← タイムラインにもどる</p>
      </NuxtLink>
      <div class="p-postDetailPage__authorInfo">
        <UserIcon
          :user-id="post.authorUserId"
          :user-icon-path="authorInfo?.userIconPath"
          :icon-size="40"
          class="p-postDetailPage__authorInfo__userIcon"
        />
        <div class="p-postDetailPage__authorInfo__userNames">
          <p class="p-postDetailPage__authorInfo__userName">
            {{ authorInfo?.userScreenName }}
          </p>
          <p class="p-postDetailPage__authorInfo__userId">
            @{{ post.authorUserId }}
          </p>
        </div>
      </div>
      <div class="p-postDetailPage__postContent__text">
        {{ post.translatedText }}
      </div>
      <div class="p-postDetailPage__timestamp--container">
        <div class="p-postDetailPage__timestamp">
          {{ formatJapaneseStyle(post.createdAt) }}
        </div>
      </div>
      <div class="p-postDetailPage__reactions">
        <LikeButton
          :post-id="postId"
          :initial-likes-count="post.likesCount || 0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { type CreatedPostData } from '@/types/post'
  import { type PublicUser } from '@/types/user'
  import LikeButton from '@/components/common/LikeButton.vue'
  import UserIcon from '@/components/common/UserIcon.vue'
  import { getPostDetail } from '@/services/postService'
  import { useDateFormat } from '@/composables/useDateFormat'

  const { formatJapaneseStyle } = useDateFormat()
  const { getPublicUserDataByUserId } = useUser()
  const route = useRoute()
  const postId = route.params.postId as string

  const post = ref<CreatedPostData>()
  const isLoading = ref(true)
  const authorInfo = ref<PublicUser | null>(null)

  definePageMeta({
    layout: 'three-column',
  })

  onMounted(async () => {
    try {
      post.value = await getPostDetail(postId)
      if (post.value) {
        authorInfo.value = await getPublicUserDataByUserId(
          post.value.authorUserId
        )
      }
    } catch (error) {
      console.error('Failed to fetch post details:', error) // eslint-disable-line no-console
    } finally {
      isLoading.value = false
    }
  })
</script>

<style scoped lang="scss">
  .p-postDetailPage {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    min-height: 300px;
    &--inner {
      width: 100%;
    }
  }
  .p-postDetailPage__backBar {
    height: 80px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &--text {
      padding: 0 16px;
      font-family: 'Darumadrop One', sans-serif;
    }
    &:hover {
      opacity: 0.7;
      .p-postDetailPage__backBar--text {
        color: $accent-color;
      }
    }
  }
  .p-postDetailPage__authorInfo {
    display: flex;
    padding: 0 16px;
    align-items: center;
    margin-bottom: 12px;
  }
  .p-postDetailPage__authorInfo__userIcon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 100%;
    margin-right: 12px;
  }
  .p-postDetailPage__authorInfo__userName {
    font-size: 22px;
    color: $text-main;
    font-weight: bold;
    line-height: 1;
    font-family: 'Darumadrop One', sans-serif;
    margin-bottom: 4px;
  }
  .p-postDetailPage__authorInfo__userId {
    font-size: 15px;
    color: $text-gray;
    line-height: 1;
    font-family: 'Darumadrop One', sans-serif;
  }
  .p-postDetailPage__postContent__text {
    padding: 0 16px;
    font-size: 16px;
    line-height: 2;
    margin-bottom: 24px;
  }
  .p-postDetailPage__timestamp {
    &--container {
      padding: 0 16px;
    }
    font-size: 12px;
    color: $bg-gray;
    font-family: 'Darumadrop One', sans-serif;
    letter-spacing: 0.04em;
    text-align: right;
  }
  .p-postDetailPage__reactions {
    &--container {
      padding: 8px 16px;
    }
    padding: 12px 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
