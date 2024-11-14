// 漢字チェック正規表現
const kanjiRegex = /[一-龥]/
// 空白文字チェック正規表現
const whitespaceRegex = /\s/
// 全角数字チェック正規表現
const fullWidthNumberRegex = /[０-９]/
// 記号チェック正規表現
const symbolsRegex = /[!()]/ // ハイフンと長音符を許可するため、除外
// 共通の文字種チェック正規表現（数字、アルファベット、カタカナ、ひらがな、ハイフン、長音符のみ許可）
const invalidCharactersRegex = /[^ぁ-んァ-ンa-zA-Z0-9ー-]+/g
// 文字数チェック関数
const checkLength = (value: string, maxLength: number): string | null => {
  if (value.length < 1) {
    return `文字を入力してください`
  } else if (value.length > maxLength) {
    return `${maxLength}文字以内にする必要があります。`
  }
  return null
}
// 猫プロフィールの最大文字数
export const catProfileMaxLength = 20

// 文字種チェック関数
const checkCharacters = (value: string): string | null => {
  if (whitespaceRegex.test(value)) {
    return `空白が入ってます`
  }
  if (kanjiRegex.test(value)) {
    return `漢字は使えません`
  }
  if (symbolsRegex.test(value)) {
    return `!や()などの記号は使用できません。`
  }
  if (fullWidthNumberRegex.test(value)) {
    return `全角数字は使用できません。`
  }
  const invalidCharacters = value.match(invalidCharactersRegex)
  if (invalidCharacters !== null) {
    return `${invalidCharacters.join(' ')}：この文字は使用できません`
  }
  return null
}

// バリデーション関数
export const validateField = (value: string): string | null => {
  const lengthError = checkLength(value, catProfileMaxLength)
  if (lengthError !== null) return lengthError
  const characterError = checkCharacters(value)
  if (characterError !== null) return characterError

  return null
}
