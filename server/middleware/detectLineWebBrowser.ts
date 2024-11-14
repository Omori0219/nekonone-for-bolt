export default defineEventHandler((event) => {
  const userAgent = getRequestHeader(event, 'user-agent')
  if (
    userAgent &&
    userAgent.toLowerCase().includes('line') &&
    !event?.node?.req?.url?.includes('openExternalBrowser=1')
  ) {
    const redirectUrl = `${event.node.req.url}?openExternalBrowser=1`
    return sendRedirect(event, redirectUrl, 302)
  }
})
