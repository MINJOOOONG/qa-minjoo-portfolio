import type { Language } from '../contexts/LanguageContext'

type DictEntry = { ko: any; en?: any; ja?: any; zh?: any; fr?: any }
type Dict = Record<string, DictEntry>

/**
 * Resolve all dictionary values for the given language.
 * Returns a function d(key) that returns the resolved value.
 */
export function resolveDict<T extends Dict>(dict: T, lang: Language) {
  const resolved = {} as Record<keyof T, any>
  for (const key in dict) {
    const entry = dict[key]
    resolved[key] = entry[lang] ?? entry.en ?? entry.ko
  }
  return (key: keyof T) => resolved[key]
}
