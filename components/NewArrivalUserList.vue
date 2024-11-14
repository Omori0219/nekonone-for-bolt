<template>
  <div class="p-newArrivalUserList">
    <div class="p-newArrivalUserList__list">
      <nuxt-link
        v-for="user in latestUsers"
        :key="user.userId"
        :to="`/users/${user.userId}`"
        class="p-newArrivalUserList__item"
      >
        <NuxtImg
          :src="user.userIconPath || '/img/ic-dummyUserIcon.png'"
          quality="80"
          width="64"
          height="64"
          loading="lazy"
          alt="ユーザーアイコン"
          class="p-newArrivalUserList__item__icon"
          @error="onUserIconError"
        />
        <UserNameWithBadge
          class="p-newArrivalUserList__item__name"
          :user-name="user.userScreenName"
          :is-subscribed="user.isSubscribed"
          :font-size="12"
          :badge-size="8"
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
      userLimit: 50, // デフォルト値を設定
    }
  )

  onMounted(async () => {
    latestUsers.value = await getLatestPublicUsers(props.userLimit)
  })
</script>

<style lang="scss" scoped>
  .p-newArrivalUserList {
    width: 100%;
  }
  .p-newArrivalUserList__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, 70px);
    justify-content: center;
    grid-gap: 1rem;
  }
  .p-newArrivalUserList__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
  }
  .p-newArrivalUserList__item__icon {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  .p-newArrivalUserList__item__name {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 16px;
    line-height: 1;
    color: $text-main;
    text-align: center;
    display: flex;
    justify-content: center;
  }
</style>
