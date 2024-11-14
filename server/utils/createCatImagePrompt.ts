import { type CatProfile } from '@/types/catProfile'

const createCatImagePrompt = (catInfo: CatProfile): string => {
  if (catInfo == null || typeof catInfo !== 'object') {
    throw new Error('Invalid cat information.')
  }
  const { eyeColor, personality, breed, others, favorite, pattern } = catInfo

  const promptParts = [
    '以下の特徴を反映させた猫の絵を描いてください。ただし、アルファベットやひらがな、カタカナ、漢字は絶対に書かないでください。。',
    `「`,
    `${eyeColor}の目をしていて`,
    `${favorite}が好きな`,
    `${personality}${breed}のような猫。`,
    `また、${others}`,
    `」`,
  ]
  if (pattern != null) {
    // 絵柄が提供されている場合にのみ、プロンプトに追加
    promptParts.push(`絵柄は「${pattern}」です。`)
  } else {
    promptParts.push('リアルに描いてください。')
  }

  return promptParts.join('\n')
}
export default createCatImagePrompt
