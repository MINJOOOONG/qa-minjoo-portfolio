'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useLanguage, Language } from '../contexts/LanguageContext'
import { translateText } from '../app/actions/translate'

/**
 * Korean-only dictionary type.
 * All content is stored in Korean, translations happen via Papago API.
 */
type KoreanDict = Record<string, string>

/**
 * Hook for Papago-based translation.
 * - Korean: returns Korean immediately
 * - English/Japanese: returns Korean first, then updates with Papago translation
 *
 * @param dict - Dictionary with Korean values only
 * @returns Translated dictionary values
 */
export function useDict<T extends KoreanDict>(dict: T): Record<keyof T, string> {
  const { lang } = useLanguage()

  // Memoize Korean values
  const koreanValues = useMemo(() => {
    const result = {} as Record<keyof T, string>
    for (const key in dict) {
      result[key] = dict[key]
    }
    return result
  }, [dict])

  const [translated, setTranslated] = useState<Record<keyof T, string>>(koreanValues)

  useEffect(() => {
    // For Korean, just use Korean values directly
    if (lang === 'ko') {
      setTranslated(koreanValues)
      return
    }

    // Start with Korean values (shown while loading)
    setTranslated(koreanValues)

    // Translate all values via Papago
    const translateAll = async () => {
      const result = { ...koreanValues }
      let hasChanges = false

      console.log(`[useDict] Starting translation to ${lang} for ${Object.keys(dict).length} keys`)

      for (const key in dict) {
        const koreanText = dict[key]
        if (typeof koreanText === 'string' && koreanText.trim()) {
          try {
            const translatedValue = await translateText(koreanText, lang as 'en' | 'ja')
            if (translatedValue !== koreanText) {
              result[key as keyof T] = translatedValue
              hasChanges = true
            }
          } catch (error) {
            console.error(`[useDict] Translation failed for key "${key}":`, error)
          }
        }
      }

      if (hasChanges) {
        console.log(`[useDict] Translation complete for ${lang}`)
        setTranslated(result)
      }
    }

    translateAll()
  }, [dict, lang, koreanValues])

  return translated
}

/**
 * Hook for getting a single translated text.
 * Returns Korean first, then updates with translation.
 */
export function useTranslatedText(koreanText: string): string {
  const { lang } = useLanguage()
  const [translated, setTranslated] = useState(koreanText)

  useEffect(() => {
    if (lang === 'ko') {
      setTranslated(koreanText)
      return
    }

    setTranslated(koreanText)

    translateText(koreanText, lang as 'en' | 'ja')
      .then((result) => {
        setTranslated(result)
      })
      .catch((error) => {
        console.error('[useTranslatedText] Translation failed:', error)
      })
  }, [koreanText, lang])

  return translated
}

// ============================================================
// Legacy support - keeping old functions for gradual migration
// ============================================================

type DictValue<T> = {
  ko: T
  en?: T
  ja?: T
}

type Dictionary<T> = Record<string, DictValue<T>>

/**
 * @deprecated Use useDict instead for Papago-based translation
 */
export function getDictValue<T>(value: DictValue<T>, lang: Language): T {
  if (value[lang] !== undefined) {
    return value[lang] as T
  }
  return value.ko
}

/**
 * @deprecated Use useDict instead for Papago-based translation
 */
export function useDictionary<T>(dict: Dictionary<T>): Record<string, T> {
  const { lang } = useLanguage()

  const result: Record<string, T> = {}

  for (const key in dict) {
    const value = dict[key]
    result[key] = getDictValue(value, lang)
  }

  return result
}

/**
 * @deprecated Use useDict instead for Papago-based translation
 */
export function useAutoTranslatedDict<T extends Record<string, { ko: string; en?: string; ja?: string }>>(
  dict: T
): Record<keyof T, string> {
  const { lang } = useLanguage()

  const getInitialValues = useCallback(() => {
    const result = {} as Record<keyof T, string>
    for (const key in dict) {
      const value = dict[key]
      result[key] = (value[lang] ?? value.ko) as string
    }
    return result
  }, [dict, lang])

  const [translated, setTranslated] = useState<Record<keyof T, string>>(getInitialValues)

  useEffect(() => {
    if (lang === 'ko') {
      setTranslated(getInitialValues())
      return
    }

    setTranslated(getInitialValues())

    const translateMissing = async () => {
      const result = { ...getInitialValues() }
      let hasChanges = false

      for (const key in dict) {
        const value = dict[key]
        if (value[lang] === undefined && typeof value.ko === 'string') {
          const translatedValue = await translateText(value.ko, lang as 'en' | 'ja')
          if (translatedValue !== value.ko) {
            result[key] = translatedValue as Record<keyof T, string>[keyof T]
            hasChanges = true
          }
        }
      }

      if (hasChanges) {
        setTranslated(result)
      }
    }

    translateMissing()
  }, [dict, lang, getInitialValues])

  return translated
}
