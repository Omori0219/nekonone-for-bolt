<template>
  <footer class="l-threeColumnFooter">
    <CountDownSection />
    <!-- <NekokijiSection class="l-threeColumnFooter__nekokijiSection" /> -->
    <ServiceDescriptionSection
      class="l-threeColumnFooter__serviceDescription"
    />
  </footer>
</template>
<script setup lang="ts">
  import CountDownSection from '@/components/section/CountDownSection.vue'
  // import NekokijiSection from '@/components/section/NekokijiSection.vue'
  import ServiceDescriptionSection from '@/components/section/ServiceDescriptionSection.vue'
</script>
<style lang="scss" scoped>
  .l-threeColumnFooter {
  }
</style>
