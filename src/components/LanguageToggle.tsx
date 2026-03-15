'use client'

import { useLanguage, Language } from '../contexts/LanguageContext'

const languages: { code: Language; label: string }[] = [
  { code: 'ko', label: 'KR' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JP' },
  { code: 'zh', label: 'CN' },
  { code: 'fr', label: 'FR' },
]

export default function LanguageToggle() {
  const { lang, setLang, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="flex gap-0.5 p-1 border border-[var(--border)] rounded-full bg-[var(--bg-surface)]">
        {languages.map((l) => (
          <div
            key={l.code}
            className="px-2 py-1 text-xs font-medium rounded-full text-[var(--text-muted)]"
          >
            {l.label}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-0.5 p-1 border border-[var(--border)] rounded-full bg-[var(--bg-surface)]">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`
            px-2 py-1 text-xs font-medium rounded-full transition-all duration-150
            ${
              lang === l.code
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--text-sub)] hover:bg-[var(--bg-elevated)]'
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
