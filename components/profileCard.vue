<template>
  <div class="p-profileCard">
    <div class="p-profileCard__imgArea">
      <div
        v-if="userCardInfo?.userIconPath"
        class="p-profileCard__imgArea__exist"
      >
        <img
          :src="userCardInfo.userIconPath"
          alt="ユーザーアイコン"
          class="p-profileCard__imgArea__img"
          @error="onUserIconError"
        />
        <p
          class="p-profileCard__imgArea__userId p-profileCard__text--entered p-profileCard__text--userId"
        >
          @{{ userCardInfo.userId || '???' }}
        </p>
      </div>
      <div v-else class="p-profileCard__dummyImage">
        <span class="p-profileCard__dummyImage--text">?</span>
      </div>
    </div>
    <div class="p-profileCard__textArea">
      <p class="p-profileCard__text">
        わたしは、
        <span
          v-if="userCardInfo?.userIconPath"
          class="p-profileCard__text--entered"
        >
          <span
            class="p-profileCard__text--entered p-profileCard__text--userName"
          >
            {{ userCardInfo?.userName || '???' }}
          </span>
          <span class="p-profileCard__text--entered">。</span>
        </span>
      </p>
      <p class="p-profileCard__text">
        <span
          class="p-profileCard__text--entered p-profileCard__text--eyeColor"
        >
          {{ catProfile.eyeColor || '???' }}
        </span>
        のめをしていて、
      </p>
      <p class="p-profileCard__text">
        <span
          class="p-profileCard__text--entered p-profileCard__text--favorite"
        >
          {{ catProfile.favorite || '???' }}
        </span>
        がすきな、
      </p>
      <p class="p-profileCard__text">
        <span
          class="p-profileCard__text--entered p-profileCard__text--personality"
        >
          {{ catProfile.personality || '???' }}
        </span>
        <span class="p-profileCard__text--entered p-profileCard__text--breed">
          {{ catProfile.breed || '???' }}
        </span>
        です。
      </p>
      <p class="p-profileCard__text">
        あと、
        <span class="p-profileCard__text--entered p-profileCard__text--others">
          {{ catProfile.others || '???' }}
        </span>
        。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onUserIconError } from '@/utils/dummyImages'
  import { type CatProfile } from '@/types/catProfile'
  import { type UserCardInfo } from '@/types/user'
  const { catProfile } = defineProps<{
    userCardInfo?: UserCardInfo
    catProfile: CatProfile
  }>()
</script>

<style lang="scss" scoped>
  .p-profileCard {
    display: flex;
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    background-color: $white;
    border-radius: 12px;
    padding: 24px;
  }
  .p-profileCard__text {
    font-family: 'Darumadrop One', sans-serif;
    word-break: break-word;
    overflow-wrap: anywhere;
    font-size: 24px;
    &--entered {
      font-family: 'Darumadrop One', sans-serif;
    }
    &--userName {
      color: $accent-color;
    }
    &--userId {
      color: $text-main;
      font-size: 12px;
      text-align: center;
    }
    &--eyeColor {
      color: $salmon-pink;
    }
    &--favorite {
      color: $yellow;
    }
    &--personality {
      color: $dark-blue;
    }
    &--breed {
      color: $dark-green;
    }
    &--others {
      color: $dark-purple;
    }
  }
  .p-profileCard__imgArea {
    margin-right: 32px;
    flex-shrink: 0;
  }
  .p-profileCard__imgArea__img {
    width: 120px;
    height: 120px;
    border-radius: 100%;
  }
  .p-profileCard__dummyImage {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    background-color: $bg-gray;
    display: flex;
    justify-content: center;
    align-items: center;
    &--text {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 24px;
      color: $text-main;
    }
  }
  .p-profileCard__textArea {
    min-width: 200px;
  }
  @media screen and (max-width: 1024px) {
    .p-profileCard__imgArea__img {
      width: 80px;
      height: 80px;
    }
    .p-profileCard__dummyImage {
      width: 80px;
      height: 80px;
    }
    .p-profileCard__imgArea {
      margin-right: 24px;
    }
    .p-profileCard__text {
      font-size: 20px;
    }
    .p-profileCard__textArea {
      min-width: 0;
    }
  }
</style>
