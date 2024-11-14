<template>
  <div class="p-footprintsList--container">
    <ul v-if="footprints.length > 0" class="p-footprintsList">
      <li
        v-for="(footprint, index) in displayedFootprints"
        :key="footprint.visitorUserId"
        class="p-footprintsList__item"
      >
        <NuxtLink
          v-show="visitorPublicInfo[index]?.userScreenName"
          :to="`/users/${footprint.visitorUserId}`"
          class="p-footprintsList__item--inner"
        >
          <span
            class="p-footprintsList__item__text p-footprintsList__item__updateAt"
            >{{ formatDate(footprint.updatedAt) }}</span
          >
          <div class="p-footprintsList__item__userData">
            <img
              :src="visitorPublicInfo[index]?.userIconPath"
              alt="ユーザーアイコン"
              class="p-footprintsList__item__userIcon"
              @error="onUserIconError"
            />
            <UserNameWithBadge
              class="p-footprintsList__item__text p-footprintsList__item__userName"
              :user-name="visitorPublicInfo[index]?.userScreenName"
              :is-subscribed="visitorPublicInfo[index]?.isSubscribed"
              :font-size="20"
              :badge-size="16"
            />
          </div>
          <span class="p-footprintsList__item__text">がきたよ</span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else v-show="!isLoading" class="p-footprintsList__nobody">
      まだだれもきてないよ!
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { onUserIconError } from '@/utils/dummyImages'
  import { useDateFormat } from '@/composables/useDateFormat'
  import UserNameWithBadge from '@/components/UserNameWithBadge.vue'
  import { useUser } from '@/composables/useUser'
  import { useFootprints } from '@/composables/useFootprints'
  import { type PublicUser } from '@/types/user'

  const props = defineProps({
    displayUserId: {
      type: String,
      required: true,
    },
    displayFootprintsNumber: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  })

  const { formatDate } = useDateFormat()
  const { getPublicUserDataByUserId } = useUser()
  const { footprints, fetchFootprints } = useFootprints()
  const visitorPublicInfo = ref<Array<PublicUser | null>>([])

  onMounted(async () => {
    await fetchFootprints(
      props.displayUserId,
      props.displayFootprintsNumber,
      'desc'
    )
    await fetchVisitorPublicInfo()
  })

  const fetchVisitorPublicInfo = async () => {
    if (footprints.value != null && footprints.value.length > 0) {
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
          return null
        })
      })
      visitorPublicInfo.value = await Promise.all(visitorInfoPromises)
    }
  }

  const displayedFootprints = computed(() => {
    return footprints.value.slice(0, props.displayFootprintsNumber)
  })
</script>
<style lang="scss" scoped>
  .p-footprintsList {
    &--container {
      width: 100%;
    }
    padding: 0 16px;
    width: 100%;
  }
  .p-footprintsList__item {
    margin-bottom: 8px;
    &--inner {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .p-footprintsList__item__userData {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .p-footprintsList__item__text {
    text-align: center;
    font-family: 'Darumadrop One', sans-serif;
    font-size: 20px;
    line-height: 1;
  }
  .p-footprintsList__item__updateAt {
    display: inline-block;
    margin-right: 20px;
    color: $text-gray;
    width: 120px;
  }
  .p-footprintsList__item__userName {
    color: $accent-color;
  }
  .p-footprintsList__item__userIcon {
    position: relative;
    top: 2px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 8px;
  }
  .p-footprintsList__nobody {
    text-align: center;
    font-family: 'Darumadrop One', sans-serif;
    font-size: 14px;
  }
  @media screen and (max-width: 1024px) {
    .p-footprintsList__item__updateAt {
      font-size: 16px;
      width: 90px;
      margin-right: 12px;
    }
  }
</style>
