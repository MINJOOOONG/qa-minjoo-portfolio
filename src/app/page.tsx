'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { generalDict, 작성일 } from '../dictionaries/general'
import { getDictValue } from '../hooks/useDictionary'

import Certificates from '../components/Certificates'
import Education from '../components/Education'
import Hero from '../components/Hero'
import LanguageToggle from '../components/LanguageToggle'
import OtherCertificates from '../components/OtherCertificates'
import TechStack from '../components/TechStack'
import WorkExperiences from '../components/WorkExperiences'

// Section wrapper component
const Section = ({
  id,
  title,
  subtitle,
  icon,
  iconColor,
  children,
}: {
  id: string
  title: string
  subtitle?: string
  icon: React.ReactNode
  iconColor: string
  children: React.ReactNode
}) => (
  <section id={id} className="section-card mb-8">
    <div className="premium-section-header">
      <div className={`icon-wrapper ${iconColor}`}>{icon}</div>
      <h2>
        {title}
        {subtitle && <span className="text-sm font-normal text-gray-400 ml-2">{subtitle}</span>}
      </h2>
    </div>
    {children}
  </section>
)

export default function HomePage() {
  const { lang } = useLanguage()
  const d = (key: keyof typeof generalDict) => getDictValue(generalDict[key], lang)
  const date = 작성일[lang] ?? 작성일.ko

  return (
    <main className="mx-auto max-w-[760px] px-4 py-6">
      {/* Language Toggle */}
      <div className="flex justify-end items-center mb-6">
        <h1 className="sr-only">{d('이력서')}</h1>
        <LanguageToggle />
      </div>

      {/* Hero Section */}
      <section id="hero" className="mb-10">
        <h2 className="text-2xl my-8 text-center">
          <span className="hero-highlight">{d('히어로태그라인')}</span>
        </h2>
        <Hero />
        <p className="mt-6 text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
          {d('한줄소개')}
        </p>
      </section>

      {/* 경력 */}
      <Section
        id="work-experience"
        title={d('개발경력')}
        subtitle={d('경력기간')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        }
        iconColor="text-blue-400"
      >
        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-transparent" />
          <WorkExperiences />
        </div>
      </Section>

      {/* 학력 */}
      <Section
        id="education"
        title={d('학력')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        }
        iconColor="text-emerald-400"
      >
        <Education />
      </Section>

      {/* 자격증 */}
      <Section
        id="certificate"
        title={d('자격증')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        }
        iconColor="text-amber-400"
      >
        <Certificates />
        <OtherCertificates />
      </Section>

      {/* 기술 스택 */}
      <Section
        id="skill"
        title={d('기술스택')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        }
        iconColor="text-violet-400"
      >
        <TechStack />
      </Section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/5 mt-4">
        <p className="text-sm text-gray-500">작성일: {date}</p>
        <p className="text-sm text-gray-500 mt-1">{d('작성자')}</p>
      </footer>
    </main>
  )
}
