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
  // Skip empty or whitespace-only text
  if (!koreanText || !koreanText.trim()) {
    return koreanText
  }

  // Check memory cache first (fastest)
  const memoryCached = getMemoryCachedTranslation(koreanText, targetLang)
  if (memoryCached) {
    return memoryCached
  }

  // Check file cache (persistent)
  const fileCached = getCachedTranslation(koreanText, targetLang)
  if (fileCached) {
    setMemoryCachedTranslation(koreanText, targetLang, fileCached)
    return fileCached
  }

  // Get API credentials from environment
  const clientId = process.env.PAPAGO_CLIENT_ID
  const clientSecret = process.env.PAPAGO_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.warn('Papago API credentials not configured, falling back to Korean')
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
      console.error('Papago API error:', response.status, response.statusText)
      return koreanText
    }

    const data = await response.json()
    const translatedText = data?.message?.result?.translatedText

    if (translatedText) {
      // Cache the result
      setCachedTranslation(koreanText, targetLang, translatedText)
      setMemoryCachedTranslation(koreanText, targetLang, translatedText)
      return translatedText
    }

    return koreanText
  } catch (error) {
    console.error('Translation error:', error)
    return koreanText
  }
}

/**
 * Translate multiple texts in batch.
 * Papago doesn't support batch API, so we translate sequentially with delays.
 */
export async function translateBatch(
  texts: string[],
  targetLang: TargetLang
): Promise<string[]> {
  const results: string[] = []

  for (const text of texts) {
    const translated = await translateText(text, targetLang)
    results.push(translated)

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  return results
}

/**
 * Translate a dictionary object (key-value pairs where values are Korean strings).
 * Returns a new object with translated values.
 */
export async function translateDictionary(
  dict: Record<string, string>,
  targetLang: TargetLang
): Promise<Record<string, string>> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(dict)) {
    if (typeof value === 'string') {
      result[key] = await translateText(value, targetLang)
    } else {
      result[key] = value
    }
  }

  return result
}
