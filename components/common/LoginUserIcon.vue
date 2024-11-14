<template>
  <div class="c-loginUserIcon--container">
    <UserIcon
      v-if="userStore.user"
      class="c-loginUserIcon"
      :user-id="userStore.user.userId"
      :user-icon-path="userStore.user.userIconPath"
      :icon-size="props.iconSize"
    />
    <img
      v-else
      src="/img/ic-dummyUserIcon.png"
      alt="ログイン中のユーザーのダミーアイコン画像"
      class="c-loginUserIcon"
      :style="{ width: `${props.iconSize}px`, height: `${props.iconSize}px` }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/userStore'
  import UserIcon from '@/components/common/UserIcon.vue'
  const userStore = useUserStore()
  const props = defineProps<{
    iconSize: number
  }>()
</script>

<style lang="scss" scoped>
  .c-loginUserIcon {
    object-fit: contain;
    border-radius: 100%;
  }
</style>
