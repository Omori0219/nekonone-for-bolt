<template>
  <div class="p-newArrivalUserBanner">
    <div class="p-newArrivalUserBanner__list">
      <nuxt-link
        v-for="user in latestUsers"
        :key="user.userId"
        :to="`/users/${user.userId}`"
        class="p-newArrivalUserBanner__item"
      >
        <NuxtImg
          :src="user.userIconPath || '/img/ic-dummyUserIcon.png'"
          quality="80"
          width="64"
          height="64"
          alt="ユーザーアイコン"
          class="p-newArrivalUserBanner__item__icon"
          @error="onUserIconError"
        />
      </nuxt-link>
    </div>
    <div class="p-newArrivalUserBanner__list">
      <nuxt-link
        v-for="user in latestUsers"
        :key="user.userId"
        :to="`/users/${user.userId}`"
        class="p-newArrivalUserBanner__item"
      >
        <NuxtImg
          :src="user.userIconPath || '/img/ic-dummyUserIcon.png'"
          quality="80"
          width="64"
          height="64"
          alt="ユーザーアイコン"
          class="p-newArrivalUserBanner__item__icon"
          @error="onUserIconError"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUser } from '@/composables/useUser'
  import { onUserIconError } from '@/utils/dummyImages'
  import { type SimplePublicUser } from '@/types/user'
  const { getLatestPublicUsers } = useUser()
  const latestUsers = ref<SimplePublicUser[]>([])
  const props = withDefaults(
    defineProps<{
      userLimit?: number
    }>(),
    {
      userLimit: 20, // デフォルト値を設定
    }
  )

  onMounted(async () => {
    latestUsers.value = await getLatestPublicUsers(props.userLimit)
  })
</script>

<style lang="scss" scoped>
  .p-newArrivalUserBanner {
    display: flex;
    overflow: hidden;
    height: 80px;
  }
  .p-newArrivalUserBanner__list {
    display: flex;
    list-style: none;
    padding: 0;
    animation: infinity-scroll-left 40s infinite linear 0s both;
  }
  .p-newArrivalUserBanner__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 64px;
    margin-right: 8px;
  }
  .p-newArrivalUserBanner__item__icon {
    width: 100%;
    border-radius: 100%;
  }
  @media screen and (max-width: 1024px) {
    .p-newArrivalUserBanner__list {
      animation: infinity-scroll-left 30s infinite linear 0s both;
    }
    .p-newArrivalUserBanner__item {
      width: 64px;
    }
  }
  @keyframes infinity-scroll-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
</style>
