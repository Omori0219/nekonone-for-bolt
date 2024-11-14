<template>
  <section class="p-countDown">
    <p class="p-countDown__introduction">
      2024年3月21日に
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdGdjwOyF2PNA95SVdaw2n77qZo7lb4fM93LveHXyNnwtZl4A/viewform?usp=sf_link"
        target="_blank"
        rel="noopener noreferrer"
        class="p-countDown__introduction--expLink"
        >ナワバリ機能</a
      >
      解禁！
    </p>
    <div class="p-countDown__box">
      <h3 class="p-countDown__title">ナワバリきのうまであと...</h3>
      <div class="p-countDown__countArea">
        <span class="p-countDown__countArea__day">{{ countdownDays }}</span>
        <span class="p-countDown__countArea__text">にち!</span>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUpdated } from 'vue'

  // 本番リリース日
  const releaseDate = new Date(2024, 2, 28) // ここにリリース日を設定します。月は0から始まるため、3月は2となります。

  // カウントダウン日数
  const countdownDays = ref(0)

  // カウントダウン日数を計算する関数
  const calculateCountdown = () => {
    const now = new Date()
    const diffTime = Math.abs(releaseDate.getTime() - now.getTime())
    countdownDays.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // マウント時と更新時にカウントダウン日数を計算
  onMounted(calculateCountdown)
  onUpdated(calculateCountdown)
</script>
<style lang="scss" scoped>
  .p-countDown {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0 40px;
    background-color: $yellow;
  }
  .p-countDown__introduction {
    font-size: 12px;
    color: $white;
    font-weight: bold;
    margin-bottom: 6px;
    &--bad {
      font-size: 10px;
      color: $white;
      font-weight: bold;
      text-decoration: line-through;
    }
    &--designed {
      font-family: 'Darumadrop One', sans-serif;
      font-size: 16px;
      color: $white;
      font-weight: bold;
    }
    &--expLink {
      font-size: 12px;
      color: $white;
      font-weight: bold;
      text-decoration: underline;
    }
  }
  .p-countDown__box {
    background-color: $white;
    padding: 16px 40px;
    border-radius: 12px;
  }
  .p-countDown__title {
    font-family: 'Darumadrop One', sans-serif;
    color: $text-main;
    font-size: 24px;
  }
  .p-countDown__countArea {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .p-countDown__countArea__day {
    font-family: 'Darumadrop One', sans-serif;
    color: $text-main;
    font-size: 48px;
    line-height: 1;
  }
  .p-countDown__countArea__text {
    font-family: 'Darumadrop One', sans-serif;
    color: $text-main;
    font-size: 16px;
    line-height: 1;
  }
</style>
