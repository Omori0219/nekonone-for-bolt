<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable no-template-curly-in-string -->
<template>
  <div class="p-faqItems">
    <dl class="p-faqItems__list">
      <div
        v-for="(item, index) in faqItems"
        :key="index"
        class="p-faqItems__item"
      >
        <dt
          class="p-faqItems__title"
          @click="item.showContent = !item.showContent"
        >
          {{ item.title }}
        </dt>
        <dd
          v-show="item.showContent"
          class="p-faqItems__content"
          v-html="item.content"
        ></dd>
      </div>
    </dl>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { staticConfig } from '@/static.config'

  const props = defineProps({
    userId: {
      type: String,
      default: '',
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getSettingsUrl = () => `/users/${props.userId}/settings`
  const siteUrl = staticConfig.siteMetaData.url
  const settingPageRoute = `${siteUrl}/users/${props.userId}/settings`

  const faqItems = ref([
    {
      title: 'スポンサー金額によって特典は変わりますか？',
      content:
        '金額によって特典の内容の差異はありません。 <br /> ですが、スポンサー金額が大きいほどスポンサーページの上部に表示されます。',
      showContent: false,
    },
    {
      title: 'スポンサーをキャンセル（解約）するには？',
      content: `<a href="${settingPageRoute}">設定ページ</a>から行うことができます。`,
      showContent: false,
    },
    {
      title: 'スポンサーは自動更新されますか？',
      content: `はい。<br /><router-link to="/users/nekonone_jp/settings">設定ページ</router-link>から解約を行うことで次月以降の支払いを停止できます。解約した場合も1ヶ月間はスポンサー特典を利用できます。`,
      showContent: false,
    },
    {
      title: 'スポンサー金額によって特典は変わりますか？',
      content:
        '決済には<a href="https://stripe.com/jp" target="_blank" rel="noopener noreferrer">Stripe</a>が使われており、入力されたクレジットカードの情報は当サービスのシステムを一切経由せずに直接Stripeに送信されます。当サービスの管理者が完全なカード番号<span>*</span>を知ることはできません。 詳しくは<a href="https://stripe.com/docs/security?locale=ja-JP" target="_blank" rel="noopener noreferrer">Stripeのセキュリティ</a>をご確認ください。',
      showContent: false,
    },
    {
      title: 'stripeとはなんですか？',
      content:
        '<a href="https://stripe.com/jp" target="_blank" rel="noopener noreferrer">Stripe</a>はオンライン決済代行プラットフォームです。Amazon、Google、Facebook、Shopify、Zoom、Slackなどをはじめとする数百万におよぶ企業がStripeを導入しています（<a href="https://prtimes.jp/main/html/rd/p/000000001.000077879.html" target="_blank" rel="noopener noreferrer">出典</a>）。当サービスの決済は、Stripeのウェブサイト上で行われます。',
      showContent: false,
    },
  ])
</script>
<style lang="scss" scoped>
  .p-faqItems {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .p-faqItems__list {
    width: 100%;
  }
  .p-faqItems__item {
    border-bottom: 1px solid $off-white;
  }
  .p-faqItems__title {
    font-size: 14px;
    padding-top: 12px;
    padding-bottom: 12px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  .p-faqItems__content {
    font-size: 14px;
    line-height: 1.75;
    padding-bottom: 12px;
    color: $text-gray;
    &--link {
      font-size: 14px;
      line-height: 1.75;
      color: $text-gray;
      text-decoration: underline;
    }
  }
</style>

<style lang="scss">
  // レンダリング後に適応できるように
  .p-faqItems__content > a,
  .p-faqItems__content > router-link {
    font-size: 14px;
    line-height: 1.75;
    color: $text-gray;
    text-decoration: underline;
  }
</style>
