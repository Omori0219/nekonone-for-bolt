<template>
  <div class="">
    <button v-if="userStore.user?.userId">
      <NuxtLink class="c-loginButton c-button c-button--main" to="/home"
        >タイムラインへ!</NuxtLink
      >
    </button>
    <button
      v-else
      class="c-loginButton c-button c-button--main"
      @click="signIn('google', { callbackUrl: '/callback' })"
    >
      <img
        v-if="!userStore.user?.userId"
        src="@/assets/img/icon-google.svg"
        alt="Google"
        class="p-index-mv__button__icon"
      />
      ねこのねをはじめる!
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/userStore'
  import { useLineWebBrowser } from '@/composables/useLineWebBrowser'
  const { isLineWebBrowser, openExternalBrowser } = useLineWebBrowser()
  const userStore = useUserStore()
  const { signIn } = useAuth()

  onMounted(() => {
    if (isLineWebBrowser.value) {
      openExternalBrowser()
    }
  })
</script>
<style lang="scss" scoped>
  .c-loginButton {
    font-family: 'Darumadrop One', sans-serif;
    color: $off-white;
    background-color: $accent-color;
    border-radius: 12px;
    font-size: 16px;
    padding: 12px 40px;
    cursor: pointer;
    opacity: 1;
    transition: 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 0.7;
      transition: 0.2s ease-in-out;
    }
  }
</style>
