<template>
  <div class="">
    <UserHeader
      :is-loading="isLoading"
      :is-owner="isOwner"
      :owner-user-id="userId"
      :owner-user-name="userScreenName"
    />
    <div class="p-settingPage">
      <section class="p-settingPage__pageHeader">
        <h2 class="p-settingPage__pageHeader__title">
          <img
            src="@/assets/img/ic-gear.svg"
            alt="歯車のアイコン"
            class="p-settingPage__pageHeader__title--icon"
          />
          <span class="p-settingPage__pageHeader__title--text"
            >せっていページ</span
          >
          <img
            src="@/assets/img/ic-gear.svg"
            alt="歯車のアイコン"
            class="p-settingPage__pageHeader__title--icon"
          />
        </h2>
      </section>
      <section v-if="isSubscribed" class="p-settingPage__subscribe">
        <h2 class="p-settingPage__subscribe__title">
          あなたはねこのねの<br class="sp" />
          <span class="p-settingPage__subscribe__title--decoration"
            >スポンサー</span
          >です!
        </h2>
        <p
          v-if="isWaitingCancel"
          class="p-settingPage__subscribe__isWaitingCancel"
        >
          サブスクリプションは停止中です。<br />
          現在の期間が終了すると <br class="sp" />
          スポンサー状態は自動的に解約されます。
        </p>
        <button
          v-if="!isWaitingCancel"
          class="p-settingPage__subscribe__cancelButton"
          :disabled="isLoading"
          @click="isOpenCancelModal = true"
        >
          スポンサーを解約する
        </button>
      </section>
      <section v-else class="p-settingPage__preparation">
        <p class="p-settingPage__preparation__text">じゅんびちゅうです。</p>
      </section>
      <section class="p-settingPage__deleteAccount">
        <a
          class="p-settingPage__deleteAccount__button"
          href="https://docs.google.com/forms/d/e/1FAIpQLSckPYnY2ypFD83WA56FM3m1K_Lxf3rv2oqKt5qvxFPGo3INpQ/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
          >アカウント削除依頼フォーム</a
        >
      </section>
    </div>
    <div
      v-if="isOpenCancelModal"
      class="p-settingPage__modalArea"
      @click="isOpenCancelModal = false"
    >
      <div class="p-settingPage__modal">
        <p class="p-settingPage__modal__text">
          スポンサーを解約しますか？<br /><br />
          お支払いはただちに停止されます。<br />
          現在の期間が終了すると<br class="sp" />
          スポンサー状態は解除されます。
        </p>
        <button
          class="p-settingPage__modal__button p-settingPage__modal__button--normal"
          @click="cancelSubscription(subscriptionId)"
        >
          スポンサーを解約する
        </button>
        <button
          class="p-settingPage__modal__button p-settingPage__modal__button--back"
          @click="isOpenCancelModal = false"
        >
          戻る
        </button>
      </div>
    </div>
    <div
      v-if="isCanceled"
      class="p-settingPage__modalArea"
      @click="isCanceled = false"
    >
      <div class="p-settingPage__modal">
        <p class="p-settingPage__modal__text">
          サブスクリプションが<br class="sp" />
          解約されました。<br />
          <br />
          現在の期間が終了するとスポンサー状態は解除されます。
        </p>
        <button
          class="p-settingPage__modal__button p-settingPage__modal__button--decorating"
          @click="isCanceled = false"
        >
          とじる
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import UserHeader from '@/components/userPage/UserHeader.vue'
  import { useUserStore } from '@/store/userStore'
  import { useSubscriptionStore } from '@/store/subscriptionStore'
  import { useSubscription } from '@/composables/useSubscription'
  definePageMeta({
    layout: 'three-column',
    middleware: 'page-owner-guard',
  })
  const userStore = useUserStore()
  const subscriptionStore = useSubscriptionStore()
  const { getSubscriptionId, cancelSubscription, isLoading, isCanceled } =
    useSubscription()

  const userId = userStore.user?.userId
  const userScreenName = userStore.user?.userScreenName
  const isSubscribed = userStore.user?.isSubscribed
  const subscriptionId = ref('')
  const isOwner = true
  const isWaitingCancel = subscriptionStore.isWaitingCancel
  const isOpenCancelModal = ref(false)

  onMounted(async () => {
    if (!userId) return
    subscriptionId.value = await getSubscriptionId(userId)
  })
</script>
<style lang="scss" scoped>
  .p-settingPage__pageHeader__title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 24px;
    &--text {
      color: $text-main;
      font-family: 'Darumadrop One', sans-serif;
      font-size: 32px;
      letter-spacing: 0.2rem;
      line-height: 1;
      margin: 0 12px;
    }
    &--icon {
      position: relative;
      top: 4px;
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
  }
  .p-settingPage__subscribe {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }
  .p-settingPage__subscribe__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    letter-spacing: 0.2rem;
    color: $text-main;
    margin-bottom: 48px;
    text-align: center;
    &--decoration {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 32px;
      letter-spacing: 0.2rem;
      color: $yellow;
      display: inline-block;
      margin: 0 6px;
    }
  }
  .p-settingPage__subscribe__isWaitingCancel {
    font-size: 12px;
    color: $red;
    text-align: center;
    margin-bottom: 24px;
  }
  .p-settingPage__subscribe__cancelButton {
    font-size: 12px;
    color: $red;
    text-decoration: underline;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 40px;
  }
  .p-settingPage__preparation {
    padding: 64px 0;
  }
  .p-settingPage__preparation__text {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    text-align: center;
  }
  .p-settingPage__modalArea {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .p-settingPage__modal {
    padding: 40px;
    background-color: $white;
    border-radius: 12px;
    margin: 0 16px;
    z-index: 2;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .p-settingPage__modal__text {
    font-size: 16px;
  }
  .p-settingPage__modal__button {
    font-size: 24px;
    text-align: center;
    margin-top: 32px;
    padding: 6px 40px;
    background-color: $accent-color;
    color: $white;
    border-radius: 12px;
    z-index: 2;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &--normal {
      background-color: $red;
      font-size: 16px;
      padding: 16px 24px;
      min-width: 160px;
    }
    &--decorating {
      font-family: 'Darumadrop One', sans-serif;
    }
    &--back {
      font-size: 16px;
      padding: 16px 24px;
      min-width: 160px;
      background-color: $text-gray;
    }
  }
  .p-settingPage__deleteAccount {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .p-settingPage__deleteAccount__button {
    font-size: 12px;
    text-decoration: underline;
    color: $red;
    text-align: center;
    margin: 24px auto;
  }
</style>
