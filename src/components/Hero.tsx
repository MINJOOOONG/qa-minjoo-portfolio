'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

const socialLinks = [
  {
    href: 'https://github.com/MINJOOOONG',
    icon: '/images/github.svg',
    text: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/minjooooo/',
    icon: '/images/LinkedIn_icon.svg',
    text: 'LinkedIn',
  },
  {
    href: 'https://minjoolog.tistory.com/',
    text: 'Blog',
  },
]

export type HeroTexts = {
  이름: any
  생일: any
  주소: any
  jobTitle: any
  availableStatus: any
  basicInfoTitle: any
  other: any
  birthLabel: any
  locationLabel: any
  interestsLabel: any
  interests: any
}

const InfoRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-baseline gap-3">
    <span className="text-[var(--text-muted)] text-xs min-w-[72px] shrink-0">{label}</span>
    <span className="text-[var(--text-sub)] text-sm">{children}</span>
  </div>
)

export default function Hero({ texts }: { texts: HeroTexts }) {
  return (
    <div className="pt-8 pb-4">
      {/* Status */}
      <div className="mb-6">
        <span className="status-chip">
          <span className="status-dot" />
          {texts.availableStatus}
        </span>
      </div>

      {/* Name + Title + Image */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="text-sm text-[var(--accent)] font-medium mb-2 tracking-wide">
            {texts.jobTitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[var(--text)] leading-[1.1]">
            {texts.이름}
          </h2>
        </div>

        {/* Profile image */}
        <div className="shrink-0">
          <Image
            src="/images/profile.webp"
            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border border-[var(--border)]"
            style={{ objectPosition: 'center 20%' }}
            alt="profile"
            width={128}
            height={128}
            priority
          />
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-8">
        <InfoRow label={texts.birthLabel}>{texts.생일}</InfoRow>
        <InfoRow label={texts.locationLabel}>{texts.주소}</InfoRow>
        <InfoRow label={texts.interestsLabel}>{texts.interests}</InfoRow>
      </div>

      {/* Contact & Social */}
      <div className="flex flex-wrap gap-2">
        <a href="tel:010-4948-5089" className="pill">
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          010-4948-5089
        </a>
        <a href="mailto:zzz1577@naver.com" className="pill">
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          zzz1577@naver.com
        </a>
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            {link.icon ? (
              <Image src={link.icon} alt={link.text} width={14} height={14} className="opacity-60 invert" />
            ) : (
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            )}
            {link.text}
          </a>
        ))}
      </div>
    </div>
  )
}
