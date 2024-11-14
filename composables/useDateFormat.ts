// composables/useDateFormat.ts
export const useDateFormat = () => {
  const formatDate = (date: string | number | Date) => {
    if (date == null) return ''
    const options: Intl.DateTimeFormatOptions = {
      // year: 'numeric',
      month: 'numeric',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
      hour12: false,
    }
    return new Intl.DateTimeFormat('ja-JP', options).format(new Date(date))
  }
  const useDateFormatForSponsors = (date: string | number | Date) => {
    if (date == null) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1 // getMonth()は0から始まるため、1を加えます
    return `${year}ねん${month}がつ`
  }
  const formatElapsedTime = (date: string | number | Date) => {
    if (date == null) return ''
    const diffInSeconds = Math.floor(
      (Date.now() - new Date(date).getTime()) / 1000
    )
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      // 60分 * 60秒
      return `${Math.floor(diffInSeconds / 60)} minutes ago`
    } else if (diffInSeconds < 86400) {
      // 24時間 * 60分 * 60秒
      return `${Math.floor(diffInSeconds / 3600)} hours ago`
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`
    }
  }
  const formatJapaneseStyle = (date: string | number | Date) => {
    if (date == null) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()
    const padZero = (num: number) => (num < 10 ? '0' : '') + num
    return `${year}ねん${month}がつ${day}にち ・ ${hour}:${padZero(minute)}:${padZero(second)}`
  }
  const formatJapaneseStyleWithTime = (date: string | number | Date) => {
    if (date == null) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const padZero = (num: number) => (num < 10 ? '0' : '') + num
    return `${year}ねん${month}がつ${day}にち ${padZero(hour)}:${padZero(minute)}`
  }

  return {
    formatDate,
    useDateFormatForSponsors,
    formatElapsedTime,
    formatJapaneseStyle,
    formatJapaneseStyleWithTime,
  }
}
