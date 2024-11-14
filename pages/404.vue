<template>
  <div class="p-404">
    <img src="@/assets/img/img-nekonone_logo.svg" alt="" class="p-404__logo" />
    <img src="@/assets/img/img-404--cat.png" alt="" class="p-404__image" />
    <p class="p-404__text--designed">さがしたけどなかった...</p>
    <h1 class="p-404__title">404</h1>
    <p class="p-404__text">お探しのページは見つかりませんでした。</p>
    <router-link
      to="/"
      class="p-404__button c-button c-button--main c-button--designed"
      >トップページにもどる</router-link
    >
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: '404 Not Found - ねこのね',
    meta: [
      { name: 'robots', content: 'noindex, nofollow' },
      {
        name: 'description',
        content: '404エラー: お探しのページは見つかりませんでした。',
      },
    ],
  })
</script>

<style lang="scss" scoped>
  .p-404 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }
  .p-404__logo {
    margin-bottom: 40px;
  }
  .p-404__image {
    margin-bottom: 8px;
  }
  .p-404__title {
    font-size: 4em;
    display: block;
    margin-bottom: 40px;
    font-family: 'Darumadrop One', sans-serif;
  }
  .p-404__text {
    font-size: 12px;
    margin-bottom: 8px;
    &--designed {
      font-family: 'Darumadrop One', sans-serif;
    }
  }

  .p-404__button {
    margin-top: 20px;
    padding: 10px 20px;
    text-decoration: none;
  }
</style>
