<template>
  <span
    class="c-userNameWithBadge"
    :style="{ fontSize: `${props.fontSize}px` }"
  >
    {{ userName }}
    <img
      v-if="isSubscribed"
      src="@/assets/img/ic-sponsorBadge--fish.svg"
      alt="スポンサーバッヂ"
      class="c-userNameWithBadge__sponsorBadge"
      :style="{ width: `${props.badgeSize}px`, height: `${props.badgeSize}px` }"
    />
  </span>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps({
    userName: {
      type: String,
      default: '', // デフォルト値を空文字列に設定
    },
    isSubscribed: {
      type: Boolean,
      default: false, // デフォルト値をfalseに設定
    },
    fontSize: {
      type: Number,
      default: 32, // デフォルト値を16に設定
    },
    badgeSize: {
      type: Number,
      default: 24, // デフォルト値を16に設定
    },
  })
</script>
<style scoped>
  .c-userNameWithBadge {
    display: flex;
    align-items: center;
  }
  .c-userNameWithBadge__sponsorBadge {
    margin-left: 4px;
    position: relative;
    top: 4px;
  }
</style>
