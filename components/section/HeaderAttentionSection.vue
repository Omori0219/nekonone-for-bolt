<template>
  <section class="p-headerAttentionSection">
    <div class="p-headerAttentionSection--inner">
      <p class="p-headerAttentionSection__text">
        現在、LINEからのログインに不具合が発生しております。<br />
        右下にある「ブラウザで開く」をタップして、<br class="sp" />
        他の画面からログインしてください。
      </p>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
  .p-headerAttentionSection {
    width: 100%;
    padding: 12px 0;
    background-color: $brand-line;
    &--inner {
      padding: 0 16px;
    }
  }
  .p-headerAttentionSection__text {
    font-size: 12px;
    text-align: center;
    line-height: 1.2;
    color: $white;
  }
  @media screen and (max-width: 1024px) {
  }
</style>
