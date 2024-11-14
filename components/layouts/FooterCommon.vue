<template>
  <footer class="l-footerCommon">
    <SpNavMenu class="sp" />
    <CountDownSection />
    <!-- <NekokijiSection class="l-footerCommon__nekokijiSection" /> -->
    <ServiceDescriptionSection class="l-footerCommon__serviceDescription" />
    <FooterMinimum />
  </footer>
</template>
<script setup lang="ts">
  import FooterMinimum from '@/components/layouts/FooterMinimum.vue'
  import SpNavMenu from '@/components/layouts/SpNavMenu.vue'
  import CountDownSection from '@/components/section/CountDownSection.vue'
  // import NekokijiSection from '@/components/section/NekokijiSection.vue'
  import ServiceDescriptionSection from '@/components/section/ServiceDescriptionSection.vue'
</script>
<style lang="scss" scoped>
  .l-footerCommon {
    position: sticky;
    top: 100vh;
    width: 100%;
  }
  .l-footerCommon__main {
    display: flex;
    justify-content: space-between;
    max-width: 1024px;
    margin: 0px auto;
    padding: 40px 0;
  }
  .l-footerCommon__logo {
    margin-bottom: 24px;
    &:hover {
      opacity: 0.7;
    }
  }
  .l-footerCommon__nav__item {
    font-size: 12px;
    margin-bottom: 16px;
  }
  .l-footerCommon__copyRight {
    font-size: 8px;
    color: $text-main;
  }
  @media screen and (max-width: 1024px) {
    .l-footerCommon {
      background-color: $pink;
    }
    .l-footerCommon__main {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px 0 24px;
      margin-bottom: 0;
    }
    .l-footerCommon__left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .l-footerCommon__right {
      text-align: center;
      margin-top: 32px;
    }
    .l-footerCommon__nav__item {
      font-size: 12px;
      margin-bottom: 16px;
    }
  }
</style>
