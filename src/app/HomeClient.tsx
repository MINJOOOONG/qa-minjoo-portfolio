'use client'

import { useState, useTransition } from 'react'

import { useLanguage } from '../contexts/LanguageContext'
import { generalDict, 작성일 } from '../dictionaries/general'
import { heroDict } from '../dictionaries/hero'
import { educationDict } from '../dictionaries/education'
import { workExperiencesDict } from '../dictionaries/work-experiences'
import { resolveDict } from '../dictionaries/resolve'

import EditableText from '../components/EditableText'
import EditToolbar from '../components/EditToolbar'
import Education from '../components/Education'
import Hero from '../components/Hero'
import LanguageToggle from '../components/LanguageToggle'
import TechStack from '../components/TechStack'
import WorkExperiences from '../components/WorkExperiences'
import { saveAllContents } from './actions/content'

/* ── Section wrapper ── */
const Section = ({
  id,
  label,
  title,
  children,
}: {
  id: string
  label: string
  title: string
  children: React.ReactNode
}) => (
  <section id={id}>
    <p className="section-label">{label}</p>
    <h2 className="section-heading">{title}</h2>
    {children}
  </section>
)

const FALLBACKS: Record<string, string> = {
  한줄소개:
    "코드를 이해하고 직접 다루며 품질을 검증하는 QA Engineer입니다. 고객의 불편을 기능 단위가 아닌 구조와 코드 관점에서 분석하고, 제품이 '왜 그렇게 동작해야 하는지'를 끝까지 질문합니다.",
  work_experience: '',
  portfolio_section: '',
}

export default function HomeClient({
  contents,
}: {
  contents: Record<string, string>
}) {
  const { lang } = useLanguage()

  const g = resolveDict(generalDict, lang)
  const h = resolveDict(heroDict, lang)
  const w = resolveDict(workExperiencesDict, lang)
  const e = resolveDict(educationDict, lang)
  const date = 작성일[lang] ?? 작성일.ko

  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(contents)
  const [drafts, setDrafts] = useState(contents)
  const [isPending, startTransition] = useTransition()

  const getValue = (key: string) => {
    const src = isEditing ? drafts : saved
    const raw = src[key] || FALLBACKS[key] || ''
    if (!isEditing && key === '한줄소개') {
      return g('한줄소개')
    }
    return raw
  }

  const setDraft = (key: string, value: string) => {
    setDrafts((prev) => ({ ...prev, [key]: value }))
  }

  const handleAuth = () => {
    setDrafts({ ...saved })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDrafts({ ...saved })
    setIsEditing(false)
  }

  const handleSave = () => {
    startTransition(async () => {
      const entries = Object.keys(drafts)
        .filter((key) => drafts[key] !== saved[key])
        .map((key) => ({ key, content: drafts[key] }))

      if (entries.length === 0) {
        setIsEditing(false)
        return
      }

      const result = await saveAllContents(entries)
      if (result.success) {
        setSaved({ ...drafts })
        setIsEditing(false)
      } else {
        alert(result.error)
      }
    })
  }

  return (
    <main className="mx-auto max-w-[720px] px-6 md:px-8 pb-24">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-30 py-4 flex justify-end items-center gap-3"
        style={{ background: 'linear-gradient(to bottom, var(--bg) 60%, transparent)' }}>
        <h1 className="sr-only">{g('이력서')}</h1>
        <EditToolbar
          isEditing={isEditing}
          onAuth={handleAuth}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <LanguageToggle />
      </header>

      {/* Saving overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 bg-[var(--bg)]/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl px-6 py-4 text-sm text-[var(--text-sub)]">
            Saving...
          </div>
        </div>
      )}

      {/* ─────── HERO ─────── */}
      <section id="hero">
        <Hero texts={{
          이름: h('이름'),
          생일: h('생일'),
          주소: h('주소'),
          jobTitle: h('jobTitle'),
          availableStatus: h('availableStatus'),
          basicInfoTitle: h('basicInfoTitle'),
          other: h('other'),
          birthLabel: h('birthLabel'),
          locationLabel: h('locationLabel'),
          interestsLabel: h('interestsLabel'),
          interests: h('interests'),
        }} />

        {/* Introduction */}
        <div className="mt-10 mb-4 border-l-2 border-[var(--accent)] pl-5 max-w-xl">
          <EditableText
            value={getValue('한줄소개')}
            isEditing={isEditing}
            onChange={(v) => setDraft('한줄소개', v)}
            label="한줄소개"
            className="text-sm leading-relaxed text-[var(--text-sub)]"
          />
        </div>
      </section>

      <div className="divider my-16" />

      {/* ─────── EXPERIENCE ─────── */}
      <Section id="work-experience" label="Experience" title={g('개발경력')}>
        <p className="text-xs text-[var(--text-muted)] mb-6">{g('경력기간')}</p>
        <WorkExperiences d={w} />

        {isEditing && (
          <EditableText
            value={getValue('work_experience')}
            isEditing={true}
            onChange={(v) => setDraft('work_experience', v)}
            label="경력 추가 메모"
            rows={6}
            className="mt-6"
          />
        )}
      </Section>

      <div className="divider my-16" />

      {/* ─────── EDUCATION ─────── */}
      <Section id="education" label="Education" title={g('학력')}>
        <Education d={e} />
      </Section>

      <div className="divider my-16" />

      {/* ─────── SKILLS ─────── */}
      <Section id="skill" label="Skills" title={g('기술스택')}>
        <TechStack />
      </Section>

      <div className="divider my-16" />

      {/* ─────── PORTFOLIO ─────── */}
      <Section id="portfolio" label="Portfolio" title={g('포트폴리오')}>
        {!isEditing && !getValue('portfolio_section') ? (
          <p className="text-sm text-[var(--text-muted)] italic">{g('준비중')}</p>
        ) : (
          <EditableText
            value={getValue('portfolio_section')}
            isEditing={isEditing}
            onChange={(v) => setDraft('portfolio_section', v)}
            label="포트폴리오"
            rows={8}
          />
        )}
      </Section>

      {/* ─────── FOOTER ─────── */}
      <footer className="mt-20 pt-6 border-t border-[var(--border)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
          <p className="text-xs text-[var(--text-muted)]">{g('작성자')}</p>
          <p className="text-xs text-[var(--text-muted)]">{date}</p>
        </div>
      </footer>
    </main>
  )
}
