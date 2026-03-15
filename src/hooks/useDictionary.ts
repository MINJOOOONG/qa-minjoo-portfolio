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

/**
 * @deprecated Use useDictTranslation instead
 */
export function getDictValue<T>(value: DictValue<T>, lang: Language): T {
  if (value[lang] !== undefined) {
    return value[lang] as T
  }
  return value.ko
}

// ============================================================
// API-based translation hook
// ============================================================

type StaticDict = Record<string, { ko: any; en?: any; ja?: any }>

/**
 * Hook for dict translation with static en priority + API fallback.
 * - ko: returns Korean immediately
 * - en: returns static en value (falls back to API if missing)
 * - ja: shows en as interim (not ko), then replaces with API translation
 * - JSX values (non-string): uses en ?? ko fallback, no API call
 * - On API failure: falls back to Korean
 *
 * Returns a `d(key)` accessor function matching existing component usage.
 */
export function useDictTranslation<T extends StaticDict>(dict: T) {
  const { lang } = useLanguage()

  // Resolve static values: try target lang → en fallback → ko fallback
  const resolveStatic = useCallback(
    (targetLang: Language) => {
      const result = {} as Record<keyof T, any>
      for (const key in dict) {
        const value = dict[key]
        result[key] = value[targetLang] ?? value.en ?? value.ko
      }
      return result
    },
    [dict]
  )

  const [values, setValues] = useState(() => resolveStatic(lang))

  useEffect(() => {
    // ko: immediate
    if (lang === 'ko') {
      setValues(resolveStatic('ko'))
      return
    }

    // Set static values first (en uses en keys, ja uses en as interim)
    const staticResult = resolveStatic(lang)
    setValues(staticResult)

    // Find keys needing API translation (no static value for this lang, and ko is a string)
    const keysToTranslate: string[] = []
    for (const key in dict) {
      if (dict[key][lang] === undefined && typeof dict[key].ko === 'string') {
        keysToTranslate.push(key)
      }
    }

    if (keysToTranslate.length === 0) return

    let cancelled = false

    const translateMissing = async () => {
      const result = { ...staticResult }
      for (const key of keysToTranslate) {
        if (cancelled) return
        try {
          result[key as keyof T] = await translateText(dict[key].ko, lang as 'en' | 'ja')
        } catch {
          // Keep fallback (en or ko, already set in staticResult)
        }
      }
      if (!cancelled) {
        setValues(result)
      }
    }

    translateMissing()

    return () => {
      cancelled = true
    }
  }, [dict, lang, resolveStatic])

  return useCallback((key: keyof T) => values[key], [values])
}
