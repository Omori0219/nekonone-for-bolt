<template>
  <header class="l-threeColumnLeft">
    <div class="l-threeColumnLeft--inner">
      <NuxtLink to="/">
        <img
          src="@/assets/img/img-nekonone_logo.svg"
          alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
          class="l-threeColumnLeft__logo"
        />
      </NuxtLink>
      <nav class="l-threeColumnLeft__nav">
        <ul class="l-threeColumnLeft__nav__list">
          <li
            v-for="item in filteredMenuItems"
            :key="item.text"
            class="l-threeColumnLeft__nav__item"
            :class="{
              isEnabled: item.isEnabled,
              isCurrentPage: isCurrentPage(item.to),
            }"
          >
            <NuxtLink
              v-if="item.isEnabled"
              :to="item.to"
              class="l-threeColumnLeft__nav__item--inner"
            >
              <div class="l-threeColumnLeft__nav__item__icon">
                <img
                  :src="item.icon"
                  alt="アイコン画像"
                  class="l-threeColumnLeft__nav__item__icon--image"
                />
              </div>
              <span class="l-threeColumnLeft__nav__item__text">{{
                item.text
              }}</span>
            </NuxtLink>
            <div v-else class="l-threeColumnLeft__nav__item--inner">
              <div class="l-threeColumnLeft__nav__item__icon">
                <img
                  :src="item.icon"
                  alt="アイコン画像"
                  class="l-threeColumnLeft__nav__item__icon--image"
                />
              </div>
              <span class="l-threeColumnLeft__nav__item__text">{{
                item.text
              }}</span>
            </div>
          </li>
          <li class="l-threeColumnLeft__nav__item isEnabled">
            <LoginButton
              v-if="!authStore.isLoggedIn"
              class="p-topPage__heroView__button"
            />
            <button
              v-else
              class="l-threeColumnLeft__logoutButton"
              @click="appSignOut"
            >
              <div class="l-threeColumnLeft__nav__item--inner">
                <div class="l-threeColumnLeft__nav__item__icon">
                  <img
                    src="/icon/ic-logout.svg"
                    alt="アイコン画像"
                    class="l-threeColumnLeft__nav__item__icon--image"
                  />
                </div>
                <span class="l-threeColumnLeft__nav__item__text"
                  >ログアウト</span
                >
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useAppAuth } from '@/composables/useAppAuth'
  import { useAuthStore } from '@/store/authStore'
  import LoginButton from '@/components/auth/LoginButton.vue'
  import { useMenuItems } from '@/composables/navigation/useMenuItems'
  const authStore = useAuthStore()
  const route = useRoute()
  const { appSignOut } = useAppAuth()
  const { filteredMenuItems } = useMenuItems()

  // ユーザーが現在のどのページにいるかどうかを判定するための関数
  const isCurrentPage = (path: string) => {
    return route.path === path
  }
</script>

<style lang="scss" scoped>
  .l-threeColumnLeft {
    background-color: $white;
    justify-content: flex-end;
    display: flex;
    &--inner {
      max-width: 275px;
      position: fixed;
      top: 0;
      height: 100%;
      padding-top: 40px;
    }
  }
  .l-threeColumnLeft__logo {
    margin-bottom: 40px;
    width: 200px;
    object-fit: contain;
    transition: 0.1s ease-in-out;
    opacity: 1;
    &:hover {
      opacity: 0.5;
    }
  }
  .l-threeColumnLeft__nav {
    margin-top: 40px;
  }
  .l-threeColumnLeft__nav__item {
    &--inner {
      display: flex;
    }
    margin-top: 24px;
    font-family: 'Darumadrop One', sans-serif;
  }

  .l-threeColumnLeft__nav__item.isEnabled {
    :hover {
      .l-threeColumnLeft__nav__item__icon {
        background-color: $accent-color;
        transform: rotate(25deg);
        &--text {
          color: $off-white;
        }
      }
      .l-threeColumnLeft__nav__item__text {
        color: $accent-color;
      }
    }
  }
  // 現在滞在しているページのスタイル
  .l-threeColumnLeft__nav__item.isCurrentPage {
    .l-threeColumnLeft__nav__item__icon {
      background-color: $accent-color;
      transform: rotate(25deg);
      &--text {
        color: $off-white;
      }
    }
    .l-threeColumnLeft__nav__item__text {
      color: $accent-color;
    }
  }
  // まだ準備中のページのスタイル
  .l-threeColumnLeft__nav__item:not(.isEnabled) {
    opacity: 0.3;
  }
  .l-threeColumnLeft__nav__item__icon {
    width: 32px;
    height: 32px;
    background-color: $bg-gray;
    border-radius: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    &--image {
      width: 20px;
      height: 20px;
    }
  }
  .l-threeColumnLeft__nav__item__text {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 20px;
  }
</style>
