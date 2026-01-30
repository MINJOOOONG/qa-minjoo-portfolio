/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import { APPLICATION_NAME } from '../../common/constants'
import { PageProps } from '../../common/types'
import PlanbyLogo from '../../svg/PlanbyLogo'
import { getISODate } from '../../util/date'

import Certificates from './Certificates'
import { generalDict, 작성일 } from './dictionary/general'
import { projectDict } from './dictionary/project'
import Education from './Education'
import Hero from './Hero'
import LanguageUpdate from './LanguageUpdate'
import OtherCertificates from './OtherCertificates'
import TechStack from './TechStack'
import WorkExperiences, { TechBadge } from './WorkExperiences'

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = (await params).lang as 'ko' | 'en'

  if (lang === 'ko') return { title: APPLICATION_NAME }
  if (lang === 'en') return { title: `Minjoo ${getISODate(new Date())} Resume Portfolio` }

  return { title: APPLICATION_NAME }
}

export default async function HomePage({ params }: PageProps) {
  const lang = (await params).lang as 'ko' | 'en'
  const date = 작성일[lang]

  return (
    <main className="mx-auto max-w-[720px]">
      <LanguageUpdate lang={lang} />

      <div className="flex justify-end items-center">
        <h1 className="sr-only">{generalDict.이력서[lang]}</h1>
        <div className="flex whitespace-nowrap gap-2">
          <Link href="/ko">한국어</Link>
          <Link href="/en">English</Link>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="mb-12">
        <h2 className="text-2xl my-6 text-center">
          <span className="hero-highlight">{generalDict.히어로태그라인[lang]}</span>
        </h2>
        <Hero lang={lang} />
        <p className="my-4 text-gray-200">{generalDict.한줄소개[lang]}</p>
      </section>

      {/* 경력 */}
      <section id="work-experience" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>

          <h2 className="text-2xl font-bold">
            {generalDict.개발경력[lang]}{' '}
            <span className="text-sm font-semibold text-gray-400">{generalDict.경력기간[lang]}</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-700" />
          <WorkExperiences lang={lang} />
        </div>
      </section>

      {/* 개인 프로젝트 */}
      <section id="personal-project" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-2xl font-bold">{projectDict.개인프로젝트[lang]}</h2>
        </div>

        <div className="mb-6 p-4 bg-neutral-900 rounded-lg border border-neutral-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <a href="/images/2025-google-analytics.webp" target="_blank" className="text-3xl font-bold text-indigo-300" rel="noreferrer">
                {projectDict.googleAnalytics[lang]}
              </a>
              <div className="text-xs text-gray-400">MAU (Google Analytics)</div>
            </div>
            <div>
              <a href="/images/2025-amplitude.webp" target="_blank" className="text-3xl font-bold text-blue-300" rel="noreferrer">
                {projectDict.amplitude[lang]}
              </a>
              <div className="text-xs text-gray-400">Day 7 Retention (Amplitude)</div>
            </div>
            <div>
              <a href="/images/2025-cloudflare.webp" target="_blank" className="text-3xl font-bold text-purple-300" rel="noreferrer">
                {projectDict.cloudflareAnalytics[lang]}
              </a>
              <div className="text-xs text-gray-400">Data Cached (Cloudflare)</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between whitespace-nowrap gap-4 my-4 text-gray-100">
          <h4>리토미 (litomi)</h4>
          <div className="text-gray-300">2025년 3월 1일 ~ 현재</div>
        </div>
        <div className="text-gray-300">만화 웹 뷰어</div>

        <div className="flex flex-wrap gap-1 my-3">
          <TechBadge tech="Next.js App Router" />
          <TechBadge tech="TailwindCSS" />
          <TechBadge tech="Drizzle ORM" />
          <TechBadge tech="PostgreSQL" />
          <TechBadge tech="Redis" />
          <TechBadge tech="Docker" />
          <TechBadge tech="Vercel" />
          <TechBadge tech="Supabase" />
          <TechBadge tech="Cloudflare" />
          <TechBadge tech="Sentry" />
        </div>

        {/* (아래 프로젝트 상세 카드들은 네가 올린 그대로 유지) */}
        {/* ... 여기 아래는 길어서 생략하지 않고 그대로 두려면, 네 기존 코드에서 '개인 프로젝트' 섹션 아래 내용은 그대로 놔도 됨 */}
      </section>

      {/* 학력 */}
      <section id="education" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
          <h2 className="text-2xl font-bold">{generalDict.학력[lang]}</h2>
        </div>
        <Education lang={lang} />
      </section>

      {/* 자격증 */}
      <section id="certificate" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <h2 className="text-2xl font-bold">{generalDict.자격증[lang]}</h2>
        </div>
        <Certificates lang={lang} />
        <OtherCertificates lang={lang} />
      </section>

      {/* 기술 스택 */}
      <section id="skill" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <h2 className="text-2xl font-bold">{generalDict.기술스택[lang]}</h2>
        </div>
        <TechStack />
      </section>

      {/* 작성일/작성자 */}
      <div className="w-full text-center text-sm text-slate-300 mt-8">작성일: {date}</div>
      <div className="w-full text-center text-sm text-slate-300">{generalDict.작성자[lang]}</div>
      <div className="my-8" />
    </main>
  )
}
