<template>
  <div class="p-topPage bg--base">
    <section class="p-topPage__heroView">
      <h1 class="p-topPage__heroView__image--container">
        <img
          src="@/assets/img/img-hero-pc.png"
          alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
          class="p-topPage__heroView__image p-topPage__heroView__image--pc pc"
        />
        <img
          src="@/assets/img/img-hero-sp.png"
          alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
          class="p-topPage__heroView__image p-topPage__heroView__image--sp sp"
        />
      </h1>
      <!-- <h2 class="p-topPage__heroView__appeal">
        あなただけのねこアイコンがつくれる!
      </h2> -->
      <!-- <section class="p-topPage__newArrivalUserBanner">
        <NewArrivalUserBanner />
      </section> -->
      <p
        v-show="!userStore.user?.userId"
        class="p-topPage__heroView__button--decoration"
      >
        \ あなただけのねこのアイコンがつくれるよ /
      </p>
      <LoginButton class="p-topPage__heroView__button" />
    </section>
    <section class="p-topPage__timeline">
      <h2 class="p-topPage__timeline__title">ねこのねのタイムライン</h2>
      <div class="p-topPage__timeline__content">
        <Timeline
          v-if="timelinePosts"
          :posts="timelinePosts"
          :is-loading="isLoading"
          :error="error"
          :has-more="hasMore"
        />
      </div>
      <LoginButton class="p-topPage__timeline__button" />
    </section>
    <!-- <CountDownSection /> -->
    <ServiceDescriptionSection class="p-topPage__introduction" />
    <section class="p-topPage__newArrivalUsers">
      <h2 class="p-topPage__newArrivalUsers__title">ねこのねのにゃーかまー</h2>
      <NewArrivalUserList
        :user-limit="displayUserNumber"
        class="p-topPage__newArrivalUsers__list"
      />
    </section>
    <section class="p-userPage__shareArea">
      <button class="p-userPage__shareArea__button--x" @click="shareOnTwitter">
        <img
          src="@/assets/img/ic-sns--x.svg"
          alt="Xで共有する"
          class="p-userPage__shareArea__button__icon--x"
        />
        <p class="p-userPage__shareArea__button__text">Xでねこのねをひろめる</p>
      </button>
    </section>
    <FooterTopPage />
  </div>
</template>
<script setup lang="ts">
  import LoginButton from '@/components/auth/LoginButton.vue'
  import FooterTopPage from '@/components/layouts/FooterTopPage.vue'
  // import NewArrivalUserBanner from '@/components/NewArrivalUserBanner.vue'
  import NewArrivalUserList from '@/components/NewArrivalUserList.vue'
  import Timeline from '@/components/pages/home/Timeline.vue'
  import ServiceDescriptionSection from '@/components/section/ServiceDescriptionSection.vue'
  import { useUserStore } from '@/store/userStore'
  import { type NawabariType } from '@/types/nawabariType'
  const userStore = useUserStore()
  const { timelinePosts, isLoading, error, hasMore, loadTimelinePosts } =
    useTimeline()
  const selectedTab = ref<NawabariType>('none')
  // 表示するユーザー数
  const displayUserNumber = 40

  // 投稿内容を含むシェアメッセージの生成
  const createShareMessage = () => {
    const serviceName = 'ねこのね' // サービス名
    const hashtags = 'ねこのSNS' // ハッシュタグ
    const serviceUrl = 'https://nekonone.jp' // サービスのURL
    const message = `ねこのね | ねこの、ねこによる、ねこのためのSNS\n\n#${serviceName} #${hashtags} \n${serviceUrl}`
    return encodeURIComponent(message)
  }

  // Twitterでシェアする関数
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${createShareMessage()}`
    window.open(url, '_blank')
  }
  onMounted(() => {
    loadTimelinePosts(selectedTab.value, 0)
  })
</script>
<style lang="scss" scoped>
  .p-topPage {
    background-color: $off-white;
  }
  .p-topPage__newArrivalUserBanner {
    background-color: $white;
    padding: 24px 0 8px;
    margin-bottom: 40px;
    overflow-x: hidden;
    max-width: 100%;
  }
  .p-topPage__newArrivalUserBanner__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 16px;
    color: $accent-color;
    padding: 0 12px;
  }
  .p-topPage__heroView {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 40px;
    margin-bottom: 80px;
  }
  .p-topPage__heroView__image {
    &--container {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-bottom: 64px;
    }
    &--pc {
      max-height: 70vh;
      object-fit: contain;
    }
    &--sp {
      width: 90%;
    }
  }
  .p-topPage__heroView__appeal {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 32px;
    color: $accent-color;
    text-align: center;
    line-height: 1;
    margin-bottom: 24px;
  }
  .p-topPage__heroView__demoImage {
    width: 160px;
    height: 160px;
    object-fit: contain;
    margin-bottom: 40px;
    animation: pulse 3s ease-in-out infinite;
  }
  .p-topPage__heroView__button {
    &--decoration {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 14px;
      line-height: 1;
      color: $text-main;
      margin-bottom: 8px;
    }
  }
  .p-topPage__introduction {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: $dark-blue;
  }
  .p-topPage__introduction__copy {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    line-height: 1.5;
    color: $white;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .p-topPage__introduction__image {
    margin: 0 auto 40px;
    width: 200px;
    object-fit: contain;
  }

  .p-topPage__introduction__link {
    &--x {
      font-family: 'Darumadrop One', sans-serif;
      color: $white;
      margin: 0 auto;
      font-size: 20px;
      line-height: 2;
      border: 2px solid #fff;
      border-radius: 100px;
      padding: 8px 32px;
    }
  }
  .p-topPage__timeline {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 64px 0;
    background-color: $dark-green;
  }
  .p-topPage__timeline__content {
    background-color: $white;
    border-radius: 20px;
    height: 400px;
    overflow: scroll;
    max-width: 480px;
    margin: 0 24px 40px;
  }
  .p-topPage__timeline__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    text-align: center;
    color: $off-white;
    margin-bottom: 12px;
  }
  .p-topPage__newArrivalUsers {
    text-align: center;
    padding: 64px 0 0;
    background-color: $cream;
  }
  .p-topPage__newArrivalUsers__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    color: $text-main;
    margin-bottom: 24px;
  }
  .p-topPage__newArrivalUsers__list {
    max-width: 600px;
    margin: 0 auto;
  }
  .p-topPage__socialShare {
    width: 100%;
    &--inner {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
  .p-topPage__socialShare__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 16px;
    color: $white;
    text-align: center;
    margin-bottom: 6px;
  }
  // TODO:一旦。後で共通化する
  .p-userPage__shareArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    background-color: $cream;
    padding: 40px 0 64px;
  }
  .p-userPage__shareArea__button {
    &--x {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $text-main;
      border-radius: 100px;
      padding: 16px 32px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
  .p-userPage__shareArea__button__icon {
    &--x {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
  }
  .p-userPage__shareArea__button__text {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 16px;
    line-height: 1;
    color: $white;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(-5deg);
    }
  }
  @media screen and (max-width: 1024px) {
    .p-topPage__heroView__appeal {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .p-topPage__heroView__demoImage {
      width: 120px;
      height: 120px;
    }
  }
</style>
