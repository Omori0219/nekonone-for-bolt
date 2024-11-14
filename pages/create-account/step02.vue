<template>
  <div class="p-accountCreationStep02 bg--base">
    <header class="p-accountCreationStep02__header">
      <h1 class="p-accountCreationStep02__logo">
        <img
          src="@/assets/img/img-nekonone_logo.svg"
          alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
          class="p-accountCreationStep02__logo--img"
        />
      </h1>
      <h2 class="p-accountCreationStep02__title">アカウントさくせい 2/2</h2>
    </header>
    <section class="p-accountCreationStep02__displayArea">
      <img
        v-if="userStore.user?.userIconPath"
        :src="userStore.user?.userIconPath"
        alt="Generated Cat Image"
        class="p-accountCreationStep02__displayArea__generatedIcon"
        @error="onUserIconError"
      />
      <img
        v-else
        src="@/assets/img/img-nekonone_logo.svg"
        alt="Cat Icon"
        class="p-accountCreationStep02__displayArea__generatedIcon p-accountCreationStep02__displayArea__generatedIcon--dummy"
      />
    </section>
    <section class="p-accountCreationStep02__choiceArea">
      <i class="p-accountCreationStep02__choiceArea__attention"
        >アカウント作成後の<br />
        アイコンの変更はできません。</i
      >
      <div class="p-accountCreationStep02__choiceArea__buttonArea">
        <div class="p-accountCreationStep02__choiceArea__button--container">
          <span
            v-show="!isAccepted"
            class="p-accountCreationStep02__choiceArea__button__text p-accountCreationStep02__choiceArea__button__text--retry"
            >やりなおす</span
          ><span
            v-show="isAccepted"
            :class="{ isAccepted: isAccepted }"
            class="p-accountCreationStep02__choiceArea__button__text p-accountCreationStep02__choiceArea__button__text--retry"
            >やっぱりやりなおす</span
          >
          <span
            v-show="!isAccepted"
            class="p-accountCreationStep02__choiceArea__button__arrow p-accountCreationStep02__choiceArea__button__arrow--retry"
            >↓</span
          >
          <button
            class="p-accountCreationStep02__choiceArea__button p-accountCreationStep02__choiceArea__button--retry"
            @click="retryCreation"
          >
            <img
              src="@/assets/img/ic-backArrow.svg"
              alt=""
              class="p-accountCreationStep02__choiceArea__button__icon p-accountCreationStep02__choiceArea__button__icon--retry"
            />
          </button>
        </div>
        <div class="p-accountCreationStep02__choiceArea__button--container">
          <span
            v-show="!isAccepted"
            class="p-accountCreationStep02__choiceArea__button__text p-accountCreationStep02__choiceArea__button__text--accept"
            >このアイコンにする!</span
          >
          <span
            v-show="isAccepted"
            class="p-accountCreationStep02__choiceArea__button__text p-accountCreationStep02__choiceArea__button__text--accept"
            :class="{ isAccepted: isAccepted }"
            >おされました</span
          >
          <span
            v-show="!isAccepted"
            class="p-accountCreationStep02__choiceArea__button__arrow p-accountCreationStep02__choiceArea__button__arrow--accept"
            >↓</span
          >
          <span
            v-show="isAccepted"
            class="p-accountCreationStep02__choiceArea__button__arrow p-accountCreationStep02__choiceArea__button__arrow--accept"
          ></span>
          <button
            :class="{ isAccepted: isAccepted }"
            class="p-accountCreationStep02__choiceArea__button p-accountCreationStep02__choiceArea__button--accept"
            @click="acceptIcon"
          >
            <img
              src="@/assets/img/ic-check.svg"
              alt=""
              class="p-accountCreationStep02__choiceArea__button__icon p-accountCreationStep02__choiceArea__button__icon--accept"
            />
          </button>
        </div>
      </div>
    </section>
    <section
      class="p-accountCreationStep02__userProfileInputForm"
      :class="{ isAccepted: isAccepted }"
    >
      <p class="p-accountCreationStep02__userProfileInputForm__introduction">
        では、さいごに、<br />
        あなたの名前とIDを決めてください。
      </p>
      <userProfileInputForm />
      <div
        v-if="showDialog"
        title="エラー"
        message="アイコンの生成に失敗しました。ステップ1に戻ってください。"
        @confirm="confirmDialog"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { onUserIconError } from '@/utils/dummyImages'
  import userProfileInputForm from '@/components/createAccount/userProfileInputForm.vue'
  import { useUserStore } from '@/store/userStore'
  import { useCatProfileStore } from '@/store/catProfileStore'
  import { useStorage } from '@/composables/useStorage'
  definePageMeta({
    middleware: ['account-creation-auth'],
  })
  const router = useRouter()
  const userStore = useUserStore()
  const catProfileStore = useCatProfileStore()
  const { resizeAndUploadToBlobStorage } = useStorage()
  const isUploading = ref(false)
  const showDialog = ref(false)
  const isAccepted = ref(false) // ユーザーがアイコンを決定したかどうか

  // ダイアログの確認アクション
  async function confirmDialog() {
    try {
      await router.push('/create-account/step01') // step01に戻る
    } catch (error) {
      // エラーハンドリング: ユーザーに通知するか、ログに記録するなど
      console.error('Navigation error:', error) // eslint-disable-line no-console
    }
  }
  // アイコンを決定した場合のイベントハンドラ
  const acceptIcon = () => {
    isAccepted.value = true // アイコンを決定したというフラグを立てる
    const userProfileFormElement = document.querySelector(
      '.p-accountCreationStep02__userProfileInputForm'
    )
    if (userProfileFormElement) {
      userProfileFormElement.scrollIntoView({ behavior: 'auto' })
    }
  }
  // やり直しボタンのイベントハンドラ
  const retryCreation = () => {
    // 確認ダイアログを表示
    const confirmRetry = window.confirm(
      '一つ前のページに戻りますか？\nこのアイコンを再度表示することはできません。'
    )
    if (confirmRetry) {
      // ユーザーがOKをクリックした場合
      catProfileStore.clearCatProfile() // ねこのプロフィールをクリア
      router.push('/create-account/step01') // step01に戻る
    }
  }
  onMounted(() => {
    // マウント時に生成された猫アイコン画像をストレージに保存する。
    const userIconPath = userStore.user?.userIconPath ?? ''
    if (userIconPath === '' || typeof userIconPath !== 'string') {
      // エラーの場合、ダイアログを表示して、step01に戻す
      console.error('userIconPath must be a string and cannot be empty') // eslint-disable-line no-console
      showDialog.value = true
      return
    }
    isUploading.value = true
    resizeAndUploadToBlobStorage(userIconPath, 'cat-image', 400, 400)
      .then((resizedImage) => {
        if (typeof resizedImage === 'string') {
          userStore.updateUserProperty('userIconPath', resizedImage)
        } else {
          throw new TypeError('resizedImage is not a string')
        }
      })
      .catch((error) => {
        console.error('Image upload failed:', error) // eslint-disable-line no-console
        isUploading.value = false
      })
  })
</script>
<style lang="scss">
  .p-accountCreationStep02 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .p-accountCreationStep02__header {
    margin-top: 40px;
  }
  .p-accountCreationStep02__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    &--img {
      width: 120px;
      object-fit: contain;
    }
  }
  .p-accountCreationStep02__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 32px;
    margin-bottom: 40px;
  }
  .p-accountCreationStep02__displayArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .p-accountCreationStep02__displayArea__note {
    font-size: 16px;
    margin-bottom: 12px;
  }
  .p-accountCreationStep02__displayArea__generatedIcon {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    margin-bottom: 24px;
  }
  .p-accountCreationStep02__choiceArea {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .p-accountCreationStep02__choiceArea {
    width: 100%;
    margin-bottom: 40px;
  }
  .p-accountCreationStep02__choiceArea__attention {
    font-size: 10px;
    text-align: center;
    display: block;
    margin-bottom: 24px;
    color: $red;
  }
  .p-accountCreationStep02__choiceArea__buttonArea {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .p-accountCreationStep02__choiceArea__button {
    &--container {
      margin: 0 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    border-radius: 100%;
    margin-bottom: 4px;
    background-color: $bg-gray;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    &--accept {
      background-color: $accent-color;
      &.isAccepted {
        opacity: 0.3 !important;
        background-color: $confirm-color;
        box-shadow: 0 0 0px rgba(0, 0, 0, 0) !important;
        pointer-events: none; // ユーザー操作を受け付けないようにする
      }
    }
    &--retry {
      background-color: $bg-gray;
    }
    &:hover {
      opacity: 0.8;
      transition: 0.1s ease-in-out;
      box-shadow: 0 0 14px rgba(0, 0, 0, 0.2);
    }
  }
  .p-accountCreationStep02__choiceArea__button__text {
    font-size: 20px;
    color: $text-main;
    line-height: 1;
    display: block;
    font-family: 'Darumadrop One', sans-serif;
    &--accept {
      color: $accent-color;
      &.isAccepted {
        opacity: 0.3;
        color: $confirm-color;
      }
    }
    &--retry {
      color: $text-main;
      &.isAccepted {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
  .p-accountCreationStep02__choiceArea__button__arrow {
    font-size: 16px;
    color: $text-main;
    display: block;
    margin-bottom: 8px;
    font-family: 'Darumadrop One', sans-serif;
    &--accept {
      color: $accent-color;
    }
    &--retry {
      color: $text-main;
    }
  }
  .p-accountCreationStep02__choiceArea__button__icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    &--retry {
      transform: scale(1, -1);
    }
  }
  .p-accountCreationStep02__userProfileInputForm {
    width: 100%;
    margin-top: 40px;
    padding-top: 80px;
    &.isAccepted {
      transition: 0.2s ease-in-out;
      filter: blur(0px);
    }
    &:not(.isAccepted) {
      transition: 0.2s ease-in-out;
      filter: blur(5px);
      pointer-events: none; // ユーザー操作を受け付けないようにする
    }
  }
  .p-accountCreationStep02__userProfileInputForm__introduction {
    text-align: center;
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 2;
  }
  @media screen and (max-width: 1024px) {
    .p-accountCreationStep02__userProfileInputForm__introduction {
      margin-bottom: 32px;
      font-size: 14px;
      line-height: 2;
    }
  }
</style>
