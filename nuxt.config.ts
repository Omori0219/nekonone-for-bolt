import { fileURLToPath, URL } from 'url'
import { staticConfig } from './static.config'
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: staticConfig.defaultHead.htmlAttrs,
      meta: [
        { charset: staticConfig.defaultHead.charset },
        { name: 'viewport', content: staticConfig.defaultHead.viewport },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: staticConfig.images.favicon,
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: staticConfig.images.appleIcon,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: staticConfig.images.icon,
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Darumadrop+One&family=Noto+Sans+JP:wght@100..900&display=swap',
        },
      ],
    },
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-custom-media': {},
    },
  },
  modules: ['@nuxt/image', '@sidebase/nuxt-auth'],
  auth: {
    provider: {
      type: 'authjs',
    },
  },
  // nuxtImageの設定。
  image: {
    format: ['webp'],
    domains: [process.env.CDN_ENDPOINT ?? ''],
  },
  ssr: true,
  plugins: ['@/plugins/pinia'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: {
    typeCheck: true,
  },
  css: [
    '@/assets/css/reset.css',
    '@/assets/scss/base.scss',
    '@/assets/scss/components.scss',
  ],
  // Viteのビルドの際に、SCSSのパーシャルファイルを読み込むよう指定する
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
  alias: { '@': '.', '~': '.' },
  runtimeConfig: {
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      auth: {
        isEnabled: true, // 必要に応じて設定
        provider: {
          type: 'authjs',
          trustHost: true,
          defaultProvider: 'google',
          addDefaultCallbackUrl: true,
        },
        session: {
          enableRefreshPeriodically: false, // またはリフレッシュ間隔のミリ秒数
          enableRefreshOnWindowFocus: true,
        },
        globalAppMiddleware: true,
        computed: {
          origin: process.env.AUTH_ORIGIN,
          pathname: process.env.AUTH_PATHNAME ?? '',
          fullBaseUrl: process.env.AUTH_FULL_BASE_URL ?? '',
        },
      },
    },
  },
})
