<template>
  <div>
    <header class="p-purchasePage__header">
      <h2 class="p-purchasePage__header__title">
        <span class="p-purchasePage__header__title--text"
          >スポンサーになる</span
        >
      </h2>
    </header>
    <section class="p-purchasePage__introduction">
      <div class="p-purchasePage__introduction--inner">
        <p class="p-purchasePage__introduction__text">
          スポンサーになると、<br class="sp" />
          ねこのねのサービス内で特典を得られます。
        </p>
        <p class="p-purchasePage__introduction__text">
          また、スポンサーの方々からいただいたご支援金の一部は、<br />
          保護ねこ団体への寄付に充てさせていただきます。
        </p>
        <p class="p-purchasePage__introduction__text">
          特典は随時追加予定です。
        </p>
      </div>
    </section>
    <section class="p-purchasePage__special">
      <h3 class="p-purchasePage__special__title">
        <span class="p-purchasePage__special__title--icon">¤</span>
        <span class="p-purchasePage__special__title--text"
          >スポンサーとくてん</span
        >
        <span class="p-purchasePage__special__title--icon">¤</span>
      </h3>
      <ul class="p-purchasePage__special__list">
        <li class="p-purchasePage__special__item">
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__number"
            >1.</span
          >
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__content"
            >おたからバッチ<img
              src="@/assets/img/ic-sponsorBadge--fish.svg"
              alt=""
              class="p-purchasePage__special__item__icon--fish"
            />
            が<br class="sp" />
            なまえのよこにつく!</span
          >
        </li>
        <li class="p-purchasePage__special__item">
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__number"
            >2.</span
          >
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__content"
            >アイコンをつくりなおせる!!</span
          >
        </li>
        <li class="p-purchasePage__special__item">
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__number"
            >3.</span
          >
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__content"
            >こうこくをのけれる!!</span
          >
        </li>
        <p class="p-purchasePage__special__plus">+</p>
        <li class="p-purchasePage__special__item">
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__number"
            >∞.</span
          >
          <span
            class="p-purchasePage__special__item__text p-purchasePage__special__item__content"
            >ねこのスマイル</span
          >
        </li>
      </ul>
    </section>
    <section class="p-purchasePage__purchase">
      <h3 class="p-purchasePage__purchase__title">スポンサー金額を選択</h3>
      <p class="p-purchasePage__purchase__text">¥300〜¥5000の間で選択します</p>
      <div class="p-purchasePage__purchase__input__field--container">
        <input
          v-model="price"
          class="p-purchasePage__purchase__input__field"
          type="number"
          min="300"
          step="100"
          placeholder="Enter the amount you want to pay monthly"
        />
        <span class="p-purchasePage__purchase__input__field--label">円/月</span>
      </div>
      <div class="p-purchasePage__purchase__input__slider--container">
        <span class="p-purchasePage__purchase__input__slider--label">¥300</span>
        <input
          v-model="price"
          class="p-purchasePage__purchase__input__slider"
          type="range"
          min="300"
          step="100"
          max="5000"
        />
        <span class="p-purchasePage__purchase__input__slider--label"
          >¥5000</span
        >
      </div>
      <p v-if="errorMessage" class="p-purchasePage__purchase__error">
        {{ errorMessage }}
      </p>
      <div class="p-purchasePage__purchase__button--container">
        <button
          class="p-purchasePage__purchase__button"
          @click="redirectToCheckout"
        >
          このきんがくですすむ
        </button>
        <p class="p-purchasePage__purchase__button--note">じゅんびちゅう!</p>
      </div>
      <p class="p-purchasePage__purchase__bottomText">
        決済サービスのStripeに移動します。<br />
        決済後はいつでも解約できます。
      </p>
    </section>
    <div
      v-if="showModal"
      class="p-purchasePage__loginModal"
      @click="showModal = false"
    >
      <div class="p-purchasePage__loginModal--inner">
        <div class="p-purchasePage__loginModal__closeButton--container">
          <button
            class="p-purchasePage__loginModal__closeButton"
            @click="showModal = false"
          >
            ×
          </button>
        </div>
        <p class="p-purchasePage__loginModal__text">
          この先の操作はログインが必要です。
        </p>
        <LoginButton class="p-purchasePage__loginModal__loginButton" />
      </div>
    </div>
    <section class="p-purchasePage__faq">
      <div class="p-purchasePage__faq--inner">
        <h2 class="p-purchasePage__faq__title">購入に関するFAQ</h2>
        <FaqItems :user-id="userId" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { loadStripe, type Stripe } from '@stripe/stripe-js'
  import LoginButton from '@/components/auth/LoginButton.vue'
  import FaqItems from '@/components/sponsorsPage/FaqItems.vue'
  import { useUserStore } from '@/store/userStore'
  const userStore = useUserStore()
  const config = useRuntimeConfig()
  const userId = userStore.user?.userId
  const price = ref(500)
  const errorMessage = ref('')
  const showModal = ref(false) // モーダルの表示状態を管理するリアクティブプロパティ
  let stripe: Stripe | null = null
  definePageMeta({
    layout: 'three-column',
  })
  const validatePrice = (price: number) => {
    if (price < 300) {
      return '金額は300円以上である必要があります'
    } else if (price > 5000) {
      return '金額は5000円以下である必要があります'
    } else if (price % 100 !== 0) {
      return '金額は100円刻みである必要があります'
    } else if (isNaN(price)) {
      return '有効な数値を入力してください'
    } else {
      return ''
    }
  }

  onMounted(async () => {
    const stripePublishableKey = config.public.stripePublishableKey
    if (typeof stripePublishableKey === 'string') {
      stripe = await loadStripe(stripePublishableKey)
    } else {
      console.error('Stripe publishable key not found or not a string') // eslint-disable-line no-console
    }
  })

  const redirectToCheckout = async () => {
    errorMessage.value = validatePrice(price.value)
    if (errorMessage.value) {
      return
    }
    if (!userId) {
      showModal.value = true // ユーザーがログインしていない場合、モーダルを表示
      return
    }
    const response = await fetch('/api/stripe/createCheckoutSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId, // Use the actual user ID
        price, // Stripe uses cents for pricing
      }),
    })

    if (!response.ok) {
      console.error('Failed to create checkout session') // eslint-disable-line no-console
      return
    }

    const { sessionId } = await response.json()

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) {
        console.error(error) // eslint-disable-line no-console
      }
    }
  }
</script>
<style lang="scss" scoped>
  .p-purchasePage__header {
    background-color: $yellow;
    padding: 64px 0 64px;
  }
  .p-purchasePage__header__title {
    text-align: center;
    &--text {
      display: inline-block;
      color: $white;
      font-family: 'Darumadrop One', sans-serif;
      font-size: 32px;
      margin: 0 16px;
    }
  }
  .p-purchasePage__introduction {
    padding: 40px 0;
    &--inner {
      margin: 0 24px;
    }
  }
  .p-purchasePage__introduction__text {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 16px;
    text-align: center;
  }
  .p-purchasePage__special {
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .p-purchasePage__special__title {
    &--text {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 24px;
      color: $yellow;
      margin: 0 8px;
    }
    &--icon {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 24px;
      color: $yellow;
    }
    text-align: center;
    margin-bottom: 32px;
  }
  .p-purchasePage__special__list {
    display: flex;
    flex-direction: column;
    margin: 0 24px;
    padding: 30px 24px 16px;
    border-radius: 12px;
    background-color: $floral-white;
    max-width: 520px;
    width: 80%;
  }
  .p-purchasePage__special__item {
    display: flex;
    margin-bottom: 16px;
    &--preparation {
      text-decoration: line-through;
      opacity: 0.3;
    }
  }
  .p-purchasePage__special__item__text {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
  }
  .p-purchasePage__special__item__number {
    color: $yellow;
    display: inline-block;
    margin-right: 12px;
  }
  .p-purchasePage__special__plus {
    font-family: 'Darumadrop One', sans-serif;
    text-align: center;
    font-size: 24px;
    color: $yellow;
  }
  .p-purchasePage__special__item__icon {
    &--fish {
      width: 16px;
      height: 16px;
      object-fit: contain;
      display: inline;
      position: relative;
      top: 2px;
      margin-left: 4px;
    }
  }
  .p-purchasePage__purchase {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 64px;
  }
  .p-purchasePage__purchase__title {
    font-size: 16px;
    margin-bottom: 32px;
    font-weight: bold;
  }
  .p-purchasePage__purchase__text {
    font-size: 12px;
    margin-bottom: 16px;
  }
  .p-purchasePage__purchase__input__field {
    &--container {
      margin-bottom: 24px;
    }
    font-size: 16px;
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    box-shadow: 0 0 0 1px #ccc inset;
    max-width: 100px;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px rgb(33, 150, 243) inset;
    }
    &--label {
      font-size: 12px;
      margin-left: 8px;
      letter-spacing: 0.2em;
    }
  }
  .p-purchasePage__purchase__input__slider {
    &--container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0 24px;
      margin-bottom: 32px;
      max-width: 320px;
    }
    &--label {
      font-size: 12px;
    }
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer; // カーソルを分かりやすく
    background: $bg-gray; // バーの背景色
    height: 4px; // バーの高さ
    width: 80%; // スライダーの幅
    // max-width: 500px;
    border-radius: 10px; // バーの端の丸み
    border: none; // バーまわりの線
    outline: 0; /* アウトラインを消して代わりにfocusのスタイルをあてる */
    margin: 0 12px;
    &:focus {
      box-shadow: 0 0 3px rgb(0, 161, 255);
    }
    // -webkit-向けのつまみ
    &::-webkit-slider-thumb {
      -webkit-appearance: none; // デフォルトのつまみのスタイルを解除
      background: $white; // 背景色
      width: 16px; // 幅
      height: 16px; // 高さ
      border-radius: 50%; // 円形に
      border: 1px solid $bg-gray;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); // 影
    }
    // -moz-向けのつまみ
    &::-moz-range-thumb {
      background: $white; // 背景色
      width: 16px; // 幅
      height: 16px; // 高さ
      border-radius: 50%;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); // 影
      border: 1px solid $bg-gray;
    }
    // Firefoxで点線が周りに表示されてしまう問題の解消
    &::-moz-focus-outer {
      border: 0;
    }
    // つまみをドラッグしているときのスタイル
    &:active::-webkit-slider-thumb {
      box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.3);
    }
  }
  .p-purchasePage__purchase__button {
    &--container {
      position: relative;
    }
    font-family: 'Darumadrop One', sans-serif;
    background-color: $yellow;
    color: $white;
    padding: 8px 32px;
    border-radius: 8px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    opacity: 0.2; // 準備期間中のみ！
    pointer-events: none; // 準備期間中のみ！
    &--note {
      font-size: 12px;
      font-family: 'Darumadrop One', sans-serif;
      color: $red;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .p-purchasePage__purchase__bottomText {
    font-size: 12px;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 40px;
  }
  .p-purchasePage__purchase__error {
    font-size: 12px;
    text-align: center;
    color: $red;
  }
  .p-purchasePage__loginModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 24px;
    &--inner {
      background-color: $white;
      border-radius: 12px;
      padding: 16px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      flex-direction: column;
    }
  }
  .p-purchasePage__loginModal__text {
    font-size: 14px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .p-purchasePage__loginModal__closeButton {
    line-height: 1;
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    &--container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .p-purchasePage__faq {
    max-width: 460px;
    margin: 0 auto 64px;
    &--inner {
      margin: 0 12px;
    }
  }
  .p-purchasePage__faq__title {
    font-size: 14px;
    font-weight: bold;
    color: $text-main;
  }
  @media screen and (max-width: 1024px) {
    .p-purchasePage__introduction__text {
      text-align: left;
    }
  }
</style>
