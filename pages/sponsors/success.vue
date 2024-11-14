<template>
  <div class="p-successPage">
    <img
      src="@/assets/img/img-nekonone_logo.svg"
      alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
      class="p-successPage__logo"
    />
    <img
      src="@/assets/img/img-cat--naki.png"
      alt="泣いてるねこ"
      class="p-successPage__catImage"
    />
    <p class="p-successPage__thanks">ありがとうございます！</p>
    <h1 class="p-successPage__info">お支払いが完了しました</h1>
    <p class="p-successPage__text">
      ねこのねがステキな世界になるように<br />
      今後とも開発に励みます。<br />
      本当にありがとうございます。
    </p>
    <NuxtLink
      :to="`/users/${userId}`"
      class="c-button c-button--main c-button--designed"
      >マイページにもどる</NuxtLink
    >
    <br />
    <NuxtLink to="/" class="c-button c-button--main c-button--designed"
      >TOPページにもどる</NuxtLink
    >
  </div>
</template>
<script setup lang="ts">
  import { useUserStore } from '@/store/userStore'
  const userStore = useUserStore()
  const userId = userStore.user?.userId
  definePageMeta({
    layout: 'three-column',
    middleware: ['auth-guard'],
  })
</script>
<style scoped lang="scss">
  .p-successPage__logo {
    width: 200px;
    object-fit: contain;
    margin: 32px auto;
  }
  .p-successPage__catImage {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
  .p-successPage__thanks {
    font-size: 10px;
  }
  .p-successPage {
    max-width: 800px;
    margin: 0 auto 40px;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .p-successPage h1 {
    font-size: 24px;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 40px;
  }
  .p-successPage__text {
    font-size: 14px;
    line-height: 1.75;
    margin-bottom: 40px;
  }
</style>
