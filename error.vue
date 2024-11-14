<template>
  <div class="p-error bg--base">
    <img
      src="@/assets/img/img-nekonone_logo.svg"
      alt=""
      class="p-error__logo"
    />
    <h1 class="p-error__title">{{ error.statusCode }}</h1>
    <p class="p-error__text--designed">{{ error.message }}</p>
    <p class="p-error__text">
      {{
        error.statusCode === 404
          ? 'Oops! 404 page not found!'
          : 'Oops! An error has occurred.'
      }}
    </p>
    <button
      class="p-error__button c-button c-button--main c-button--designed"
      @click="handleError"
    >
      Go Back
    </button>
  </div>
</template>

<script setup>
  import { useError, clearError } from '#imports'

  const error = useError()
  const handleError = async () => {
    await clearError({
      redirect: '/',
    })
  }
</script>

<style scoped>
  .p-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }
  .p-error__logo {
    margin-bottom: 40px;
  }
  .p-error__title {
    font-size: 4em;
    display: block;
    margin-bottom: 40px;
    font-family: 'Darumadrop One', sans-serif;
  }
  .p-error__text {
    font-size: 12px;
    margin-bottom: 8px;
    &--designed {
      font-family: 'Darumadrop One', sans-serif;
    }
  }
  .p-error__button {
    margin-top: 20px;
    padding: 10px 20px;
    text-decoration: none;
  }
</style>
