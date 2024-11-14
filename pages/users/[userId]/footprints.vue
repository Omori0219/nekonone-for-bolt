<template>
  <div class="">
    <UserHeader
      :is-loading="isLoading"
      :is-owner="isOwner"
      :owner-user-id="ownerUserId"
      :owner-user-name="ownerUserName"
    />
    <section class="p-footprintsPage">
      <h2 class="p-footprintsPage__title">
        <img
          src="@/assets/img/ic-footprint.svg"
          alt="足跡のアイコン"
          class="p-footprintsPage__title--icon"
        />
        <span class="p-footprintsPage__title--text">あしあと</span>
        <img
          src="@/assets/img/ic-footprint.svg"
          alt="足跡のアイコン"
          class="p-footprintsPage__title--icon"
        />
      </h2>
      <FootprintsList
        :display-user-id="ownerUserId"
        :is-loading="isLoading"
        :display-footprints-number="limitFootprints"
      />
    </section>
    <section class="p-footprintsPage__newArrivalUsers">
      <h2 class="p-footprintsPage__newArrivalUsers__title">
        ほかのねこにあしあと
        <img
          src="@/assets/img/ic-footprint.svg"
          alt="足跡のアイコン"
          class="p-footprintsPage__newArrivalUsers__title--icon"
        />
        をつけてやろう
      </h2>
      <NewArrivalUserList
        :user-limit="displayUserNumber"
        class="p-footprintsPage__newArrivalUsers__list"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
  import FootprintsList from '@/components/FootprintsList.vue'
  import UserHeader from '@/components/userPage/UserHeader.vue'
  import NewArrivalUserList from '@/components/NewArrivalUserList.vue'
  import { type PublicUser } from '@/types/user'
  import { useUserStore } from '@/store/userStore'
  import { useUser } from '@/composables/useUser'
  import { useFootprints } from '@/composables/useFootprints'
  definePageMeta({
    layout: 'three-column',
    middleware: 'page-owner-guard',
  })
  const route = useRoute()
  const userStore = useUserStore()
  const { getPublicUserDataByUserId } = useUser()
  const { footprints } = useFootprints()
  const ownerUserId = route.params.userId as string
  const ownerUserName = ref(userStore.user?.userScreenName)
  const isOwner = ref(userStore.user?.userId === ownerUserId)
  const isLoading = ref(true)
  const visitorPublicInfo = ref<Array<PublicUser | null>>([])
  const limitFootprints = 40 // 足跡の取得件数
  const displayUserNumber = 20 // 表示するユーザー数
  onMounted(async () => {
    isLoading.value = true
    if (ownerUserId == null) {
      console.error('ownerUserId is incorrect') // eslint-disable-line
      isLoading.value = false
      return null
    }
    await fetchVisitorPublicInfo() // 取得した足跡のuserIdから公開ユーザー情報をフェッチする関数
    isLoading.value = false
  })
  // 訪問者の公開ユーザー情報をフェッチ
  const fetchVisitorPublicInfo = async () => {
    if (footprints.value != null && footprints.value.length > 0) {
      // 足跡のuserIdをvisitorIdsとして取得
      const visitorIds = footprints.value.map(
        (footprint) => footprint.visitorUserId
      )
      const visitorInfoPromises = visitorIds.map(async (visitorId) => {
        if (typeof visitorId !== 'string') {
          console.error('visitorId must be a string') // eslint-disable-line
          return null
        }
        return await getPublicUserDataByUserId(visitorId).catch((error) => {
          console.error(`ユーザー情報の取得に失敗しました: ${visitorId}`, error) // eslint-disable-line
          return null // エラーが発生した場合はnullを返す
        })
      })
      visitorPublicInfo.value = await Promise.all(visitorInfoPromises)
    }
  }
</script>
<style lang="scss" scoped>
  .p-footprintsPage {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
  }
  .p-footprintsPage__title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
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
  .p-footprintsPage__newArrivalUsers {
    text-align: center;
    padding: 40px 0;
    background-color: $purple;
  }
  .p-footprintsPage__newArrivalUsers__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    color: $text-main;
    margin-bottom: 24px;
    &--icon {
      width: 12px;
      height: 12px;
      object-fit: contain;
      display: inline;
    }
  }
</style>
