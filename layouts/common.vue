<template>
  <div class="bg bg--base">
    <div class="l-common pc">
      <HeaderCommon class="l-common__header" />
      <slot />
      <FooterCommon class="l-common__footer" />
    </div>
    <div class="sp">
      <HeaderCommon class="l-common__header" />
      <slot />
      <SpFooter class="sp" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderCommon from '@/components/layouts/HeaderCommon.vue'
  import FooterCommon from '@/components/layouts/FooterCommon.vue'
  import SpFooter from '@/components/layouts/SpFooter.vue'
</script>
<style lang="scss" scoped>
  .l-common__header {
    padding: 80px 0;
  }
  .l-common__footer {
    margin-top: 80px;
  }
</style>
