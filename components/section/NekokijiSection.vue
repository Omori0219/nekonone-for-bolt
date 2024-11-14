<template>
  <section class="p-nekokijiSection">
    <p class="p-nekokijiSection__title">ねこきじ、ねこのことをあつめたきじ。</p>
    <NuxtLink to="/nekokiji" class="p-nekokijiSection__link--container">
      <p class="p-nekokijiSection__link">ねこきじをよむ →</p>
    </NuxtLink>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
  .p-nekokijiSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0 40px;
    background-color: $off-white;
  }
  .p-nekokijiSection__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    color: $text-main;
    margin-bottom: 24px;
  }
  .p-nekokijiSection__link {
    &--container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 40px;
      border-radius: 100px;
      background-color: $accent-color;
      &:hover {
        opacity: 0.7;
      }
    }
    font-family: 'Darumadrop One', sans-serif;
    display: block;
    color: $white;
    line-height: 1;
  }
</style>
