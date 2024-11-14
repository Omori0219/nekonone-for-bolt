<template>
  <div class="p-timelineSettings">
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSdGdjwOyF2PNA95SVdaw2n77qZo7lb4fM93LveHXyNnwtZl4A/viewform?usp=sf_link"
      target="_blank"
      rel="noopener noreferrer"
      class="p-timelineSettings__settingButton"
    >
      <img
        src="/icon/ic-plus.svg"
        alt="＋のアイコン"
        class="p-timelineSettings__settingButton--img"
      />
    </a>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .p-timelineSettings {
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-timelineSettings__settingButton {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    &--img {
      width: 24px;
      height: 24px;
    }
    :hover {
      opacity: 0.6;
      transform: rotate(20deg);
      transition: 0.2s;
    }
  }
  @media screen and (max-width: 1024px) {
    .p-timelineSettings {
      width: 48px;
    }
    .p-timelineSettings__settingButton {
      &--img {
        width: 12px;
        height: 12px;
      }
    }
  }
</style>
