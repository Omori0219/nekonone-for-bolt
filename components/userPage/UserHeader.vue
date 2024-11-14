<template>
  <header class="p-userHeader" :class="{ 'is-loading': isLoading }">
    <NuxtLink to="/home" class="p-userHeader__backBar"
      ><p class="p-userHeader__backBar--text">
        ← タイムラインにもどる
      </p></NuxtLink
    >
  </header>
</template>

<script setup lang="ts">
  defineProps({
    isLoading: Boolean,
    isOwner: Boolean,
    ownerUserId: {
      type: String,
      default: '',
    },
    ownerUserName: {
      type: String,
      default: '',
    },
  })
</script>
<style lang="scss" scoped>
  .p-userHeader {
    &:hover {
      opacity: 0.7;
    }
  }
  .p-userHeader__backBar {
    height: 80px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &--text {
      padding: 0 16px;
      font-family: 'Darumadrop One', sans-serif;
    }
    &:hover {
      .p-postDetailPage__backBar--text {
        color: $accent-color;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .p-userHeader {
      height: 64px;
    }
  }
</style>
