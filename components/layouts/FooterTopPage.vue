<template>
  <div class="bg">
    <footer class="l-footer pc">
      <div class="l-footer--inner">
        <div class="l-footer__left">
          <h1 class="l-footer__logo">
            <NuxtLink to="/">
              <img
                src="@/assets/img/img-nekonone_logo.svg"
                alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
                class="l-footer__logo--img"
              />
            </NuxtLink>
          </h1>
          <LoginButton />
        </div>
        <div class="l-footer__rightArea">
          <div class="l-footer__rightArea--inner">
            <nav class="l-footer__nav l-footer__nav--left">
              <ul class="l-footer__nav__list">
                <li class="l-footer__nav__item">
                  <button
                    v-if="authStore.isLoggedIn"
                    class="l-footer__nav__item--logout"
                    @click="appSignOut"
                  >
                    ログアウト
                  </button>
                </li>
                <li class="l-footer__nav__item">
                  <NuxtLink to="/">TOP</NuxtLink>
                </li>
                <li class="l-footer__nav__item">
                  <NuxtLink to="/terms">利用規約</NuxtLink>
                </li>
                <li class="l-footer__nav__item">
                  <NuxtLink to="/privacy">プライバシーポリシー</NuxtLink>
                </li>
                <li class="l-footer__nav__item">
                  <NuxtLink to="/specified">特定商取引法に基づく表記</NuxtLink>
                </li>
              </ul>
            </nav>
            <nav class="l-footer__nav l-footer__nav--right">
              <ul class="l-footer__nav__list">
                <li class="l-footer__nav__item">
                  <a
                    href="https://soudanbako-inc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >運営会社</a
                  >
                </li>
                <li class="l-footer__nav__item">
                  <a
                    href="https://twitter.com/nekonone_jp"
                    target="_blank"
                    rel="noopener noreferrer"
                    >公式Xアカウント</a
                  >
                </li>
                <li class="l-footer__nav__item">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfuHh_Bthd0Ro0KKcAWFF7BBQAhGX0eQIZ7WeVTeRwVzTkZVw/viewform?usp=sf_link"
                    rel="”noopener"
                    noreferrer
                    target="”_blank”"
                  >
                    広告に関するお問い合わせ
                  </a>
                </li>
                <li class="l-footer__nav__item">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfQbz_X_w6lmpEb2UDXeE_p4vwgWbdtTVmmIkJcgji13jkPlw/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    >バグ報告フォーム</a
                  >
                </li>
                <li class="l-footer__nav__item">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf701Ktmw-JhMMbZpwlZcV4prtWLLQZP_DhGv0KNAL61CSCWA/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    >その他のお問い合わせ</a
                  >
                </li>
              </ul>
            </nav>
          </div>
          <a
            href="https://twitter.com/dai_mori219"
            target="_blank"
            rel="noopener noreferrer"
            class="l-footer__sticker--container"
          >
            <img
              src="@/assets/img/img-sticker--farmer.png"
              alt=""
              class="l-footer__sticker"
          /></a>
          <i class="l-footer__copyRight"
            >Copyright © ねこのね. All Rights Reserved.</i
          >
        </div>
      </div>
    </footer>
    <SpFooter class="sp" />
  </div>
</template>
<script setup lang="ts">
  import SpFooter from '@/components/layouts/SpFooter.vue'
  import LoginButton from '@/components/auth/LoginButton.vue'
  import { useAppAuth } from '@/composables/useAppAuth'
  import { useAuthStore } from '@/store/authStore'
  const authStore = useAuthStore()
  const { appSignOut } = useAppAuth()
</script>
<style lang="scss" scoped>
  .l-footer {
    position: sticky;
    top: 100vh;
    width: 100%;
    background-color: $pink;
    &--inner {
      display: flex;
      justify-content: space-between;
      max-width: 1024px;
      margin: 0px auto;
      padding: 64px 0;
    }
  }
  .l-footer__logo {
    margin-bottom: 24px;
    &:hover {
      opacity: 0.7;
    }
  }
  .l-footer__rightArea {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &--inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
  .l-footer__nav {
    &--left {
      margin-right: 40px;
    }
  }
  .l-footer__nav__item {
    font-size: 12px;
    margin-bottom: 16px;
  }
  .l-footer__copyRight {
    font-size: 8px;
    color: $text-main;
  }
  .l-footer__sticker {
    &--container {
      width: 120px;
      height: 120px;
      margin-bottom: 40px;
    }
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .l-footer__nav__item--logout {
    text-decoration: underline;
    margin-bottom: 24px;
  }

  @media screen and (max-width: 1024px) {
    .l-footer {
      &--inner {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .l-footer__rightArea {
      align-items: center;
    }
    .l-footer__rightArea--inner {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
    }
    .l-footer__left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .l-footer__right {
      text-align: center;
      margin-top: 32px;
    }
    .l-footer__nav {
      width: 100%;
      &--left {
        margin-right: 0;
      }
    }
    .l-footer__nav__item {
      font-size: 12px;
      margin-bottom: 12px;
      text-align: center;
    }
    .l-footer__sticker {
      width: 160px;
      height: 160px;
      margin-top: 40px;
      margin-right: 0;
      margin-bottom: 40px;
      object-fit: contain;
    }
  }
</style>
