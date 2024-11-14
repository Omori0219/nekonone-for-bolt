/**
 * ナワバリの値を表す配列
 */
export const NAWABARI_VALUES = ['none', 'movie'] as const

/**
 * ナワバリを表すリテラル型
 */
export type NawabariType = (typeof NAWABARI_VALUES)[number]

/**
 * 値がNawabariTypeのどれかに一致するかをチェックする
 */
export function isNawabariType(value: unknown): value is NawabariType {
  return NAWABARI_VALUES.includes(value as NawabariType)
}
