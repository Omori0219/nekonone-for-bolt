<template>
  <div class="p-accountCreationStep01 bg--base">
    <header class="p-accountCreationStep01__header">
      <h1 class="p-accountCreationStep01__logo">
        <img
          src="@/assets/img/img-nekonone_logo.svg"
          alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
          class="p-accountCreationStep01__logo--img"
        />
      </h1>
      <h2 class="p-accountCreationStep01__title">アカウントさくせい 1/2</h2>
    </header>
    <p class="p-accountCreationStep01__introduction">
      プロフィールから <br class="sp" />
      オリジナルアイコンをつくるよ!
    </p>
    <catProfileInputForm />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import catProfileInputForm from '@/components/createAccount/catProfileInputForm.vue'
  definePageMeta({
    middleware: ['account-creation-auth'],
  })

  const userEmail = ref('')
  const { data } = useAuth()

  onMounted(async () => {
    const session = await data.value
    userEmail.value = session?.user?.email || 'Not logged in'
  })
</script>
<style lang="scss" scoped>
  .p-accountCreationStep01 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .p-accountCreationStep01__header {
    margin-top: 40px;
  }
  .p-accountCreationStep01__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    &--img {
      width: 120px;
      object-fit: contain;
    }
  }
  .p-accountCreationStep01__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 32px;
    margin-bottom: 40px;
  }
  .p-accountCreationStep01__introduction {
    font-family: 'Darumadrop One', sans-serif;
    text-align: center;
    margin-bottom: 40px;
    font-size: 32px;
    line-height: 2;
    color: $accent-color;
  }
  @media screen and (max-width: 1024px) {
    .p-accountCreationStep01__introduction {
      margin-bottom: 32px;
      font-size: 24px;
      line-height: 1;
    }
  }
</style>
