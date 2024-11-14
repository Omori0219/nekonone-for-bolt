<template>
  <section class="p-userProfileInputForm">
    <form class="p-userProfileInputForm__form" @submit.prevent="createAccount">
      <div class="p-userProfileInputForm__form--inner">
        <h2 class="p-userProfileInputForm__form__title c-text--designed">
          あなたのなまえをきめてね
        </h2>
        <div
          v-for="field in formFields"
          :key="field.name"
          :class="[
            'p-userProfileInputForm__form__item',
            `p-userProfileInputForm__form__item--${field.name}`,
          ]"
        >
          <div class="p-userProfileInputForm__form__label--container">
            <div class="p-userProfileInputForm__form__label--paragraph">
              <label
                :for="field.name"
                class="p-userProfileInputForm__form__label c-text--designed"
              >
                {{ field.label }}
              </label>
              <i class="p-userProfileInputForm__form__label--required"
                >ひっす</i
              >
            </div>
            <i class="p-userProfileInputForm__form__label--rule">{{
              field.rule
            }}</i>
          </div>
          <div class="p-userProfileInputForm__form__input--container">
            <input
              :id="field.name"
              v-model="userProfile[field.name]"
              :type="field.type"
              required
              :placeholder="field.placeholder"
              class="p-userProfileInputForm__form__input"
              :class="{ 'input-error': field.error.value !== '' }"
              @input="field.validationMethod"
            />
            <span
              class="p-userProfileInputForm__form__input--counter"
              :class="{
                error: userProfile[field.name].length > field.maxlength,
              }"
            >
              {{ userProfile[field.name].length }}/{{ field.maxlength }}
            </span>
          </div>
          <div class="p-userProfileInputForm__form__error--container">
            <p
              v-if="field.error.value !== ''"
              class="p-userProfileInputForm__form__error"
            >
              {{ field.error.value }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-userProfileInputForm__arrow">↓</div>
      <profileCard
        v-if="catProfileStore.catProfile"
        :user-card-info="userCardInfo"
        :cat-profile="catProfileStore.catProfile"
      />
      <i class="p-userProfileInputForm__attention"
        >※これがあなたのプロフィールになります。</i
      >
      <button
        type="submit"
        class="p-userProfileInputForm__button c-button c-button--main"
        :class="{ 'c-button--disabled': !isFormValid }"
        :disabled="!isFormValid"
      >
        <span
          v-show="isFormValid"
          class="p-userProfileInputForm__button--enableText"
          >ねこのねをはじめる!</span
        >
        <span
          v-show="!isFormValid"
          class="p-userProfileInputForm__button--disableText"
          >ただしくにゅうりょくしてください</span
        >
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/userStore'
  import { useCatProfileStore } from '@/store/catProfileStore'
  import { useUser } from '@/composables/useUser'
  import { type User, type UserCardInfo } from '@/types/user'
  import { validateUserId, validateUserScreenName } from '@/utils/userUtils'
  import profileCard from '@/components/profileCard.vue'

  // userProfileの型を定義
  interface UserProfile {
    [key: string]: string
  }
  const router = useRouter()
  const userStore = useUserStore()
  const catProfileStore = useCatProfileStore()
  const { isUserIdAvailable, createUser } = useUser()

  // userProfileをreactiveで作成
  const userProfile = reactive<UserProfile>({
    userName: '',
    userId: '',
    userNameError: '',
    userIdError: '',
  })
  // userCardInfoをcomputedプロパティとして定義
  const userCardInfo = computed(
    (): UserCardInfo => ({
      userId: userProfile.userId,
      userName: userProfile.userName,
      userIconPath: userStore.user?.userIconPath ?? '',
    })
  )
  const formFields = [
    {
      name: 'userName',
      label: 'なまえ',
      type: 'text',
      placeholder: 'ねこもりにゃーご',
      maxlength: 20,
      rule: 'ひらがな、カタカナ、アルファベット、数字のみ使えます',
      validationMethod: () => {
        const result = validateUserScreenName(userProfile.userName)
        userProfile.userNameError = result.message
      },
      error: computed(() => userProfile.userNameError),
    },
    {
      name: 'userId',
      label: 'ユーザーID',
      type: 'text',
      placeholder: 'nekomori',
      maxlength: 20,
      rule: 'アルファベット、数字のみ使えます',
      validationMethod: () => {
        const result = validateUserId(userProfile.userId)
        userProfile.userIdError = result.message
      },
      error: computed(() => userProfile.userIdError),
    },
  ]

  // フォームが有効かどうかを判定するcomputedプロパティ
  const isFormValid = computed(() => {
    return (
      userProfile.userName !== '' &&
      userProfile.userId !== '' &&
      userProfile.userNameError === '' &&
      userProfile.userIdError === ''
    )
  })
  // createUser 関数の戻り値の型を定義
  interface CreateUserResponse {
    success: boolean
    createdItem?: User // `createdItem` は成功時にのみ存在すると仮定
  }
  // アカウント作成
  const createAccount = async () => {
    // バリデーションエラーがあれば処理を中断
    if (!isFormValid.value) {
      return
    }
    // ユーザーIDの利用可能性をチェック
    const isAvailable = await isUserIdAvailable(userProfile.userId)
    if (isAvailable !== true) {
      userProfile.userIdError =
        'このユーザーIDはすでに使われています。別のIDを入力してください。'
      return
    }
    try {
      const response = await createUser(userProfile.userId, {
        userId: userProfile.userId,
        userScreenName: userProfile.userName,
        userIconPath: userStore.user?.userIconPath ?? '',
        userEmail: userStore.user?.userEmail ?? '',
        followCount: 0,
        followerCount: 0,
        catProfile: {
          breed: catProfileStore.catProfile?.breed ?? '',
          eyeColor: catProfileStore.catProfile?.eyeColor ?? '',
          personality: catProfileStore.catProfile?.personality ?? '',
          favorite: catProfileStore.catProfile?.favorite ?? '',
          others: catProfileStore.catProfile?.others ?? '',
        },
        isSubscribed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      // response を CreateUserResponse 型にアサート
      const typedResponse = response as CreateUserResponse
      if (typedResponse.success) {
        // TypeScriptにcreatedItemの存在を明示するための型アサーション
        const createdUser = typedResponse.createdItem
        if (createdUser == null) {
          throw new Error('Created item is missing in the response')
        }
        //  ユーザーストアにユーザー情報とねこの情報をセット
        userStore.setUser(createdUser)
        if (response == null) {
          throw new Error('Failed save user and cat profile')
        }
        // ユーザーページにリダイレクト
        await router.push(`/users/${createdUser.userId}`)
      } else {
        // エラーハンドリングをここに書く
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      alert('アカウントの作成に失敗しました。もう一度試してみてください。')
    }
  }
</script>
<style lang="scss">
  .p-userProfileInputForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .p-userProfileInputForm__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    max-width: 480px;
    width: 85%;
    &.is-loading {
      filter: blur(5px);
    }
    &--inner {
      background-color: $white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 36px 0;
      border-radius: 12px;
    }
  }
  .p-userProfileInputForm__form__title {
    font-family: 'Darumadrop One', sans-serif;
    color: $text-main;
    font-size: 32px;
    text-align: center;
    margin-bottom: 32px;
  }
  .p-userProfileInputForm__form__item {
    width: 85%;
  }
  .p-userProfileInputForm__form__label {
    &--container {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-left: 4px;
      margin-bottom: 4px;
    }
    font-family: 'Darumadrop One', sans-serif;
    font-size: 16px;
    line-height: 16px;
    display: block;
    margin-right: 8px;
    &--required {
      font-family: 'Darumadrop One', sans-serif;
      background-color: $red;
      width: fit-content;
      height: fit-content;
      color: $white;
      font-size: 10px;
      line-height: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px 6px;
      border-radius: 100px;
      margin-right: 8px;
    }
    &--paragraph {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
    }
    &--rule {
      font-size: 8px;
      line-height: 1;
    }
    .p-userProfileInputForm__form__item--userName & {
      color: $accent-color;
    }
    .p-userProfileInputForm__form__item--userId & {
      color: $text-main;
    }
  }
  .p-userProfileInputForm__form__input {
    &--container {
      position: relative;
    }
    font-family: 'Darumadrop One', sans-serif;
    border-radius: 8px;
    padding: 4px 8px;
    width: 100%;
    border: 2px solid;
    border-color: $bg-gray;
    &::placeholder {
      font-family: 'Darumadrop One', sans-serif;
      color: $bg-gray;
      font-size: 14px;
    }
    &.input-error {
      border-color: $red; // エラー時の枠線の色
    }
    &--counter {
      position: absolute;
      font-size: 6px;
      bottom: 4px;
      right: 8px;
      color: $text-gray;
      &.error {
        color: $red;
        font-weight: bold;
      }
    }
  }
  .p-userProfileInputForm__form__error {
    &--container {
      height: 16px;
    }
    display: block;
    font-size: 8px;
    text-align: right;
    color: $red;
    font-weight: bold;
  }

  .p-userProfileInputForm__arrow {
    font-family: 'Darumadrop One', sans-serif;
    color: $text-gray;
    display: flex;
    justify-content: center;
    font-size: 32px;
    margin: 16px 0;
  }
  .p-userProfileInputForm__attention {
    display: block;
    font-size: 10px;
    text-decoration: none;
    text-align: center;
    margin-bottom: 8px;
    color: $red;
  }
  .p-userProfileInputForm__button {
    text-align: center;
    margin: 40px auto 200px;
    &--enableText {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 16px;
      color: $white;
    }
    &--disableText {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 16px;
      color: $text-gray;
    }
  }
  @media screen and (max-width: 1024px) {
    .p-userProfileInputForm__form__label--container {
      flex-direction: column;
      align-items: flex-start !important;
    }
    .p-userProfileInputForm__form__label--paragraph {
      margin-bottom: 4px;
    }
  }
</style>
