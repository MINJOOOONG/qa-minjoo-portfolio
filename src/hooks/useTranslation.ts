'use client'

import { useCallback, useEffect, useState } from 'react'
import { useLanguage, Language } from '../contexts/LanguageContext'
import { translateText } from '../app/actions/translate'

/**
 * Hook to translate a Korean text to the current language.
 * Returns the Korean text immediately, then updates with translation when ready.
 */
export function useTranslatedText(koreanText: string): string {
  const { lang } = useLanguage()
  const [translated, setTranslated] = useState(koreanText)

  useEffect(() => {
    if (lang === 'ko') {
      setTranslated(koreanText)
      return
    }

    // Start with Korean, then translate
    setTranslated(koreanText)

    translateText(koreanText, lang).then((result) => {
      setTranslated(result)
    })
  }, [koreanText, lang])

  return translated
}

/**
 * Hook to translate multiple Korean texts.
 * Returns an object with the same keys but translated values.
 */
export function useTranslatedDict<T extends Record<string, string>>(
  koreanDict: T
): T {
  const { lang } = useLanguage()
  const [translated, setTranslated] = useState<T>(koreanDict)

  useEffect(() => {
    if (lang === 'ko') {
      setTranslated(koreanDict)
      return
    }

    // Start with Korean
    setTranslated(koreanDict)

    // Translate all values
    const translateAll = async () => {
      const result = { ...koreanDict }

      for (const key of Object.keys(koreanDict)) {
        const value = koreanDict[key]
        if (typeof value === 'string' && value.trim()) {
          result[key as keyof T] = (await translateText(value, lang)) as T[keyof T]
        }
      }

      setTranslated(result)
    }

    translateAll()
  }, [koreanDict, lang])

  return translated
}

/**
 * Get a translation function for the current language.
 * Usage: const t = useTranslate(); t('한국어 텍스트')
 */
export function useTranslate() {
  const { lang } = useLanguage()
  const [cache, setCache] = useState<Map<string, string>>(new Map())

  const translate = useCallback(
    async (koreanText: string): Promise<string> => {
      if (lang === 'ko') {
        return koreanText
      }

      const cacheKey = `${koreanText}-${lang}`
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey)!
      }

      const translated = await translateText(koreanText, lang)
      setCache((prev) => new Map(prev).set(cacheKey, translated))
      return translated
    },
    [lang, cache]
  )

  return translate
}
