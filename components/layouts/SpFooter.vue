<template>
  <footer class="l-spFooter">
    <CountDownSection />
    <!-- <NekokijiSection class="l-spFooter__nekokijiSection" /> -->
    <ServiceDescriptionSection class="l-spFooter__serviceDescription" />
    <FooterMinimum />
    <section
      :class="[
        'l-spFooter__navMenu',
        { 'l-spFooter__navMenu--hidden': isFooterHidden },
      ]"
    >
      <SpNavMenu class="l-spFooter__navMenu__content" />
    </section>
  </footer>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import FooterMinimum from '@/components/layouts/FooterMinimum.vue'
  import SpNavMenu from '@/components/layouts/SpNavMenu.vue'
  import CountDownSection from '@/components/section/CountDownSection.vue'
  // import NekokijiSection from '@/components/section/NekokijiSection.vue'
  import ServiceDescriptionSection from '@/components/section/ServiceDescriptionSection.vue'

  const isFooterHidden = ref(true)
  let lastScrollPosition = 0

  const handleScroll = () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop
    isFooterHidden.value = currentScrollPosition < lastScrollPosition
    lastScrollPosition = currentScrollPosition
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>
<style lang="scss" scoped>
  .l-spFooter__adSection {
    padding: 32px 16px;
  }
  .l-spFooter__adSection__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 20px;
    color: $text-gray;
    margin-bottom: 12px;
  }
  .l-spFooter__navMenu {
    position: fixed;
    background-color: $white;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 20;
    opacity: 1;
    transition: 0.15s ease-in-out;
    &--hidden {
      transform: translateY(100%);
    }
  }
  .l-spFooter__navMenu__title {
    font-family: 'Darumadrop One', sans-serif;
    text-align: center;
    font-size: 12px;
    margin-bottom: 8px;
    letter-spacing: 0.04rem;
  }
  .l-spFooter__navMenu__content {
    width: 100%;
    overflow-x: scroll;
    padding: 16px 0 12px;
    -webkit-overflow-scrolling: touch;
  }
</style>
