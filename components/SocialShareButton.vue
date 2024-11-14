<template>
  <div class="p-userPage__shareArea__linkBox">
    <button
      class="p-userPage__shareArea__button p-userPage__shareArea__button--x"
      @click="shareOnTwitter"
    >
      <div class="p-userPage__shareArea__button__icon--container">
        <img
          src="@/assets/img/ic-sns--x.svg"
          alt="Xで共有する"
          class="p-userPage__shareArea__button__icon--x"
        />
      </div>
      <p class="p-userPage__shareArea__button__text">Xでシェア</p>
    </button>
    <button
      class="p-userPage__shareArea__button p-userPage__shareArea__button--facebook"
      @click="shareOnFacebook"
    >
      <div class="p-userPage__shareArea__button__icon--container">
        <img
          src="@/assets/img/ic-sns--facebook.svg"
          alt="facebookで共有する"
          class="p-userPage__shareArea__button__icon--facebook"
        />
      </div>
      <p class="p-userPage__shareArea__button__text">facebookでシェア</p>
    </button>
    <button
      class="p-userPage__shareArea__button p-userPage__shareArea__button--link"
      @click="copyLinkToClipboard"
    >
      <div class="p-userPage__shareArea__button__icon--container">
        <img
          src="@/assets/img/ic-sns--link.svg"
          alt="リンクをコピーする"
          class="p-userPage__shareArea__button__icon--link"
        />
      </div>
      <p class="p-userPage__shareArea__button__text">リンクをコピー</p>
    </button>
  </div>
</template>

<script setup>
  // 投稿内容を含むシェアメッセージの生成
  const createShareMessage = () => {
    const serviceName = 'ねこのね' // サービス名
    const hashtags = 'ねこのSNS' // ハッシュタグ
    const serviceUrl = 'https://nekonone.jp' // サービスのURL
    const message = `ねこのSNS、始めました。\n名前：${userName.value}\n品種：${catProfile.value?.breed}\n目の色：${catProfile.value?.eyeColor}\n性格：${catProfile.value?.personality}\n好物：${catProfile.value?.favorite}\n特徴：${catProfile.value?.others}\n#${serviceName} #${hashtags} \n${serviceUrl}`
    return encodeURIComponent(message)
  }

  // Twitterでシェアする関数
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${createShareMessage()}`
    window.open(url, '_blank')
  }

  // Facebookでシェアする関数
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
    window.open(url, '_blank')
  }
  // リンクをクリップボードにコピーする関数
  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('リンクをクリップボードにコピーしました。') // ユーザーに通知
    } catch (err) {
      alert('リンクのコピーに失敗しました。') // エラーをユーザーに通知
    }
  }
</script>

<style lang="scss" scoped>
  .p-userPage__shareArea__title {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 12px;
    color: $text-gray;
    text-align: center;
  }
  .p-userPage__shareArea__linkBox {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 12px;
    background-color: $off-white;
    padding: 24px 0;
    margin: 0 24px;
  }
  .p-userPage__shareArea__button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .p-userPage__shareArea__button__icon {
    &--container {
      width: 40px;
      height: 40px;
      background-color: $white;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      border-radius: 100%;
      padding: 12px;
      margin-bottom: 6px;
      &:hover {
        opacity: 0.7;
      }
    }
    width: 24px;
    height: 24px;
  }
  .p-userPage__shareArea__button__text {
    font-size: 8px;
    line-height: 8px;
    color: $text-gray;
    text-align: center;
  }
</style>
