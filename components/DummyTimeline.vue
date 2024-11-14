<template>
  <div class="p-timeline__post--container">
    <div
      v-for="(post, index) in dummyPosts"
      :key="index"
      class="p-timeline__post"
    >
      <div class="p-timeline__post--inner">
        <img
          :src="getImageUrl(post.avatarUrl)"
          alt="アイコン画像"
          class="p-timeline__post__icon"
          @error="onUserIconError"
        />
        <div class="p-timeline__post__content">
          <div class="p-timeline__post__main">
            <div class="p-timeline__post__info">
              <span class="p-timeline__post__authorName">{{
                post.userName
              }}</span>
              <span class="p-timeline__post__authorId"
                >@{{ post.authorId }}</span
              >
              <span class="p-timeline__post__timestamp">{{
                post.timestamp
              }}</span>
            </div>
            <div class="p-timeline__post__text">
              {{ post.content }}
            </div>
          </div>
          <div class="p-timeline__post__reaction">
            <span class="p-timeline__post__replies">
              おへんじ:{{ post.repliesCount }}
            </span>
            <span class="p-timeline__post__repostButton">
              リにゃおん:{{ post.repostCount }}
            </span>
            <span class="p-timeline__post__likeButton">
              いいね:{{ post.likeCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onUserIconError } from '@/utils/dummyImages'
  // 画像のURLを取得するメソッドを定義
  const getImageUrl = (imageName: string) => {
    const imagePath = `/img/${imageName}`
    return imagePath
  }
  const dummyPosts = [
    // 最初の5つの投稿
    {
      id: 1,
      userName: 'たま',
      authorId: 'tama',
      avatarUrl: 'ic-dummy--01.png',
      timestamp: '10分前',
      content: 'カフェでリモートワークするのは気分が変わっていいにゃ。',
      repliesCount: 2,
      repostCount: 1,
      likeCount: 5,
    },
    {
      id: 2,
      userName: 'みけ',
      authorId: 'mike',
      avatarUrl: 'ic-dummy--02.png',
      timestamp: '1時間前',
      content:
        '近所に見つけたタイ料理屋さんがあたりだったにゃ！パッタイが絶品だったにゃ〜',
      repliesCount: 3,
      repostCount: 2,
      likeCount: 10,
    },
    {
      id: 3,
      userName: 'くろ',
      authorId: 'kuro',
      avatarUrl: 'ic-dummy--03.png',
      timestamp: '3時間前',
      content: 'にゃんだか眠いにゃ',
      repliesCount: 1,
      repostCount: 1,
      likeCount: 3,
    },
    {
      id: 4,
      userName: 'しろ',
      authorId: 'shiro',
      avatarUrl: 'ic-dummy--04.png',
      timestamp: '5時間前',
      content: '最新のゲームが面白すぎるにゃ！！！！',
      repliesCount: 5,
      repostCount: 3,
      likeCount: 20,
    },
    {
      id: 5,
      userName: 'ふく',
      authorId: 'happy',
      avatarUrl: 'ic-dummy--05.png',
      timestamp: '1日前',
      content: 'デゥビデゥビダバダババチコリデゥビデゥビデゥ',
      repliesCount: 0,
      repostCount: 0,
      likeCount: 0,
    },
    {
      id: 6,
      userName: 'そら',
      authorId: 'sora',
      avatarUrl: 'ic-dummy--06.png',
      timestamp: '2時間前',
      content: '28さいになったにゃ。まだまだ若いと思うにゃ。',
      repliesCount: 2,
      repostCount: 1,
      likeCount: 8,
    },
    {
      id: 7,
      userName: 'ゆき',
      authorId: 'yuki',
      avatarUrl: 'ic-dummy--07.png',
      timestamp: '3時間前',
      content:
        '今日はお仕事で疲れたにゃ。でもがんばった自分にご褒美のおやつを。',
      repliesCount: 3,
      repostCount: 2,
      likeCount: 12,
    },
    {
      id: 8,
      userName: 'たいが',
      authorId: 'taiga',
      avatarUrl: 'ic-dummy--08.png',
      timestamp: '4時間前',
      content: 'カフェでリモートワークするのは気分が変わっていいにゃ。',
      repliesCount: 4,
      repostCount: 3,
      likeCount: 15,
    },
    {
      id: 9,
      userName: 'ねこたろう',
      authorId: 'neko-tarou',
      avatarUrl: 'ic-dummy--09.png',
      timestamp: '6時間前',
      content: '最近の趣味は園芸にゃ。植物を育てるのは癒されるにゃ。',
      repliesCount: 2,
      repostCount: 2,
      likeCount: 11,
    },
    {
      id: 10,
      userName: 'みやび',
      authorId: 'miyabi',
      avatarUrl: 'ic-dummy--10.png',
      timestamp: '8時間前',
      content: '新しい本を読み始めたにゃ。読書は心を豊かにするにゃ。',
      repliesCount: 1,
      repostCount: 1,
      likeCount: 4,
    },
    // (ID 11 から ID 15 まで)
    {
      id: 11,
      userName: 'さくら',
      authorId: 'sakura',
      avatarUrl: 'ic-dummy--01.png',
      timestamp: '10時間前',
      content: '今日のランチは海鮮丼だったにゃ。新鮮でおいしかったにゃ。',
      repliesCount: 3,
      repostCount: 1,
      likeCount: 9,
    },
    {
      id: 12,
      userName: 'りゅうじ',
      authorId: 'ryuuji',
      avatarUrl: 'ic-dummy--02.png',
      timestamp: '12時間前',
      content: '週末は友だちとハイキングに行く予定にゃ。',
      repliesCount: 2,
      repostCount: 2,
      likeCount: 7,
    },
    {
      id: 13,
      userName: 'あすか',
      authorId: 'asuka',
      avatarUrl: 'ic-dummy--03.png',
      timestamp: '1日前',
      content: '今夜はヨガのクラスに参加するにゃ。',
      repliesCount: 1,
      repostCount: 1,
      likeCount: 6,
    },
    {
      id: 14,
      userName: 'こてつ',
      authorId: 'kotetsu',
      avatarUrl: 'ic-dummy--04.png',
      timestamp: '2日前',
      content: '昨日の夜、星空がきれいだったにゃ。',
      repliesCount: 4,
      repostCount: 3,
      likeCount: 13,
    },
    {
      id: 15,
      userName: 'はる',
      authorId: 'haru',
      avatarUrl: 'ic-dummy--05.png',
      timestamp: '3日前',
      content: '最近の映画はクオリティが高くて驚くにゃ。',
      repliesCount: 3,
      repostCount: 2,
      likeCount: 10,
    },
    {
      id: 16,
      userName: 'もも',
      authorId: 'momo',
      avatarUrl: 'ic-dummy--06.png',
      timestamp: '4日前',
      content: '朝の散歩は新鮮な空気が気持ちいいにゃ。',
      repliesCount: 2,
      repostCount: 1,
      likeCount: 5,
    },
    {
      id: 17,
      userName: 'あきら',
      authorId: 'akira',
      avatarUrl: 'ic-dummy--07.png',
      timestamp: '5日前',
      content: '新しいカフェを発見したにゃ。コーヒーが絶品にゃ。',
      repliesCount: 3,
      repostCount: 2,
      likeCount: 8,
    },
    {
      id: 18,
      userName: 'こはる',
      authorId: 'koharu',
      avatarUrl: 'ic-dummy--08.png',
      timestamp: '6日前',
      content: '映画館で見た映画が感動的だったにゃ。',
      repliesCount: 1,
      repostCount: 1,
      likeCount: 7,
    },
    {
      id: 19,
      userName: 'ひなた',
      authorId: 'hinata',
      avatarUrl: 'ic-dummy--09.png',
      timestamp: '1週間前',
      content: '友だちとのランチが楽しかったにゃ。',
      repliesCount: 4,
      repostCount: 3,
      likeCount: 12,
    },
    {
      id: 20,
      userName: 'ゆず',
      authorId: 'yuzu',
      avatarUrl: 'ic-dummy--10.png',
      timestamp: '2週間前',
      content: '最近ヨガを始めたにゃ。体が柔らかくなってきた気がするにゃ。',
      repliesCount: 2,
      repostCount: 2,
      likeCount: 9,
    },
  ]
</script>

<style lang="scss" scoped>
  .p-timeline__post {
    &--container {
      padding: 24px 0;
    }
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    padding: 12px 16px;
    background-color: $white;
    border-bottom: 1px solid $off-white;
    &--inner {
      display: flex;
      width: 100%;
    }
  }
  .p-timeline__post__icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 100%;
    margin-right: 16px;
    inset: 0;
    &--dummy {
      flex-shrink: 0;
      font-family: 'Darumadrop One', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      object-fit: contain;
      border-radius: 100%;
      margin-right: 16px;
      background-color: $bg-gray;
    }
  }
  .p-timeline__post__content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
  }
  .p-timeline__post__info {
    display: flex;
    align-items: flex-end;
    margin-bottom: 5px;
  }
  .p-timeline__post__authorName {
    font-size: 20px;
    color: $text-main;
    font-weight: bold;
    margin-right: 8px;
    line-height: 1;
    font-family: 'Darumadrop One', sans-serif;
  }
  .p-timeline__post__authorId {
    font-size: 8px;
    color: $bg-gray;
    margin-right: 4px;
    line-height: 1;
    font-weight: bold;
    // font-family: 'Darumadrop One', sans-serif;
  }
  .p-timeline__post__timestamp {
    font-size: 8px;
    color: $bg-gray;
    line-height: 1;
  }
  .p-timeline__post__main {
    width: 100%;
  }
  .p-timeline__post__text {
    font-size: 15px;
    line-height: 2;
    color: $text-main;
    text-decoration: none;
  }

  .p-timeline__post__reaction {
    padding-top: 12px;
    display: flex;
    margin-top: 4px;
    > span {
      font-family: 'Darumadrop One', sans-serif;
    }
  }
  .p-timeline__post__replies {
    font-size: 12px;
    line-height: 1;
    color: $dark-blue;
    margin-right: 12px;
  }
  .p-timeline__post__likeButton {
    font-size: 12px;
    color: $pink;
    line-height: 1;
    margin-right: 12px;
  }
  .p-timeline__post__repostButton {
    font-size: 12px;
    margin-right: 12px;
    color: $dark-green;
    line-height: 1;
  }
  .p-timeline__post__postShare {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid $off-white;
    z-index: 2;
    width: 100%;
    margin-top: 8px;
    padding: 8px 16px 0;
    &-title {
      font-size: 12px;
      line-height: 1;
      color: $bg-gray;
      margin-right: 16px;
    }
    &-button {
      fill: $dark-green;
      z-index: 2;
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin-right: 8px;
      &:hover {
        fill: $accent-color;
      }
    }
  }
</style>
