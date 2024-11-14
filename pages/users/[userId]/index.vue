<template>
  <div class="p-userPage">
    <div v-if="!errorMessage">
      <UserHeader
        :is-loading="isLoading"
        :is-owner="isOwner"
        :owner-user-id="ownerUserId"
        :owner-user-name="ownerUserName"
        @click="scrollToTop"
      />
      <section class="p-userPage__header">
        <div class="p-userPage__header__bg">
          <img
            src="/img/img-userPageHeader.png"
            alt="ねこの画像"
            class="p-userPage__header__bg__img"
          />
        </div>
        <section class="p-userPage__header__userIcon">
          <img
            v-show:="!isLoading"
            :src="ownerUserIconPath || '@/assets/img/ic-dummyUserIcon.png'"
            class="p-userPage__header__userIcon__img"
            alt="ユーザーアイコン"
            @click="sharePage()"
            @error="onUserIconError"
          />
          <div
            v-show:="isLoading"
            class="p-userPage__header__userIcon__img p-userPage__header__userIcon__img--dummy"
          ></div>
        </section>
      </section>
      <section
        class="p-userPage__profiles"
        :class="{ 'is-loading': isLoading }"
      >
        <section class="p-userPage__profiles__userName">
          <span v-show="isLoading" class="p-userPage__profiles__userName--text"
            >????</span
          >
          <UserNameWithBadge
            v-show="!isLoading"
            class="p-userPage__profiles__userName--text"
            :user-name="ownerUserName"
            :is-subscribed="isPageOwnerSubscribed"
            :font-size="32"
            :badge-size="24"
          />
        </section>
        <p class="p-userPage__profiles__userId">@{{ ownerUserId }}</p>
        <CatProfileArea
          class="p-userPage__profiles__catProfile"
          :is-loading="isLoading"
          :user-name="ownerUserName"
          :cat-profile="ownerCatProfile"
        />
      </section>
      <section class="p-userPage__otherProfiles">
        <p
          class="p-userPage__otherProfiles__createdAt"
          :class="{ 'is-loading': isLoading }"
        >
          <img
            src="/icon/ic-calendar.svg"
            class="p-userPage__otherProfiles__createdAt--img"
            alt="カレンダーのアイコン"
          />
          <span class="p-userPage__otherProfiles__createdAt--text">{{
            ownerCreatedAt ? formatJapaneseStyleWithTime(ownerCreatedAt) : ''
          }}</span>
          <span
            v-show="isLoading"
            class="p-userPage__otherProfiles__createdAt--text"
            >??/?? ??:??</span
          >
          <span class="p-userPage__otherProfiles__createdAt--text"
            >にねこのねにやってきた</span
          >
        </p>
        <p v-if="ownerScore" class="p-userPage__otherProfiles__ownerScore">
          にゃんたま：{{ ownerScore }}こ
        </p>
      </section>
      <section class="p-userPage__shareButtonArea">
        <button class="p-userPage__shareButton--x" @click="shareOnTwitter">
          <img
            src="@/assets/img/ic-sns--x.svg"
            alt="Xで共有する"
            class="p-userPage__shareButton__icon--x"
          />
          <p class="p-userPage__shareButton__text">
            <span v-show="!isOwner" class="p-userPage__shareButton__text"
              >Xでこのねこをシェアする</span
            >
            <span v-show="isOwner" class="p-userPage__shareButton__text"
              >Xであなたをシェアする</span
            >
          </p>
        </button>
      </section>
      <section v-if="isOwner" class="p-userPage__footerPrintsSection">
        <FootprintsList
          class="p-userPage__footerPrintsSection__list"
          :display-user-id="ownerUserId"
          :is-loading="isLoading"
          :display-footprints-number="limitFootprints"
        />
        <NuxtLink
          class="p-userPage__footerPrintsSection__link"
          :to="`/users/${ownerUserId}/footprints`"
        >
          <img
            src="@/assets/img/ic-footprint.svg"
            alt="足跡のアイコン"
            class="p-userPage__footerPrintsSection__link__icon"
          />
        </NuxtLink>
      </section>
      <section class="p-userPage__tabs">
        <ul class="p-userPage__tabs__list">
          <li class="p-userPage__tabs__item">
            <p class="p-userPage__tabs__item__text">つぶやき</p>
          </li>
        </ul>
      </section>
      <section class="p-userPage__postsSection">
        <Timeline
          v-if="userPosts"
          :posts="userPosts"
          :is-loading="isLoading"
          :error="error"
          :has-more="hasMore"
          @load-more="loadMorePosts"
        />
      </section>
    </div>
    <div v-if="errorMessage" class="p-userPage__error">
      <p class="p-userPage__error__title">404 not found</p>
      <img
        src="@/assets/img/img-404--cat.png"
        alt="404"
        class="p-userPage__error__image"
      />
      <p class="p-userPage__error__text">{{ errorMessage }}</p>
      <NuxtLink
        to="/"
        class="p-userPage__error__button c-button c-button--main c-button--designed"
      >
        TOPページへもどる
      </NuxtLink>
      <div v-if="userId" class="p-userPage__error__tempArea">
        <p class="p-userPage__error__tempArea__title">
          リリース前にこっそり遊びに来てたねこへ。
        </p>
        <p class="p-userPage__error__tempArea__text">
          ここからログアウトをして、<br />
          また新しくアカウントを作ってね。
        </p>
        <button class="p-userPage__error__tempArea__button" @click="appSignOut">
          ログアウトする
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAppAuth } from '@/composables/useAppAuth'
  import { useUserStore } from '@/store/userStore'
  import { type CatProfile } from '@/types/catProfile'
  import FootprintsList from '@/components/FootprintsList.vue'
  import UserHeader from '@/components/userPage/UserHeader.vue'
  import CatProfileArea from '@/components/userPage/CatProfileArea.vue'
  import UserNameWithBadge from '@/components/UserNameWithBadge.vue'
  import { useUser } from '@/composables/useUser'
  import { useDateFormat } from '@/composables/useDateFormat'
  import { useFootprints } from '@/composables/useFootprints'
  import { onUserIconError } from '@/utils/dummyImages'
  import { useUserPosts } from '@/composables/useUserPosts'
  import Timeline from '@/components/pages/home/Timeline.vue'
  definePageMeta({
    layout: 'three-column',
  })
  const route = useRoute()
  const userStore = useUserStore()
  const { appSignOut } = useAppAuth()
  const { getPublicUserDataByUserId } = useUser()
  const { formatJapaneseStyleWithTime } = useDateFormat()
  const { addFootprint } = useFootprints()

  const userId = ref(userStore.user?.userId)
  const ownerUserIconPath = ref('')
  const ownerUserName = ref('')
  const ownerScore = ref(0)
  const ownerUserId = ref(route.params.userId as string)
  const ownerCatProfile = ref<CatProfile | undefined>()
  const ownerCreatedAt = ref<Date | null>(null)
  const isOwner = ref(userStore.user?.userId === ownerUserId.value) // ログインユーザーがこのページの所有者かどうか
  const isFetching = ref(true)
  const errorMessage = ref('')
  const isPageOwnerSubscribed = ref(false)
  const currentPage = ref(0)
  const {
    userPosts,
    isLoading,
    error,
    hasMore,
    loadMoreUserPosts,
    fetchPosts,
  } = useUserPosts(ownerUserId.value)

  const limitFootprints = 10 // 足跡の取得件数
  const serviceName = 'ねこのね' // サービス名
  const hashtags1 = 'ねこのSNS' // ハッシュタグ
  const hashtags2 = 'ねこ' // ハッシュタグ
  const shareUrl = `https://nekonone.jp/users/${ownerUserId.value}` // シェアするURL
  useSeoMeta({
    title: `${ownerUserName.value}のマイページ | ねこのね`,
    description: `${ownerUserName.value}のプロフィールページです。`,
    ogTitle: `${ownerUserName.value}のマイページ | ねこのね`,
    ogDescription: `${ownerUserName.value}のプロフィールページです。`,
    ogUrl: shareUrl,
    ogImage: ownerUserIconPath.value,
    ogSiteName: shareUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: `${ownerUserName.value}のマイページ | ねこのね`,
    twitterDescription: `${ownerUserName.value}のプロフィールページです。`,
    twitterImage: ownerUserIconPath.value,
  })
  // ownerUserName と ownerUserIconPath の変更を監視し、メタデータを更新
  watchEffect(() => {
    useSeoMeta({
      title: `${ownerUserName.value}のマイページ | ねこのね`,
      description: `${ownerUserName.value}のプロフィールページです。`,
      ogTitle: `${ownerUserName.value}のマイページ | ねこのね`,
      ogDescription: `${ownerUserName.value}のプロフィールページです。`,
      ogImage: ownerUserIconPath.value,
      twitterTitle: `${ownerUserName.value}のマイページ | ねこのね`,
      twitterDescription: `${ownerUserName.value}のプロフィールページです。`,
      twitterImage: ownerUserIconPath.value,
    })
  })
  onMounted(async () => {
    isFetching.value = true
    await fetchOwnerPublicInfo() // ユーザーページのオーナーの公開ユーザー情報をフェッチする関数
    isFetching.value = false
    await updateFootprint() // 足跡を追加する関数
    await fetchPosts() // そのユーザーの投稿を取得
  })
  // ユーザーページのオーナーの公開ユーザー情報をフェッチ
  const fetchOwnerPublicInfo = async () => {
    const publicUserData = await getPublicUserDataByUserId(ownerUserId.value)
    if (publicUserData == null) {
      errorMessage.value = `「${ownerUserId.value}」というユーザーは見つかりませんでした。` // エラーメッセージを設定
      return
    }
    const {
      userIconPath,
      userScreenName,
      userId,
      catProfile,
      createdAt,
      score,
      isSubscribed,
    } = publicUserData
    ownerUserIconPath.value = userIconPath
    ownerUserName.value = userScreenName
    ownerUserId.value = userId
    ownerCatProfile.value = catProfile
    ownerCreatedAt.value = new Date(createdAt)
    ownerScore.value = score
    isPageOwnerSubscribed.value = isSubscribed
  }
  const updateFootprint = async () => {
    // ログインユーザーがページのオーナーでないことを確認する。
    if (
      userId.value != null &&
      userId.value !== ownerUserId.value &&
      typeof userId.value === 'string'
    ) {
      try {
        await addFootprint(userId.value, ownerUserId.value) // 足跡を追加
      } catch (error) {
        console.error('足跡の追加に失敗しました:', error) //eslint-disable-line
      }
    }
  }

  // 投稿内容を含むシェアメッセージの生成
  const createShareMessage = () => {
    const message = `ねこのSNS「ねこのね」でねこになりました🐾\n
わたしは、${ownerUserName.value}。${ownerCatProfile.value?.eyeColor}のめをしていて、${ownerCatProfile.value?.favorite}がすきな、${ownerCatProfile.value?.personality}${ownerCatProfile.value?.breed}です。あと、${ownerCatProfile.value?.others}。\n
#${serviceName} #${hashtags1} #${hashtags2}
${shareUrl}`
    return encodeURIComponent(message)
  }

  // Twitterでシェアする関数
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${createShareMessage()}`
    window.open(url, '_blank')
  }

  // Web Share APIを利用してページをシェアする関数
  const sharePage = async () => {
    if (!navigator.share) {
      // Web Share APIが使えないブラウザの処理
      await navigator.clipboard.writeText(shareUrl)
      alert('URLをコピーしました')
      return
    }
    await navigator.share({
      title: `${ownerUserName.value}のマイページ | ねこのね`,
      text: `${ownerUserName.value}のプロフィールページです。`,
      url: shareUrl,
    })
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const loadMorePosts = () => {
    currentPage.value++
    loadMoreUserPosts(currentPage.value)
  }
</script>

<style lang="scss" scoped>
  .p-userPage {
    margin-bottom: 64px;
  }
  .p-userPage__header {
    width: 100%;
    padding-bottom: 80px;
    position: relative;
    background-color: $off-white;
  }
  .p-userPage__header__bg {
    width: 100%;
    height: 200px;
    background-color: $dark-blue;
    display: flex;
    justify-content: center;
  }
  .p-userPage__header__bg__img {
    height: 100%;
    object-fit: contain;
  }
  .p-userPage__header__userIcon {
    position: absolute;
    bottom: 0px;
    left: 24px;
    width: fit-content;
  }
  .p-userPage__header__userIcon__img {
    width: 160px;
    height: 160px;
    border-radius: 100px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
    &--dummy {
      background-color: $bg-gray;
    }
  }
  .p-userPage__header__userIcon__shareButton {
    position: absolute;
    background-color: $white;
    border-radius: 100%;
    cursor: pointer;
    width: 28px;
    height: 28px;
    bottom: 0;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $bg-gray;
    &--icon {
      width: 12px;
      height: 12px;
      object-fit: contain;
    }
  }
  .p-userPage__profiles {
    padding: 0 24px;
    background-color: $off-white;
  }
  .p-userPage__profiles__userName {
    margin-bottom: 4px;
    &--text {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 32px;
      color: $accent-color;
      line-height: 1;
    }
  }
  .p-userPage__profiles__userId {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 12px;
    color: $text-gray;
    line-height: 1;
    margin-bottom: 6px;
    margin-left: 4px;
  }
  .p-userPage__profiles__catProfile {
    padding: 16px 0 0;
  }
  .p-userPage__otherProfiles {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 12px 24px;
    background-color: $off-white;
  }
  .p-userPage__otherProfiles__createdAt {
    text-align: center;
    line-height: 1;
    display: flex;
    margin-right: 16px;
    margin-bottom: 2px;
    & span {
      line-height: 1;
    }
    &--text {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 12px;
      color: $text-blue-gray;
    }
    &--img {
      width: 12px;
      height: 12px;
      object-fit: contain;
      margin-right: 3px;
      position: relative;
      top: 1.5px;
    }
  }
  .p-userPage__otherProfiles__ownerScore {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    line-height: 1;
    color: $text-blue-gray;
    &--img {
      width: 12px;
      height: 12px;
      object-fit: contain;
      margin-right: 3px;
      position: relative;
      top: 1.5px;
    }
  }
  .p-userPage__footerPrintsSection {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background-color: $dark-green;
  }

  .p-userPage__footerPrintsSection__button {
    font-family: 'Darumadrop One', sans-serif;
    text-align: center;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $bg-gray;
    color: $text-gray;
    padding: 4px 24px;
    border-radius: 8px;
    margin-top: 24px;
  }
  .p-userPage__footerPrintsSection__list {
    overflow-y: scroll;
    max-height: 64px;
    background-color: $white;
    border-radius: 4px;
    border-right: 2px solid $bg-gray;
  }
  .p-userPage__footerPrintsSection__link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    flex-shrink: 0;
    margin-left: 8px;
    margin-right: 8px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .p-userPage__footerPrintsSection__link__icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
    display: inline;
  }
  .p-userPage__tabs {
    height: 64px;
    width: 100%;
    padding: 0 24px;
  }
  .p-userPage__tabs__list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: 100%;
  }
  .p-userPage__tabs__item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 0 16px;
    border-bottom: 2px solid $dark-blue;
  }
  .p-userPage__tabs__item__text {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 16px;
    line-height: 1;
    width: fit-content;
  }
  .p-userPage__shareButtonArea {
    display: flex;
    justify-content: center;
    padding: 12px 0 24px;
    background-color: $off-white;
  }
  .p-userPage__shareButton {
    &--x {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $text-main;
      border-radius: 100px;
      padding: 12px 18px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .p-userPage__shareButton__icon {
    &--x {
      width: 16px;
      height: 16px;
      margin-right: 16px;
    }
  }
  .p-userPage__shareButton__text {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 16px;
    line-height: 1;
    color: $white;
  }
  .p-userPage__error {
    padding: 80px 0;
  }
  .p-userPage__error__title {
    font-family: 'Darumadrop One', sans-serif;
    text-align: center;
    font-size: 32px;
  }
  .p-userPage__error__image {
    max-width: 160px;
    width: 80%;
    margin: 24px auto 40px;
    object-fit: contain;
  }
  .p-userPage__error__text {
    text-align: center;
    font-size: 12px;
  }
  .p-userPage__error__button {
    margin: 32px auto;
    display: block;
  }
  .p-userPage__error__tempArea {
    background-color: $pink;
    margin: 60px 16px 32px;
    padding: 12px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .p-userPage__error__tempArea__title {
    font-size: 12px;
    text-align: center;
    margin-bottom: 16px;
  }
  .p-userPage__error__tempArea__text {
    font-size: 12px;
    text-align: center;
  }
  .p-userPage__error__tempArea__button {
    font-size: 12px;
    margin: 0 auto;
    text-decoration: underline;
    padding: 16px;
  }
</style>
