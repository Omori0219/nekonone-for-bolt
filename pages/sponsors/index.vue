<template>
  <div class="p-sponsorsPage">
    <header class="p-sponsorsPage__header">
      <h2 class="p-sponsorsPage__header__title">
        <span class="p-sponsorsPage__header__title--text"
          >スポンサーページ</span
        >
      </h2>
    </header>
    <section class="p-sponsorsPage__greeting">
      <p class="p-sponsorsPage__greeting__text">
        ねこのねは<br />
        スポンサーの方々に支えられています。
      </p>
    </section>
    <section class="p-sponsorsPage__sponsors">
      <h3 class="p-sponsorsPage__sponsors__title">
        <span class="p-sponsorsPage__sponsors__title--mark">¤</span>
        <span class="p-sponsorsPage__sponsors__title--text"
          >ねこのねのスポンサーのみなさん
        </span>
        <span class="p-sponsorsPage__sponsors__title--mark">¤</span>
      </h3>
      <section
        v-if="sponsorUsers.length < 3"
        class="p-sponsorsPage__introduction p-sponsorsPage__introduction--top"
      >
        <p class="p-sponsorsPage__introduction__text">
          ねこのねを応援してくれるスポンサーのみなさんに、
          <br />
          ちょっぴりプレミニャムなお気持ちをご用意しています。
        </p>
        <NuxtLink
          to="/sponsors/purchase"
          class="p-sponsorsPage__introduction__button"
          >くわしくみる→</NuxtLink
        >
      </section>
      <ul class="p-sponsorsPage__sponsors__list">
        <li
          v-for="(user, index) in sponsorUsers"
          :key="user.userId"
          class="p-sponsorsPage__sponsors__item"
        >
          <nuxt-link
            :to="`/users/${user.userId}`"
            class="p-sponsorsPage__sponsors__item--inner"
          >
            <div class="p-sponsorsPage__sponsors__userData">
              <img
                :src="user.userIconPath"
                alt="ユーザーアイコン"
                class="p-sponsorsPage__sponsors__userData__userIcon"
                @error="onUserIconError"
              />
              <div class="p-sponsorsPage__sponsors__userData__textArea">
                <UserNameWithBadge
                  class="p-sponsorsPage__sponsors__userData__userName"
                  :user-name="user.userScreenName"
                  :is-subscribed="true"
                  :font-size="24"
                  :badge-size="16"
                />
                <p class="p-sponsorsPage__sponsors__userData__userId">
                  @{{ user.userId }}
                </p>
              </div>
            </div>
            <div class="p-sponsorsPage__sponsors__date">
              {{ useDateFormatForSponsors(user.subscriptionCreatedAt) }}から
            </div>
          </nuxt-link>
          <section
            v-if="index === 2"
            class="p-sponsorsPage__introduction p-sponsorsPage__introduction--bottom"
          >
            <p class="p-sponsorsPage__introduction__text">
              ねこのねを応援してくれるスポンサーのみなさんに、
              <br />
              ちょっぴりプレミニャムなお気持ちをご用意しています。
            </p>
            <NuxtLink
              to="/sponsors/purchase"
              class="p-sponsorsPage__introduction__button"
              >くわしくみる→</NuxtLink
            >
          </section>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useUser } from '@/composables/useUser'
  import UserNameWithBadge from '@/components/UserNameWithBadge.vue'
  import { useDateFormat } from '@/composables/useDateFormat'
  import { onUserIconError } from '@/utils/dummyImages'
  import { type sponsorUser } from '@/types/user'

  const { getSponsorUsersByLargestAmount } = useUser()
  const { useDateFormatForSponsors } = useDateFormat()
  const sponsorUsers = ref<sponsorUser[]>([])

  onMounted(async () => {
    sponsorUsers.value = await getSponsorUsersByLargestAmount()
  })

  definePageMeta({
    layout: 'three-column',
  })
</script>
<style lang="scss" scoped>
  .p-sponsorsPage__header {
    background-color: $yellow;
    padding: 64px 0 64px;
  }
  .p-sponsorsPage__header__title {
    text-align: center;
    &--text {
      display: inline-block;
      color: $white;
      font-family: 'Darumadrop One', sans-serif;
      font-size: 32px;
      margin: 0 16px;
    }
  }
  .p-sponsorsPage__greeting {
    padding: 40px 0;
  }
  .p-sponsorsPage__greeting__text {
    font-size: 14px;
    line-height: 1.75;
    text-align: center;
  }
  .p-sponsorsPage__introduction {
    &--top {
      margin: 40px 16px;
    }
    &--bottom {
      margin: 40px 0px;
    }
    padding: 32px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 1px solid $yellow;
    border-radius: 12px;
    background-color: $white;
  }
  .p-sponsorsPage__introduction__text {
    font-size: 12px;
    line-height: 2;
    text-align: center;
    margin-bottom: 24px;
  }
  .p-sponsorsPage__introduction__button {
    display: inline-block;
    text-align: center;
    font-family: 'Darumadrop One', sans-serif;
    font-size: 18px;
    padding: 12px 32px;
    border-radius: 100px;
    color: $white;
    background-color: $yellow;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .p-sponsorsPage__sponsors__title {
    font-family: 'Darumadrop One', sans-serif;
    text-align: center;
    color: $yellow;
    font-size: 24px;
    margin-bottom: 24px;
    &--text {
      display: inline-block;
      color: $yellow;
      font-family: 'Darumadrop One', sans-serif;
      font-size: 24px;
      margin: 0 8px;
    }
    &--mark {
      display: inline-block;
      color: $yellow;
      font-family: 'Darumadrop One', sans-serif;
      font-size: 24px;
    }
  }
  .p-sponsorsPage__sponsors__list {
    margin: 0 16px;
  }
  .p-sponsorsPage__sponsors__item {
    &--inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid $off-white;
    &:first-child {
      border-top: 1px solid $off-white;
      padding-top: 16px;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  .p-sponsorsPage__sponsors__userData {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .p-sponsorsPage__sponsors__userData__userIcon {
    width: 48x;
    height: 48px;
    object-fit: contain;
    border-radius: 100%;
    margin-right: 12px;
  }
  .p-sponsorsPage__sponsors__userData__userName {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    line-height: 1;
    color: $text-main;
    margin-bottom: 2px;
  }
  .p-sponsorsPage__sponsors__userData__userId {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 12px;
    line-height: 1;
    color: $text-gray;
  }
  .p-sponsorsPage__sponsors__date {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 12px;
    line-height: 1;
    color: $text-gray;
  }
</style>
