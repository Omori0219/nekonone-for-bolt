<template>
  <section class="l-ServiceDescriptionSection">
    <p class="l-ServiceDescriptionSection__copy">
      ねこのねはね、ねこのSNS。<br /><br />
      「ねこアイコン」だけのせかい。<br />
      「ねこご」がとびかう、タイムライン。<br />
      そのほかたくさんの「ねコンテンツ」が<br />
      めじろおし。
    </p>
    <img
      src="@/assets/img/img-topPage__introduction--01.png"
      alt="にゃんてにゃんだふる!"
      class="l-ServiceDescriptionSection__image"
    />
    <p class="l-ServiceDescriptionSection__copy">
      ねこのねはただいまじぜんとうろくちゅう。<br />
      たのしみにまっててね。
    </p>
    <a
      class="l-ServiceDescriptionSection__link--x"
      href="https://twitter.com/nekonone_jp"
      target="_blank"
      rel="noopener noreferrer"
      >こうしきXはこちら</a
    >
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
  .l-ServiceDescriptionSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0;
    background-color: $dark-blue;
  }
  .l-ServiceDescriptionSection__copy {
    font-family: 'Darumadrop One', sans-serif;
    font-size: 24px;
    line-height: 1.5;
    color: $white;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .l-ServiceDescriptionSection__image {
    margin: 0 auto 40px;
    width: 200px;
    object-fit: contain;
  }
  .l-ServiceDescriptionSection__link {
    &--x {
      font-family: 'Darumadrop One', sans-serif;
      color: $white;
      margin: 0 auto;
      font-size: 20px;
      line-height: 2;
      border: 2px solid #fff;
      border-radius: 100px;
      padding: 8px 32px;
    }
  }
  @media screen and (max-width: 1024px) {
  }
</style>
