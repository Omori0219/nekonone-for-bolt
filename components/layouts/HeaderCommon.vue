<template>
  <header class="l-headerCommon">
    <h1 class="l-headerCommon__title">
      <NuxtLink to="/" class="l-headerCommon__logo--container">
        <img
          src="@/assets/img/img-nekonone_logo.svg"
          alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
          class="l-headerCommon__logo"
        />
      </NuxtLink>
    </h1>
  </header>
</template>
<style lang="scss" scoped>
  .l-headerCommon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l-headerCommon__logo {
    &--container {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    max-width: 400px;
    width: 80%;
    object-fit: contain;
  }
</style>
