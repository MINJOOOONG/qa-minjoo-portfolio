import Image from 'next/image'
import { ReactNode } from 'react'

import { heroDict } from './dictionary/hero'
import type { Lang } from './dictionary/utils'

type Props = {
  lang: Lang
}

const ICONS = {
  github: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  blog: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  phone: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  email: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
}

const ContactLink = ({
  href,
  icon,
  children,
  external = false,
}: {
  href: string
  icon: ReactNode
  children: ReactNode
  external?: boolean
}) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
  >
    <span className="opacity-60">{icon}</span>
    <span>{children}</span>
  </a>
)

export default function Hero({ lang }: Props) {
  return (
    <div className="card overflow-hidden">
      {/* Profile */}
      <div className="px-8 sm:px-10 py-8">
        <div className="flex flex-row items-center gap-7">
          <Image
            src="/images/profile.webp"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border border-[var(--border-solid)] shrink-0 object-cover"
            style={{ imageRendering: 'auto' }}
            alt="profile"
            width={150}
            height={150}
            priority
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="font-pixel text-xl sm:text-2xl text-[var(--text)] mb-0.5">{heroDict.이름[lang]}</h1>
                <p className="font-pixel text-sm text-[var(--accent)] opacity-80">{heroDict.jobTitle[lang]}</p>
              </div>
              <div className="hidden sm:block shrink-0">
                <span className="status-chip">
                  <span className="status-dot" />
                  {heroDict.availableStatus[lang]}
                </span>
              </div>
            </div>

            {/* Desktop contact */}
            <div className="hidden sm:flex flex-wrap gap-x-5 gap-y-1.5 mt-4 pt-3 border-t border-[var(--border-solid)]">
              <ContactLink href="https://github.com/MINJOOOONG" icon={ICONS.github} external>GitHub</ContactLink>
              <ContactLink href="https://www.linkedin.com/in/minjooooo/" icon={ICONS.linkedin} external>LinkedIn</ContactLink>
              <ContactLink href="https://joodev-sandy.vercel.app/" icon={ICONS.blog} external>Blog</ContactLink>
              <ContactLink href="mailto:zzz1577@naver.com" icon={ICONS.email}>zzz1577@naver.com</ContactLink>
              <ContactLink href="tel:010-4948-5089" icon={ICONS.phone}>010-4948-5089</ContactLink>
            </div>
          </div>
        </div>

        {/* Mobile contact */}
        <div className="sm:hidden flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-3 border-t border-[var(--border-solid)]">
          <ContactLink href="https://github.com/MINJOOOONG" icon={ICONS.github} external>GitHub</ContactLink>
          <ContactLink href="https://www.linkedin.com/in/minjooooo/" icon={ICONS.linkedin} external>LinkedIn</ContactLink>
          <ContactLink href="https://joodev-sandy.vercel.app/" icon={ICONS.blog} external>Blog</ContactLink>
          <ContactLink href="mailto:zzz1577@naver.com" icon={ICONS.email}>zzz1577@naver.com</ContactLink>
          <ContactLink href="tel:010-4948-5089" icon={ICONS.phone}>010-4948-5089</ContactLink>
        </div>
      </div>

      {/* Info bar */}
      <div className="px-8 sm:px-10 py-4 bg-[var(--bg-elevated)] border-t border-[var(--border-solid)]">
        <dl className="flex flex-col sm:flex-row sm:gap-10 gap-2.5">
          <div>
            <dt className="font-pixel text-[0.65rem] text-[var(--accent)] uppercase tracking-widest opacity-70">{heroDict.birthLabel[lang]}</dt>
            <dd className="font-body text-sm text-[var(--text-sub)]">{heroDict.생일[lang]}</dd>
          </div>
          <div>
            <dt className="font-pixel text-[0.65rem] text-[var(--accent)] uppercase tracking-widest opacity-70">{heroDict.locationLabel[lang]}</dt>
            <dd className="font-body text-sm text-[var(--text-sub)]">
              <a href="https://naver.me/Fcg2bYyc" target="_blank" rel="noopener noreferrer" className="text-[var(--text-sub)] hover:text-[var(--accent)] transition-colors">
                {heroDict.주소[lang]}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-pixel text-[0.65rem] text-[var(--accent)] uppercase tracking-widest opacity-70">{heroDict.interestsLabel[lang]}</dt>
            <dd className="font-body text-sm text-[var(--text-sub)]">{heroDict.interests[lang]}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
