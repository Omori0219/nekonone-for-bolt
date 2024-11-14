<template>
  <div class="cancel-page">
    <img
      src="@/assets/img/img-nekonone_logo.svg"
      alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
      class="l-headerCommon__logo"
    />
    <h1>
      お支払いが<br />
      正常に完了しませんでした。
    </h1>
    <p>
      何らかの理由でサブスクリプションの処理がキャンセルされました。<br
        class=""
      />再度試してみるか、問題が解決しない場合は
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSf701Ktmw-JhMMbZpwlZcV4prtWLLQZP_DhGv0KNAL61CSCWA/viewform?usp=sf_link"
        target="_blank"
        rel="noopener noreferrer"
        class="link"
      >
        お問い合わせフォーム</a
      >までご連絡ください。
    </p>
    <NuxtLink to="/sponsors/purchase" class="c-button c-button--main"
      >サブスクリプションページにもどる</NuxtLink
    >
    <br />
    <NuxtLink to="/" class="c-button c-button--main"
      >ホームページにもどる</NuxtLink
    >
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: 'three-column',
    middleware: ['auth-guard'],
  })
</script>
<style scoped lang="scss">
  .l-headerCommon__logo {
    margin: 0 auto;
    padding: 24px 0;
  }
  .cancel-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cancel-page h1 {
    font-size: 24px;
    color: $red;
    text-align: center;
    margin-bottom: 1em;
  }
  .cancel-page p {
    font-size: 16px;
    line-height: 1.75;
    color: $text-main;
    text-align: center;
    margin-bottom: 1em;
  }

  .link {
    display: block;
    margin-top: 1em;
    color: $dark-blue;
    text-decoration: underline;
  }
  .c-button {
    display: flex;
    margin-bottom: 24px;
  }
</style>
