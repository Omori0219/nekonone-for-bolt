<template>
  <transition name="fade">
    <div v-if="isLoading" class="p-loading">
      <div class="p-loading__overlay"></div>
      <div class="p-loading--inner">
        <img
          src="@/assets/img/img-nekonone_logo.svg"
          alt="ねこのね | ねこの、ねこによる、ねこのためのSNS"
          class="p-loading__img--logo"
        />
        <img
          src="@/assets/img/img-catIcon--happy.png"
          alt="考えるねこ"
          class="p-loading__img--cat animation-pulse"
        />
        <p class="p-loading__guidance">アイコンせいせいちゅう。</p>
        <p class="p-loading__flavorText--title">
          たくさんの「ねコンテンツ」をちょっぴり紹介。<br />
        </p>
        <p
          v-for="text in displayedText"
          :key="text"
          class="p-loading__flavorText"
        >
          {{ text }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue'

  const { isLoading } = defineProps({
    isLoading: Boolean,
  })

  const flavorTexts = [
    `ねこシブ
    『ねこの絵だけしか上げてはいけません』
    ねこシブはねこの絵だけが集まる場所。
    かわいいねこも、かっこいいねこも、ゆる〜いねこも。
    だれでも何でも大募集。`,
    `あしあと
    『今日もあしあと付けに来たよ』
    誰かがあなたのページに来たら、あしあとがつきます。
    誰かのページに遊びに行くと、あしあとがつきます。
    ねこのあしあとを辿ってみよう。`,
    `ねこアルバム
    『ねこかねこじゃないか』
    ねこみたいな雑貨、ねこみたいな食べ物。
    ねこみたいな模様。ねこみたいな人間。
    ねこを見つけたらねこアルバムに登録しよう。`,
    `ねこてん
    『ねこのものなら何でも取り揃えております。』
    ねこてんはねこの店。
    食べ物、おもちゃ、雑貨、服、本、音楽、映画。
    ねこのものだけ取り扱ってます。`,
    `マタタビや
    『2歳未満はおことわり。年齢確認いたします。』
    今日の出来事、趣味の話、ねこの話。
    みんなで集まっておしゃべりできるコミュニテイ。
    マタタビやでみんなとつながろう。`,
  ]
  const currentTextIndex = ref(0)

  const displayedText = computed(() => [flavorTexts[currentTextIndex.value]])

  let intervalId: number | undefined

  onMounted(() => {
    intervalId = window.setInterval(() => {
      currentTextIndex.value = (currentTextIndex.value + 1) % flavorTexts.length
    }, 6000) // 6秒ごとにテキストを切り替える
  })

  onUnmounted(() => {
    if (intervalId !== undefined) window.clearInterval(intervalId)
  })
</script>

<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .p-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    justify-content: center;
    align-items: center;
    z-index: 9999;
    display: flex;
    padding-top: 5%;
    &--inner {
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
  .p-loading__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* ここでぼかし効果を指定 */
    z-index: -1; /* オーバーレイをコンテンツの背後に配置 */
  }
  .p-loading__img {
    &--logo {
      max-width: 200px;
      width: 50%;
      margin: 24px auto 0;
    }
    &--cat {
      max-width: 200px;
      width: 50%;
      margin: 40px auto 16px;
    }
  }
  .p-loading__guidance {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    margin-bottom: 40px;
    text-align: center;
    width: 100%;
    color: $yellow;
  }
  .p-loading__flavorText {
    &--title {
      font-size: 12px;
      margin-bottom: 12px;
      width: 100%;
      text-align: center;
    }
    white-space: pre-wrap;
    font-size: 12px;
    line-height: 2;
    animation: fadeInOut 6s infinite;
    width: 100%;
    text-align: center;
  }

  .animation-pulse {
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
  }
</style>
