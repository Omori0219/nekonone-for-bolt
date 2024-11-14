<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { staticConfig } from './static.config'
  useSeoMeta({
    title: staticConfig.siteMetaData.title,
    description: staticConfig.siteMetaData.description,
    ogTitle: staticConfig.siteMetaData.title,
    ogDescription: staticConfig.siteMetaData.description,
    ogUrl: staticConfig.siteMetaData.url,
    ogImage: staticConfig.images.ogImage,
    ogSiteName: staticConfig.siteMetaData.title,
    ogType: staticConfig.siteMetaData.type,
    keywords: staticConfig.siteMetaData.keywords,
    author: staticConfig.siteMetaData.author.name,
    twitterCard: staticConfig.socials.twitterCard,
    twitterSite: staticConfig.socials.twitter,
    twitterTitle: staticConfig.siteMetaData.title,
    twitterDescription: staticConfig.siteMetaData.description,
    twitterImage: staticConfig.images.ogImage,
  })

  const router = useRouter()
  const route = router.currentRoute

  onMounted(() => {
    const openExternalBrowser = route.value.query.openExternalBrowser
    if (openExternalBrowser === '1') {
      window.location.href = `${window.location.origin}${route.value.path}`
    }
  })
</script>
