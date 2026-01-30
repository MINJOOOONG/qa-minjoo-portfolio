'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

import { useLanguage } from '../contexts/LanguageContext'
import { heroDict } from '../dictionaries/hero'
import { getDictValue } from '../hooks/useDictionary'

// SVG Icons as constants
const ICONS = {
  phone: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  email: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
}

// Reusable contact link component
const ContactLink = ({
  href,
  icon,
  children,
  className = '',
}: {
  href: string
  icon: ReactNode
  children: ReactNode
  className?: string
}) => (
  <a
    href={href}
    className={`inline-flex items-center gap-2 text-gray-200 hover:text-white transition ${className}`}
  >
    {icon}
    <span className="font-medium">{children}</span>
  </a>
)

// Info section component
const InfoSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</h2>
    <dl className="space-y-3">{children}</dl>
  </div>
)

// Info item component
const InfoItem = ({ label, children }: { label?: string; children: ReactNode }) => (
  <div>
    {label && <dt className="text-sm text-gray-400">{label}</dt>}
    <dd className="text-sm font-medium text-gray-100">{children}</dd>
  </div>
)

// Blog icon SVG component
const BlogIcon = () => (
  <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
)

// Social link component
const SocialLink = ({
  href,
  icon,
  text,
  useBlogIcon,
}: {
  href: string
  icon?: string
  text: string
  useBlogIcon?: boolean
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white transition"
  >
    {useBlogIcon ? (
      <BlogIcon />
    ) : (
      <Image src={icon!} alt={text.split('/')[0]} width={16} height={16} className="opacity-80" />
    )}
    {text}
  </a>
)

const socialLinks = [
  {
    href: 'https://github.com/MINJOOOONG',
    icon: '/images/github.svg',
    text: 'github.com/MINJOOOONG',
  },
  {
    href: 'https://www.linkedin.com/in/minjooooo/',
    icon: '/images/LinkedIn_icon.svg',
    text: 'linkedin.com/in/minjooooo',
  },
  {
    href: 'https://minjoolog.tistory.com/',
    text: 'minjoolog.tistory.com',
    useBlogIcon: true,
  },
]

export default function Hero() {
  const { lang } = useLanguage()
  const d = (key: keyof typeof heroDict) => getDictValue(heroDict[key], lang)

  return (
    <div className="glass-card overflow-hidden">
      {/* Header Section with Profile */}
      <div className="px-8 py-6 border-b border-white/5">
        <div className="flex flex-row items-start gap-6">
          {/* Profile Image */}
          <Image
            src="/images/profile.webp"
            className="w-32 h-32 rounded-full border-4 border-neutral-800 shadow-md"
            alt="profile"
            width={150}
            height={150}
            priority
          />

          {/* Name and Title */}
          <div className="flex-1 text-left">
            <h1 className="text-3xl font-bold text-gray-100 mb-1">{d('이름')}</h1>
            <p className="text-xl text-gray-300 mb-3">{d('jobTitle')}</p>

            {/* Primary Contact */}
            <div className="flex flex-col sm:flex-row gap-3 text-sm">
              <ContactLink href="tel:010-4948-5089" icon={ICONS.phone}>
                +82 10-4948-5089
              </ContactLink>
              <span className="hidden sm:inline text-neutral-600">|</span>
              <ContactLink href="mailto:zzz1577@naver.com" icon={ICONS.email}>
                zzz1577@naver.com
              </ContactLink>
            </div>
          </div>

          {/* Quick Status Badge */}
          <div className="ml-auto">
            <span className="status-badge-glow">
              <span className="relative flex w-2 h-2 mr-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex w-full rounded-full bg-emerald-400" />
              </span>
              {d('availableStatus')}
            </span>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Column 1: Basic Information */}
          <InfoSection title={d('basicInfoTitle')}>
            <InfoItem label={d('birthLabel')}>{d('생일')}</InfoItem>
            <InfoItem label={d('locationLabel')}>{d('주소')}</InfoItem>
            <InfoItem label={d('interestsLabel')}>{d('interests')}</InfoItem>
          </InfoSection>

          {/* Column 2: Contact & Links */}
          <InfoSection title={d('other')}>
            <InfoItem>
              <div className="space-y-1 mt-2">
                {socialLinks.map((link) => (
                  <SocialLink key={link.href} {...link} />
                ))}
              </div>
            </InfoItem>
          </InfoSection>
        </div>
      </div>
    </div>
  )
}
