<template>
  <section class="p-catProfileInputForm">
    <LoadingIndicator :is-loading="isLoading" />
    <ErrorModal
      v-if="showErrorModal"
      :error-message="apiError"
      @close="showErrorModal = false"
    />
    <form class="p-catProfileInputForm__form" @submit.prevent="submitForm">
      <section
        class="p-catProfileInputForm__catFields p-catProfileInputForm__form--inner"
      >
        <h2 class="p-catProfileInputForm__form__title">
          あなたのことをおしえてね
        </h2>
        <i class="p-catProfileInputForm__form__rule"
          >ひらがな、カタカナ、アルファベット、数字のみ使えます。<br />
          漢字は使えません。</i
        >
        <div
          v-for="(field, index) in catInfoFields"
          :key="'catInfo-' + index"
          :class="[
            'p-catProfileInputForm__form__item',
            `p-catProfileInputForm__form__item--${field.name}`,
          ]"
        >
          <div class="p-catProfileInputForm__form__label--container">
            <label
              :for="field.name"
              class="p-catProfileInputForm__form__label"
              >{{ field.label }}</label
            >
            <i
              v-if="field.required !== false"
              class="p-catProfileInputForm__form__label--required"
              >ひっす</i
            >
          </div>
          <div class="p-catProfileInputForm__form__input--container">
            <input
              :id="field.name"
              v-model="catProfile[field.name]"
              class="p-catProfileInputForm__form__input"
              :class="{ 'input-error': errors[field.name] }"
              :required="field.required !== false"
              :type="field.type"
              :placeholder="field.placeholder"
              @input="checkField(field.name)"
            />
            <span
              class="p-catProfileInputForm__form__input--counter"
              :class="{
                error:
                  (catProfile[field.name] || '').length > catProfileMaxLength,
              }"
            >
              {{ catProfile[field.name]?.length ?? 0 }}/{{
                catProfileMaxLength
              }}
            </span>
          </div>
          <div class="p-catProfileInputForm__form__error--container">
            <span
              v-show="errors[field.name]"
              class="p-catProfileInputForm__form__error"
              >※{{ errors[field.name] }}</span
            >
          </div>
        </div>
      </section>
      <div class="p-catProfileInputForm__arrow">↓</div>
      <section class="p-catProfileInputForm__displayArea">
        <profileCard :cat-profile="catProfile" />
        <i class="p-catProfileInputForm__attention"
          >※これがあなたのプロフィールになります。</i
        >
      </section>
      <section class="p-catProfileInputForm__patternFields">
        <p class="p-catProfileInputForm__patternFields__plus">+</p>
        <p class="p-catProfileInputForm__patternFields__title">
          アイコンのえがらをリクエストできるよ
        </p>
        <div
          v-for="(field, index) in patternFields"
          :key="'pattern-' + index"
          :class="[
            'p-catProfileInputForm__form__item',
            `p-catProfileInputForm__form__item--${field.name}`,
          ]"
        >
          <div class="p-catProfileInputForm__form__label--container">
            <label
              :for="field.name"
              class="p-catProfileInputForm__form__label"
              >{{ field.label }}</label
            >
            <i
              v-if="field.required !== false"
              class="p-catProfileInputForm__form__label--required"
              >ひっす</i
            >
          </div>
          <div class="p-catProfileInputForm__form__input--container">
            <input
              :id="field.name"
              v-model="catProfile[field.name]"
              class="p-catProfileInputForm__form__input"
              :class="{ 'input-error': errors[field.name] }"
              :required="field.required !== false"
              :type="field.type"
              :placeholder="field.placeholder"
              @input="checkField(field.name)"
            />
            <span
              class="p-catProfileInputForm__form__input--counter"
              :class="{
                error:
                  (catProfile[field.name] || '').length > catProfileMaxLength,
              }"
            >
              {{ catProfile[field.name]?.length ?? 0 }}/{{
                catProfileMaxLength
              }}
            </span>
          </div>
          <div class="p-catProfileInputForm__form__error--container">
            <span
              v-show="errors[field.name]"
              class="p-catProfileInputForm__form__error"
              >※{{ errors[field.name] }}</span
            >
          </div>
        </div>
      </section>
      <button
        v-if="!isLoading"
        class="p-catProfileInputForm__button c-button c-button--main"
        type="submit"
        :class="{ 'c-button--disabled': !isFormValid }"
        :disabled="!isFormValid"
      >
        <span
          v-show="isFormValid"
          class="p-catProfileInputForm__button--enableText"
          >これでアイコンをつくる!</span
        >
        <span
          v-show="!isFormValid"
          class="p-catProfileInputForm__button--disableText"
          >ただしくにゅうりょくしてください</span
        >
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/userStore'
  import { useCatProfileStore } from '@/store/catProfileStore'
  import { type CatProfile } from '@/types/catProfile'
  import { validateField, catProfileMaxLength } from '@/utils/catProfileUtils'
  import { useCatProfile } from '@/composables/useCatProfile'
  import LoadingIndicator from '@/components/createAccount/loadingIndicator.vue'
  import profileCard from '@/components/profileCard.vue'
  import ErrorModal from '@/components/ErrorModal.vue'

  const router = useRouter()
  const userStore = useUserStore()
  const catProfileStore = useCatProfileStore()
  const { generateCatImage } = useCatProfile()
  const isLoading = ref(false) // ローディング中かどうかを格納するリアクティブなプロパティ
  const apiError = ref('')
  const showErrorModal = ref(false)

  // ねこの情報用のフィールド
  const catInfoFields: Array<{
    name: keyof CatProfile
    label: string
    type: string
    placeholder: string
    required?: boolean // 必須項目か否か
  }> = [
    {
      name: 'breed',
      label: 'しゅべつ',
      type: 'text',
      placeholder: 'みけねこ',
    },
    {
      name: 'eyeColor',
      label: 'めのいろ',
      type: 'text',
      placeholder: 'きいろ',
    },
    {
      name: 'personality',
      label: 'せいかく',
      type: 'text',
      placeholder: 'やさしい',
    },
    {
      name: 'favorite',
      label: 'こうぶつ',
      type: 'text',
      placeholder: 'アジ',
    },
    {
      name: 'others',
      label: 'とくちょう',
      type: 'text',
      placeholder: 'ひなたがすき',
    },
  ]
  // エラーメッセージを格納するリアクティブなオブジェクト
  const errors = reactive<Record<keyof CatProfile, string>>({
    breed: '',
    eyeColor: '',
    personality: '',
    favorite: '',
    others: '',
    pattern: '',
  })

  // catProfileのリアクティブな状態
  const catProfile = reactive<CatProfile>({
    breed: '',
    eyeColor: '',
    personality: '',
    favorite: '',
    others: '',
  })

  // 絵柄の情報用のフィールド
  const patternFields: Array<{
    name: keyof CatProfile
    label: string
    type: string
    placeholder: string
    required?: boolean
  }> = [
    {
      name: 'pattern',
      label: 'えがら',
      type: 'text',
      placeholder: 'げきがチック',

      required: false,
    },
  ]

  // 必須のフォームフィールドに値が入力されているかどうかをチェックするcomputedプロパティ
  const isFormFilled = computed(() => {
    return catInfoFields.every((field) => {
      // 任意のものはスルーする。
      if (field.required === false) {
        return true
      }
      // その他のフィールドは値が入力されているかをチェック
      return (catProfile[field.name] ?? '').trim().length > 0
    })
  })

  // ボタンが有効かどうかをチェックするメソッド
  const hasErrors = computed(() => {
    return Object.values(errors).some((error) => error.length > 0)
  })
  // バリデーションエラーがあるかどうかと、全てのフォームフィールドに値が入力されているかどうかをチェックするcomputedプロパティ
  const isFormValid = computed(() => {
    return isFormFilled.value && !hasErrors.value
  })
  // 入力のバリデーション
  const checkField = (fieldName: keyof CatProfile) => {
    const errorMessage = validateField(catProfile[fieldName] ?? '')
    errors[fieldName] = errorMessage ?? ''
  }
  // 入力フォームのロジック
  const submitForm = async () => {
    isLoading.value = true // ローディング中に設定
    apiError.value = '' // エラーをリセット

    // フォームの各フィールドを検証
    Object.keys(catProfile).forEach((fieldName) => {
      checkField(fieldName as keyof CatProfile)
    })

    // エラーがある場合は送信を中止
    if (Object.values(errors).some((error) => error)) {
      isLoading.value = false
      return
    }

    try {
      const catImageUrl = await generateCatImage(catProfile) // 画像生成。ここでのエラーはcatchで処理される
      isLoading.value = false // ローディング終了
      // 生成された猫アイコン画像は一時的にstoreに保存する
      userStore.updateUserProperty('userIconPath', catImageUrl)
      catProfileStore.setCatProfile(catProfile) // ねこ情報をstoreに保存
      await router.push({
        path: '/create-account/step02',
      })
    } catch (error) {
      if (error instanceof Error) {
        apiError.value = error.message // エラーメッセージを設定
        showErrorModal.value = true
      } else {
        apiError.value = '予期せぬエラーが発生しました。' // 不明なエラータイプの場合のデフォルトメッセージ
        showErrorModal.value = true
      }
    } finally {
      isLoading.value = false // ローディング終了
    }
  }
</script>
<style lang="scss" scoped>
  .p-catProfileInputForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .p-catProfileInputForm__form {
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
  .p-catProfileInputForm__form__title {
    font-family: 'Darumadrop One', sans-serif;
    color: $text-main;
    font-size: 32px;
    text-align: center;
    margin-bottom: 32px;
  }
  .p-catProfileInputForm__form__rule {
    color: $text-main;
    font-size: 10px;
    text-align: center;
    margin-bottom: 24px;
  }
  .p-catProfileInputForm__form__item {
    width: 85%;
  }
  .p-catProfileInputForm__form__label {
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
      margin-top: 4px; // 位置調整
    }
    .p-catProfileInputForm__form__item--breed & {
      color: $dark-green;
    }
    .p-catProfileInputForm__form__item--eyeColor & {
      color: $salmon-pink;
    }
    .p-catProfileInputForm__form__item--personality & {
      color: $dark-blue;
    }
    .p-catProfileInputForm__form__item--favorite & {
      color: $yellow;
    }
    .p-catProfileInputForm__form__item--others & {
      color: $dark-purple;
    }
  }
  .p-catProfileInputForm__form__input {
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
  .p-catProfileInputForm__form__error {
    &--container {
      height: 16px;
    }
    display: block;
    font-size: 8px;
    text-align: right;
    color: $red;
    font-weight: bold;
    margin-top: 4px;
  }
  .p-catProfileInputForm__arrow {
    font-family: 'Darumadrop One', sans-serif;
    color: $text-gray;
    display: flex;
    justify-content: center;
    font-size: 32px;
    margin: 16px 0;
  }
  .p-catProfileInputForm__attention {
    display: block;
    font-size: 10px;
    text-decoration: none;
    text-align: center;
    margin-bottom: 16px;
    color: $red;
  }
  .p-catProfileInputForm__button {
    text-align: center;
    margin: 0 auto 200px;
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
  .p-catProfileInputForm__patternFields {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
  }
  .p-catProfileInputForm__patternFields__plus {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 20px;
    color: $text-main;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .p-catProfileInputForm__patternFields__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    color: $text-main;
    text-align: center;
    margin-bottom: 16px;
    color: $accent-color;
  }
  .p-catProfileInputForm__displayArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
