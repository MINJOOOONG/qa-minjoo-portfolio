'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'ko' | 'en' | 'ja'

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ko')
  const [isLoading, setIsLoading] = useState(true)

  // Load language from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && ['ko', 'en', 'ja'].includes(stored)) {
      setLangState(stored as Language)
    }
    setIsLoading(false)
  }, [])

  // Save language to localStorage when it changes
  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
