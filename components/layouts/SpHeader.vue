<template>
  <header class="l-spHeader" :class="{ 'l-spHeader--hidden': isHeaderHidden }">
    <div class="l-spHeader__sideContent">
      <LoginUserIcon :icon-size="40" />
    </div>
    <div class="l-spHeader__logo" @click="scrollToTop">
      <img src="/img/logo__nekonone.svg" alt="" class="l-spHeader__logo--img" />
    </div>
    <div class="l-spHeader__sideContent"></div>
  </header>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import LoginUserIcon from '@/components/common/LoginUserIcon.vue'

  const isHeaderHidden = ref(false)
  let lastScrollPosition = 0

  const handleScroll = () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop
    isHeaderHidden.value = currentScrollPosition > lastScrollPosition
    lastScrollPosition = currentScrollPosition
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>
<style lang="scss" scoped>
  .l-spHeader {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: #fff;
    z-index: 10;
    transition: transform 0.15s ease-in-out;
    &--hidden {
      transform: translateY(-100%);
    }
  }
  .l-spHeader__sideContent {
    width: 64px;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l-spHeader__logo {
    height: 100%;
    flex-shrink: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &--img {
      height: 32px;
      object-fit: contain;
    }
  }
</style>
