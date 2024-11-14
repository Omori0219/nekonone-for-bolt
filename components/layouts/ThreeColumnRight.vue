<template>
  <div class="l-threeColumnRight">
    <div class="l-threeColumnRight--inner">
      <section
        class="l-threeColumnRight__section l-threeColumnRight__section--search"
      >
        <h3
          class="l-threeColumnRight__section__title l-threeColumnRight__section__title--search"
        >
          けんさく
        </h3>
        <div
          class="l-threeColumnRight__section__content l-threeColumnRight__section__content--search"
        >
          <p
            class="l-threeColumnRight__section__text l-threeColumnRight__section__text--search"
          >
            じゅんびちゅう
          </p>
        </div>
      </section>
      <section
        class="l-threeColumnRight__section l-threeColumnRight__section--sponsor"
      >
        <h3
          class="l-threeColumnRight__section__title l-threeColumnRight__section__title--sponsor"
        >
          スポンサーいちらん
        </h3>
        <div
          class="l-threeColumnRight__section__content l-threeColumnRight__section__content--sponsor"
        >
          <p
            class="l-threeColumnRight__section__text l-threeColumnRight__section__text--sponsor"
          >
            いつでもぼしゅう
          </p>
        </div>
      </section>
      <section
        class="l-threeColumnRight__section l-threeColumnRight__section--ad"
      >
        <!-- <h3
          class="l-threeColumnRight__section__title l-threeColumnRight__section__title--ad"
        >
          こうこくわく
        </h3> -->
        <!-- <CommonAdArea /> -->
      </section>
      <section class="l-threeColumnRight__bottomArea">
        <nav class="l-threeColumnRight__nav">
          <ul class="l-threeColumnRight__nav__list">
            <li class="l-threeColumnRight__nav__item">
              <NuxtLink to="/" class="l-threeColumnRight__nav__item--inner"
                >TOP</NuxtLink
              >
            </li>
            <li class="l-threeColumnRight__nav__item">
              <NuxtLink to="/terms" class="l-threeColumnRight__nav__item--inner"
                >利用規約</NuxtLink
              >
            </li>
            <li class="l-threeColumnRight__nav__item">
              <a
                class="l-threeColumnRight__nav__item--inner"
                href="https://docs.google.com/forms/d/e/1FAIpQLSf701Ktmw-JhMMbZpwlZcV4prtWLLQZP_DhGv0KNAL61CSCWA/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                >お問い合わせ</a
              >
            </li>
            <li class="l-threeColumnRight__nav__item">
              <a
                class="l-threeColumnRight__nav__item--inner"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfQbz_X_w6lmpEb2UDXeE_p4vwgWbdtTVmmIkJcgji13jkPlw/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                >バグ報告フォーム</a
              >
            </li>
            <li class="l-threeColumnRight__nav__item">
              <NuxtLink
                to="/privacy"
                class="l-threeColumnRight__nav__item--inner"
                >プライバシーポリシー</NuxtLink
              >
            </li>
            <li class="l-threeColumnRight__nav__item">
              <NuxtLink
                to="/specified"
                class="l-threeColumnRight__nav__item--inner"
                >特定商取引法に基づく表記</NuxtLink
              >
            </li>
            <li class="l-threeColumnRight__nav__item">
              <a
                class="l-threeColumnRight__nav__item--inner"
                href="https://soudanbako-inc.com/"
                target="_blank"
                rel="noopener noreferrer"
                >運営会社</a
              >
            </li>
            <li class="l-threeColumnRight__nav__item">
              <a
                class="l-threeColumnRight__nav__item--inner"
                href="https://twitter.com/nekonone_jp"
                target="_blank"
                rel="noopener noreferrer"
                >公式Xアカウント</a
              >
            </li>
          </ul>
        </nav>
        <i class="l-threeColumnRight__copyright"
          >Copyright © ねこのね. All Rights Reserved.</i
        >
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
  // import CommonAdArea from '@/components/ad/CommonAdArea.vue'
</script>
<style lang="scss" scoped>
  .l-threeColumnRight {
    background-color: $white;
    justify-content: flex-start;
    display: flex;
    &--inner {
      width: 275px;
      // position: fixed;
      top: 0;
      height: 100%;
      padding-top: 40px;
    }
  }
  .l-threeColumnRight__section {
    margin-bottom: 16px;
  }
  .l-threeColumnRight__section__title {
    font-family: 'Darumadrop One', sans-serif;
    &--search {
      color: $dark-green;
    }
    &--sponsor {
      color: $yellow;
    }
    &--ad {
      color: $bg-gray;
    }
  }
  .l-threeColumnRight__section__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 0;
    border-radius: 12px;
    &--search {
      background-color: $dark-green;
    }
    &--sponsor {
      background-color: $yellow;
    }
  }
  .l-threeColumnRight__section__text {
    font-family: 'Darumadrop One', sans-serif;
    &--search {
      color: $white;
    }
    &--sponsor {
      color: $white;
    }
  }
  .l-threeColumnRight__bottomArea {
    position: sticky;
    top: 100vh;
  }
  .l-threeColumnRight__nav {
    margin-top: 40px;
    font-size: 10px;
    margin-bottom: 8px;
  }
  .l-threeColumnRight__nav__item {
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 4px;
    &--inner:hover {
      color: $accent-color;
    }
  }
  .l-threeColumnRight__copyright {
    font-size: 8px;
    text-decoration: none;
    display: block;
    padding-bottom: 16px;
  }
</style>
