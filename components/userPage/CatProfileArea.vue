<template>
  <div class="p-catProfileArea">
    <div class="p-catProfileArea__text">
      <p class="p-catProfileArea__text__paragraph">
        <span class="p-catProfileArea__text--base">わたしは、</span>
        <span
          class="p-catProfileArea__text--entered p-catProfileArea__text--name"
          >{{ userName }}</span
        >
        <span
          v-show="isLoading"
          class="p-catProfileArea__text--entered p-catProfileArea__text--name"
          >????</span
        >
        <span class="p-catProfileArea__text--base">。</span>
      </p>
      <p class="p-catProfileArea__text__paragraph">
        <span
          v-if="catProfile?.eyeColor"
          class="p-catProfileArea__text--entered p-catProfileArea__text--eyeColor"
          >{{ catProfile.eyeColor }}</span
        >
        <span
          v-else
          class="p-catProfileArea__text--entered p-catProfileArea__text--eyeColor"
          >????</span
        >
        <span class="p-catProfileArea__text--base">のめをしていて、</span>
      </p>
      <p class="p-catProfileArea__text__paragraph">
        <span
          v-if="catProfile?.favorite"
          class="p-catProfileArea__text--entered p-catProfileArea__text--favorite"
          >{{ catProfile.favorite }}</span
        >
        <span
          v-else
          class="p-catProfileArea__text--entered p-catProfileArea__text--favorite"
          >????</span
        >
        <span class="p-catProfileArea__text--base">がすきな、</span>
      </p>
      <p class="p-catProfileArea__text__paragraph">
        <span
          v-if="catProfile?.personality"
          class="p-catProfileArea__text--entered p-catProfileArea__text--personality"
          >{{ catProfile.personality }}</span
        >
        <span
          v-else
          class="p-catProfileArea__text--entered p-catProfileArea__text--personality"
          >????</span
        >
        <span
          v-if="catProfile?.breed"
          class="p-catProfileArea__text--entered p-catProfileArea__text--breed"
          >{{ catProfile.breed }}</span
        >
        <span
          v-else
          class="p-catProfileArea__text--entered p-catProfileArea__text--breed"
          >????</span
        >
        <span class="p-catProfileArea__text--base">です。</span>
      </p>
      <p class="p-catProfileArea__text__paragraph">
        <span class="p-catProfileArea__text--base">あと、</span>
        <span
          v-if="catProfile?.others"
          class="p-catProfileArea__text--entered p-catProfileArea__text--others"
          >{{ catProfile.others }}</span
        >
        <span
          v-else
          class="p-catProfileArea__text--entered p-catProfileArea__text--others"
          >????</span
        >
        <span class="p-catProfileArea__text--base">。</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    isLoading: Boolean,
    userName: {
      type: String,
      default: '', // 空文字列をデフォルト値として設定
    },
    catProfile: {
      type: Object,
      default: () => ({}), // 空のオブジェクトをデフォルト値として設定
    },
  })
</script>

<style lang="scss" scoped>
  .p-catProfileArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: flex-start;
  }
  .p-catProfileArea__text__paragraph {
    margin: 2px 0;
    line-height: 1;
  }
  .p-catProfileArea__text {
    text-align: center;
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    &--base {
      font-family: 'Darumadrop One', sans-serif;
    }
    &--entered {
      font-family: 'Darumadrop One', sans-serif;
    }
    &--name {
      color: $accent-color;
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
</style>
