<template>
  <div class="c-userIcon--container">
    <NuxtLink :to="`/users/${props.userId}`" class="c-userIcon--link">
      <img
        :src="props.userIconPath || '/img/ic-dummyUserIcon.png'"
        alt="アイコン画像"
        class="c-userIcon"
        :style="{ width: `${props.iconSize}px`, height: `${props.iconSize}px` }"
        @error="onUserIconError"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { onUserIconError } from '@/utils/dummyImages'

  const props = defineProps<{
    userId: string
    userIconPath: string | undefined
    iconSize: number
  }>()
</script>

<style lang="scss" scoped>
  .c-userIcon {
    object-fit: contain;
    border-radius: 100%;
    &:hover {
      opacity: 0.7;
    }
  }
</style>
