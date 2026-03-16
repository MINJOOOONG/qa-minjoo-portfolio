/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next'
import Link from 'next/link'

import { APPLICATION_NAME } from '../../common/constants'
import { PageProps } from '../../common/types'
import { getISODate } from '../../util/date'

import Certificates from './Certificates'
import { generalDict, 작성일 } from './dictionary/general'
import { projectDict } from './dictionary/project'
import type { Lang } from './dictionary/utils'
import Education from './Education'
import Hero from './Hero'
import LanguageUpdate from './LanguageUpdate'
import OtherCertificates from './OtherCertificates'
import ProjectExperience from './ProjectExperience'
import { defaultProjects } from './project-data'
import TechStack from './TechStack'
import WorkExperiences from './WorkExperiences'
import { getProjects } from '../actions/content'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }, { lang: 'ja' }, { lang: 'zh' }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = (await params).lang as Lang

  if (lang === 'ko') return { title: APPLICATION_NAME }
  if (lang === 'en') return { title: `Minjoo ${getISODate(new Date())} Resume Portfolio` }
  if (lang === 'ja') return { title: `ソ・ミンジュ ポートフォリオ` }
  if (lang === 'zh') return { title: `徐敏珠 简历` }

  return { title: APPLICATION_NAME }
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5 mb-6">
    <span className="font-pixel text-sm text-[var(--accent)] opacity-50">&gt;</span>
    <h2 className="font-pixel text-lg sm:text-xl">{children}</h2>
  </div>
)

export default async function HomePage({ params }: PageProps) {
  const lang = (await params).lang as Lang
  const date = 작성일[lang]

  let projects = defaultProjects
  try {
    const dbProjects = await getProjects()
    if (dbProjects.length > 0) projects = dbProjects
  } catch {
    // DB unavailable, use defaults
  }

  return (
    <main className="mx-auto max-w-[880px] px-5 sm:px-8 lg:px-10 py-8">
      <LanguageUpdate lang={lang} />

      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2.5">
          <span className="pixel-cat pixel-cat-animated" aria-label="pixel cat" />
          <span className="font-pixel text-xs text-[var(--accent)] tracking-widest opacity-70">QA PORTFOLIO</span>
        </div>
        <nav className="flex gap-1">
          <Link href="/ko" className="lang-btn">한국어</Link>
          <Link href="/en" className="lang-btn">EN</Link>
          <Link href="/ja" className="lang-btn">日本語</Link>
          <Link href="/zh" className="lang-btn">中文</Link>
        </nav>
      </header>

      <h1 className="sr-only">{generalDict.이력서[lang]}</h1>

      {/* Hero */}
      <section id="hero" className="mb-12">
        <p className="font-pixel text-lg sm:text-xl text-center text-[var(--text)] mb-6">
          <span className="hero-highlight">{generalDict.히어로태그라인[lang]}</span>
        </p>
        <Hero lang={lang} />
        <p className="mt-5 text-[var(--text-sub)] font-body text-sm leading-relaxed">{generalDict.한줄소개[lang]}</p>
      </section>

      <div className="section-divider mb-12" />

      {/* 경력 */}
      <section id="work-experience" className="mb-12">
        <SectionHeading>
          {generalDict.개발경력[lang]}{' '}
          <span className="text-xs font-body text-[var(--text-muted)] font-normal">{generalDict.경력기간[lang]}</span>
        </SectionHeading>
        <WorkExperiences lang={lang} />
      </section>

      <div className="section-divider mb-12" />

      {/* 프로젝트 경험 */}
      <section id="project-experience" className="mb-12">
        <SectionHeading>{projectDict.프로젝트경험[lang]}</SectionHeading>
        <ProjectExperience lang={lang} projects={projects} />
      </section>

      <div className="section-divider mb-12" />

      {/* 학력 */}
      <section id="education" className="mb-12">
        <SectionHeading>{generalDict.학력[lang]}</SectionHeading>
        <Education lang={lang} />
      </section>

      <div className="section-divider mb-12" />

      {/* 자격증 */}
      <section id="certificate" className="mb-12">
        <SectionHeading>{generalDict.자격증[lang]}</SectionHeading>
        <Certificates lang={lang} />
        <OtherCertificates lang={lang} />
      </section>

      <div className="section-divider mb-12" />

      {/* 기술 스택 */}
      <section id="skill" className="mb-12">
        <SectionHeading>{generalDict.기술스택[lang]}</SectionHeading>
        <TechStack />
      </section>

      {/* Footer */}
      <footer className="text-center pt-4 pb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="pixel-cat" aria-label="pixel cat" />
        </div>
        <div className="font-body text-xs text-[var(--text-muted)] opacity-60">작성일: {date}</div>
        <div className="font-body text-xs text-[var(--text-muted)] opacity-60">{generalDict.작성자[lang]}</div>
      </footer>
    </main>
  )
}
