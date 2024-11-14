/**
 * 日付をYYYY-MM-DD形式の文字列に変換する
 */
export function formatPartitionDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月は0から始まるため、1を加える
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * 日付をYYYY-MM形式の文字列に変換する
 */
export function formatPartitionYearMonth(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月は0から始まるため、1を加える

  return `${year}-${month}`
}

/**
 * ユーザーIDと日付からパーテーションキーを生成する
 */
export function createUserPostYearMonthKey(userId: string, date: Date): string {
  const yearMonth = formatPartitionYearMonth(date)

  return `${userId}-${yearMonth}`
}
