'use server'

import {
  getCachedTranslation,
  setCachedTranslation,
  getMemoryCachedTranslation,
  setMemoryCachedTranslation,
} from '../../lib/translation-cache'

type TargetLang = 'en' | 'ja'

const PAPAGO_API_URL = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation'

/**
 * Translate a single Korean text to the target language using Papago API.
 * Returns the original Korean text if translation fails.
 */
export async function translateText(
  koreanText: string,
  targetLang: TargetLang
): Promise<string> {
  if (!koreanText || !koreanText.trim()) {
    return koreanText
  }

  const memoryCached = getMemoryCachedTranslation(koreanText, targetLang)
  if (memoryCached) {
    return memoryCached
  }

  const fileCached = getCachedTranslation(koreanText, targetLang)
  if (fileCached) {
    setMemoryCachedTranslation(koreanText, targetLang, fileCached)
    return fileCached
  }

  const clientId = process.env.PAPAGO_CLIENT_ID
  const clientSecret = process.env.PAPAGO_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return koreanText
  }

  try {
    const response = await fetch(PAPAGO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientSecret,
      },
      body: new URLSearchParams({
        source: 'ko',
        target: targetLang,
        text: koreanText,
      }),
    })

    if (!response.ok) {
      return koreanText
    }

    const data = await response.json()
    const translatedText = data?.message?.result?.translatedText

    if (translatedText) {
      setCachedTranslation(koreanText, targetLang, translatedText)
      setMemoryCachedTranslation(koreanText, targetLang, translatedText)
      return translatedText
    }

    return koreanText
  } catch {
    return koreanText
  }
}
