import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '@once-ui-system/core/css/tokens.css'

import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { Providers } from '@/components/providers/Providers'
import { SiteJsonLd } from '@/components/seo/SiteJsonLd'
import { getBanner, getNavigation } from '@/lib/cms'
import { siteUrl } from '@/lib/env'
import { Analytics } from '@vercel/analytics/react'

import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#2f6fed',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Coop Tech | School of Cooperative Technical Education',
    template: '%s | Coop Tech',
  },
  description:
    'The School of Cooperative Technical Education provides half-day career and technical education for New York City students ages 17–21.',
  applicationName: 'Coop Tech',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Coop Tech',
    title: 'Coop Tech | School of Cooperative Technical Education',
    description:
      'Half-day CTE for NYC students ages 17–21. Learn a trade, earn industry certifications, and gain paid internship experience at Coop Tech.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coop Tech — School of Cooperative Technical Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coop Tech | School of Cooperative Technical Education',
    description:
      'Half-day CTE for NYC students ages 17–21. Learn a trade, earn industry certifications, and gain paid internship experience at Coop Tech.',
    images: ['/twitter-image.png'],
  },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [navigation, banner] = await Promise.all([getNavigation(), getBanner()])

  return (
    <html lang="en" className={sans.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen w-full bg-white font-sans antialiased" suppressHydrationWarning>
        <Analytics />
        <SiteJsonLd />
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header items={navigation.header} />
          <main id="main-content" className="w-full">
            {banner ? <AnnouncementBar banner={banner} /> : null}
            {children}
          </main>
          <Footer columns={navigation.footer} />
          <ScrollToTop />
          <Script
            src="https://cdn.jsdelivr.net/npm/sienna-accessibility/dist/sienna-accessibility.umd.js"
            strategy="afterInteractive"
          />
        </Providers>
      </body>
    </html>
  )
}
