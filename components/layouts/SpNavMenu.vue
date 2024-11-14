<template>
  <nav class="l-spNavMenu">
    <div class="l-spNavMenu--inner">
      <ul class="l-spNavMenu__list">
        <li
          v-for="item in filteredMenuItems"
          :key="item.text"
          class="l-spNavMenu__item"
          :class="{
            isEnabled: item.isEnabled,
            isCurrentPage: isCurrentPage(item.to),
          }"
        >
          <NuxtLink
            v-if="item.isEnabled"
            :to="item.to"
            class="l-spNavMenu__item--inner"
          >
            <div class="l-spNavMenu__item__icon">
              <img
                :src="item.icon"
                alt="アイコン画像"
                class="l-spNavMenu__item__icon--image"
              />
            </div>
            <span class="l-spNavMenu__item__text">{{ item.text }}</span>
          </NuxtLink>
          <div v-else class="l-spNavMenu__item--inner">
            <div class="l-spNavMenu__item__icon">
              <img
                :src="item.icon"
                alt=""
                class="l-spNavMenu__item__icon--image"
              />
            </div>
            <span class="l-spNavMenu__item__text">{{ item.text }}</span>
          </div>
        </li>
        <div class="l-spNavMenu__item l-spNavMenu__item--blank"></div>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
  import { useMenuItems } from '@/composables/navigation/useMenuItems'
  const { filteredMenuItems } = useMenuItems()
  const route = useRoute()
  // ユーザーが現在のどのページにいるかどうかを判定するための関数
  const isCurrentPage = (path: string) => {
    return route.path === path
  }
</script>
<style scoped lang="scss">
  .l-spNavMenu {
    display: flex;
    flex-direction: column;
  }
  .l-spNavMenu__list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 24px;
    &::-webkit-scrollbar {
      height: 4px; /* スクロールバーの高さ */
    }
    &::-webkit-scrollbar-thumb {
      background: $bg-gray; /* ツマミの色 */
      border-radius: 7px; /* ツマミ両端の丸み */
    }
    &::-webkit-scrollbar-track {
      background: $off-white; /* トラックの色 */
      border-radius: 7px; /* トラック両端の丸み */
    }
  }
  .l-spNavMenu__item {
    font-family: 'Darumadrop One', sans-serif;
    width: fit-content;
    margin: 0px 6px;
    min-width: 68px;
    &--inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  // 稼働中のページのスタイル
  .l-spNavMenu__item.isEnabled {
    :hover {
      .l-spNavMenu__item__icon {
        background-color: $accent-color;
        transform: rotate(25deg);
        &--text {
          color: $off-white;
        }
      }
      .l-spNavMenu__item__text {
        color: $accent-color;
      }
    }
  }
  // 現在滞在しているページのスタイル
  .l-spNavMenu__item.isCurrentPage {
    .l-spNavMenu__item__icon {
      background-color: $accent-color;
      transform: rotate(25deg);
      &--text {
        color: $off-white;
      }
    }
    .l-spNavMenu__item__text {
      color: $accent-color;
    }
  }
  // まだ準備中のページのスタイル
  .l-spNavMenu__item:not(.isEnabled) {
    opacity: 0.3;
  }
  .l-spNavMenu__item__icon {
    width: 48px;
    height: 48px;
    background-color: $bg-gray;
    border-radius: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
    &--image {
      width: 24px;
      height: 24px;
    }
  }
  .l-spNavMenu__item__text {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 10px;
    line-height: 1;
  }
  .l-spNavMenu__authButtonArea {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
  }
</style>
