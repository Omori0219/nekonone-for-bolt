<template>
  <div class="p-specified">
    <h1 class="p-specified__title">特定商取引法に基づく表記</h1>
    <p class="p-specified__headerNote">
      「特定商取引に関する法律」第11条に基づき、以下のとおり表示いたします。
    </p>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">販売事業者の名称</h2>
      <p class="p-specified__section__text">株式会社相談箱</p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">所在地</h2>
      <p class="p-specified__section__text">〒150-0002</p>
      <p class="p-specified__section__text">
        東京都渋谷区渋谷2-19-15宮益坂ビルディング609
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">電話番号</h2>
      <p class="p-specified__section__text">080-4032-1075</p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">メールアドレス</h2>
      <p class="p-specified__section__text">soudanbako.contact@gmail.com</p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">運営統括責任者</h2>
      <p class="p-specified__section__text">大森 翔吾</p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">お問い合わせ</h2>
      <p class="p-specified__section__text">
        こちらのフォームよりお問い合わせをお願いします。<br />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSf701Ktmw-JhMMbZpwlZcV4prtWLLQZP_DhGv0KNAL61CSCWA/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          お問い合わせフォーム</a
        >
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">商品価格</h2>
      <p class="p-specified__section__text">決済時に表示される金額（税込）</p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">商品以外の必要経費</h2>
      <p class="p-specified__section__text">
        アプリケーションのダウンロード、アプリケーション内ページの閲覧、コンテンツのご購入等に必要となるインターネット接続料金、通信料金等はお客様の負担となります。それぞれの料金は、お客様がご契約のインターネットプロバイダまたは携帯電話会社へお問い合わせください。
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">商品の引渡時期</h2>
      <p class="p-specified__section__text">
        決済手続きが完了した後、すぐに利用できるようになります。
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">お支払方法</h2>
      <p class="p-specified__section__text">
        クレジットカードもしくはその他当社が定める方法によりお支払いいただきます。購入手続きの画面において、ご利用可能なお支払い方法が表示されます。
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">お支払時期</h2>
      <p class="p-specified__section__text">
        定期契約であるため、契約日から一ヶ月おきにご利用のクレジットカード会社へ請求いたします。
        クレジットカード会社からお客様への請求時期は、お客様とクレジットカード会社との間の契約に基づきます。
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">解約について</h2>
      <p class="p-specified__section__text">
        定期契約の解約手続きは、

        <nuxt-link :to="`/users/${userStore.user?.userId}/settings`"
          >設定ページ</nuxt-link
        >
        （要ログイン）からいつでも行うことができます。解約手続き後も、契約日から1ヶ月間は引き続きサービスをご利用いただけます。
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">返金について</h2>
      <p class="p-specified__section__text">
        商品の性質上、お客様のご都合によるキャンセルと返金はできかねます。
      </p>
    </section>
    <section class="p-specified__section">
      <h2 class="p-specified__section__title">個人情報の取扱いについて</h2>
      <p class="p-specified__section__text">
        <NuxtLink to="privacy"> プライバシーポリシー</NuxtLink
        >をご参照ください。
      </p>
    </section>
  </div>
</template>
<script setup lang="ts">
  import { useUserStore } from '@/store/userStore'
  definePageMeta({
    layout: 'common',
  })
  const userStore = useUserStore()
</script>
<style scoped lang="scss">
  .p-specified {
    max-width: 640px;
    margin: 0 auto;
    padding: 20px;
  }

  .p-specified__title {
    font-size: $font-size-large;
    margin-bottom: 40px;
    text-align: center;
  }
  .p-specified__headerNote {
    font-size: $font-size-middle;
    margin-bottom: 40px;
    line-height: 1.75;
  }
  .p-specified__section {
    &:not(:last-child) {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid $off-white;
    }
  }

  .p-specified__section__title {
    font-size: $font-size-middle;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .p-specified__section__text {
    font-size: $font-size-middle;
    line-height: 1.5;
    margin-bottom: 12px;
    a {
      text-decoration: underline;
      color: $dark-blue;
    }
  }
</style>
