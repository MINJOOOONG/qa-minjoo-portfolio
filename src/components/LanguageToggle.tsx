'use client'

import { useLanguage, Language } from '../contexts/LanguageContext'

const languages: { code: Language; label: string }[] = [
  { code: 'ko', label: 'KR' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JP' },
]

export default function LanguageToggle() {
  const { lang, setLang, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="flex gap-1 p-1 bg-neutral-800/50 rounded-lg border border-neutral-700">
        {languages.map((l) => (
          <div
            key={l.code}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-transparent text-neutral-500"
          >
            {l.label}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-1 p-1 bg-neutral-800/50 rounded-lg border border-neutral-700">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150
            ${
              lang === l.code
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/50'
            }
          `}
          aria-pressed={lang === l.code}
          aria-label={`Switch to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
