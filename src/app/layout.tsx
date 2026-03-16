import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata, Viewport } from 'next'
import { galmuri11Bold, mona12 } from './fonts'
import {
  APPLICATION_NAME,
  APPLICATION_SHORT_NAME,
  AUTHOR,
  CANONICAL_URL,
  CATEGORY,
  DESCRIPTION,
  KEYWORDS,
  NEXT_PUBLIC_GA_ID,
  THEME_COLOR,
} from '../common/constants'
import { LayoutProps } from '../common/types'
import { LanguageProvider } from '../contexts/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: APPLICATION_NAME,
  description: DESCRIPTION,
  applicationName: APPLICATION_SHORT_NAME,
  authors: [{ url: '', name: AUTHOR }],
  generator: null,
  keywords: KEYWORDS,
  referrer: 'strict-origin-when-cross-origin',
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL_URL },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: APPLICATION_NAME,
    description: DESCRIPTION,
    type: 'website',
    url: CANONICAL_URL,
    siteName: APPLICATION_NAME,
    locale: 'ko_KR',
    images: [{ url: '/images/og-image.webp', alt: `${APPLICATION_SHORT_NAME} 로고` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/images/og-image.webp', alt: `${APPLICATION_SHORT_NAME} 로고` }],
  },
  appleWebApp: { title: APPLICATION_SHORT_NAME, capable: true, statusBarStyle: 'black' },
  formatDetection: { telephone: true, date: true, address: true, email: true, url: true },
  appLinks: { web: { url: CANONICAL_URL } },
  archives: CANONICAL_URL,
  assets: CANONICAL_URL,
  bookmarks: CANONICAL_URL,
  category: CATEGORY,
  classification: CATEGORY,
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color={THEME_COLOR} />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="subject" content={DESCRIPTION} />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>

      <body className={`${galmuri11Bold.variable} ${mona12.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  )
}
