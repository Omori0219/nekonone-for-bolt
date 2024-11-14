// ユーザー名のバリデーション結果とエラーメッセージを返す
export function validateUserScreenName(userScreenName: string): {
  isValid: boolean
  message: string
} {
  if (userScreenName.length === 0) {
    return { isValid: false, message: `ユーザー名を入力してください` }
  }
  if (userScreenName.length > 20) {
    return {
      isValid: false,
      message: 'ユーザー名は20文字以下である必要があります',
    }
  }
  if (/\s/.test(userScreenName)) {
    return {
      isValid: false,
      message: 'ユーザー名に空白を含めることはできません',
    }
  }
  // 漢字をチェックする正規表現
  if (/[\u4E00-\u9FAF\u3400-\u4DBF]/.test(userScreenName)) {
    return {
      isValid: false,
      message: '漢字は使えません',
    }
  }
  // 英数字、ひらがな、カタカナ、ハイフン、長音符を許可し、それ以外を禁止する正規表現
  if (!/^[\u3040-\u309F\u30A0-\u30FFa-zA-Z0-9ー-]+$/.test(userScreenName)) {
    return {
      isValid: false,
      message: '英数字、ひらがな、カタカナ、ハイフン、長音符のみ使えます',
    }
  }
  return { isValid: true, message: '' }
}

// ユーザーIDのバリデーション結果とエラーメッセージを返す
export function validateUserId(userId: string): {
  isValid: boolean
  message: string
} {
  if (userId.length === 0) {
    return { isValid: false, message: 'ユーザーIDを入力してください。' }
  }
  if (userId.length > 20) {
    return {
      isValid: false,
      message: 'ユーザーIDは20文字以下である必要があります。',
    }
  }
  if (/\s/.test(userId)) {
    return {
      isValid: false,
      message: 'ユーザーIDに空白を含めることはできません',
    }
  }
  if (userId[0] === '_') {
    return {
      isValid: false,
      message: 'ユーザーIDの最初の文字にアンダースコアは使用できません。',
    }
  }
  if (!/^[a-zA-Z0-9_]+$/.test(userId)) {
    return {
      isValid: false,
      message: 'ユーザーIDには英数字とアンダースコアのみ使用できます。',
    }
  }
  return { isValid: true, message: '' }
}
