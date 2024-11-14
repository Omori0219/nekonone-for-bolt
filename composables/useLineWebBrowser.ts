export const useLineWebBrowser = () => {
  const isLineWebBrowser = ref(false)

  const detectInAppBrowser = (ua: string) => {
    ua = ua.toLowerCase().trim()
    if (ua.includes('line/')) {
      return true
    }
    return false
  }

  onMounted(() => {
    const userAgent = navigator.userAgent
    isLineWebBrowser.value = detectInAppBrowser(userAgent)
  })

  const openExternalBrowser = () => {
    if (
      isLineWebBrowser.value &&
      !window.location.search.includes('openExternalBrowser=1')
    ) {
      const redirectUrl = `${window.location.href}?openExternalBrowser=1`
      window.location.href = redirectUrl
    }
  }

  return {
    isLineWebBrowser,
    openExternalBrowser,
  }
}
