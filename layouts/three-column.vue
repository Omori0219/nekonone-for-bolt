<template>
  <div class="bg bg--base">
    <div class="l-threeColumn pc">
      <ThreeColumnLeft class="l-threeColumn__left pc" />
      <div class="l-threeColumn__main">
        <slot />
        <ThreeColumnFooter class="l-threeColumn__footer pc" />
      </div>
      <ThreeColumnRight class="l-threeColumn__right pc" />
    </div>
    <div class="l-threeColumn--sp sp">
      <SpHeader class="l-threeColumn__spHeader sp" />
      <div class="l-threeColumn__spMain">
        <slot />
      </div>
      <SpFooter class="l-threeColumn__spFooter sp" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ThreeColumnLeft from '@/components/layouts/ThreeColumnLeft.vue'
  import ThreeColumnRight from '@/components/layouts/ThreeColumnRight.vue'
  import ThreeColumnFooter from '@/components/layouts/ThreeColumnFooter.vue'
  import SpHeader from '@/components/layouts/SpHeader.vue'
  import SpFooter from '@/components/layouts/SpFooter.vue'
</script>
<style lang="scss" scoped>
  .l-threeColumn {
    display: flex;
    justify-content: center;
    position: relative;
    min-height: 100vh;
  }
  .l-threeColumn__main {
    flex-grow: 1;
    max-width: 640px;
    background-color: $white;
  }
  .l-threeColumn__left {
    min-width: 320px;
    padding-right: 32px;
  }
  .l-threeColumn__right {
    min-width: 320px;
    padding-left: 32px;
  }
  .l-threeColumn__serviceDescription {
    position: sticky;
    top: 100vh;
  }

  @media screen and (max-width: 1024px) {
    .l-threeColumn {
      flex-direction: column;
    }
    .l-threeColumn--sp {
      background-color: $white;
    }
    .l-threeColumn__spMain {
      padding-top: 64px;
    }
    .l-threeColumn__spFooter {
      padding-bottom: 88px;
    }
  }
</style>
