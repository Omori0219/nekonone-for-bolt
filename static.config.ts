// 静的な設定をexportするためのオブジェクト
export const staticConfig = {
  // ページのデフォルトの<head>タグ設定
  defaultHead: {
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1',
    ogType: 'website',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: https://ogp.me/ns#',
    },
  },

  // ソーシャルメディア関連の設定
  socials: {
    twitter: '@nekonone_jp',
    twitterCard: 'summary_large_image' as const,
  },

  // 画像関連の設定
  images: {
    icon: 'https://nekonone.jp/seo/icon-512x512.png',
    favicon: 'https://nekonone.jp/favicon.ico',
    ogImage: 'https://nekonone.jp/seo/common-ogp.png',
    appleIcon: 'https://nekonone.jp/seo/apple-touch-icon.png',
  },
  // サイト全体のメタデータ
  siteMetaData: {
    title: 'ねこのね | ねこのSNS',
    description:
      'ねこのねはねこのためのSNSです。あなただけのアイコンを使って、いつでもねこの言葉で話せます。',
    keywords: 'ねこ, SNS, コミュニティ',
    url: 'https://nekonone.jp',
    type: 'website' as const,
    author: {
      name: '株式会社相談箱',
      url: 'https://soudanbako-inc.com',
      email: 'soudanbako.contact@gmail.com',
    },
    analytics: {
      googleAnalyticsId: 'G-J8CDG0J484',
    },
    copyright: '© 2024 nekonone.jp',
    localization: {
      defaultLocale: 'ja',
    },
  },

  // テーマ関連の設定
  theme: {
    colors: {
      base: '#F9F7F3',
    },
  },
}
