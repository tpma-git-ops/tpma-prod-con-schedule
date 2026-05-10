import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Poppins } from 'next/font/google'
import {
  getSiteUrl,
  organizationName,
  organizationUrl,
  siteDescription,
  siteName,
  siteShortDescription,
  siteTitle,
  socialImage,
} from '@/lib/siteMetadata'
import './globals.css'

const siteUrl = getSiteUrl()

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: organizationName,
      url: organizationUrl,
    },
    {
      '@type': 'Event',
      '@id': `${siteUrl}/#event`,
      name: siteName,
      description: siteDescription,
      startDate: '2026-05-28',
      endDate: '2026-05-28',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: 'TMU Ted Rogers School of Management',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Toronto',
          addressRegion: 'ON',
          addressCountry: 'CA',
        },
      },
      organizer: { '@id': `${siteUrl}/#organization` },
      image: `${siteUrl}${socialImage.url}`,
    },
  ],
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  referrer: 'strict-origin-when-cross-origin',
  keywords: [
    'Toronto Product Con',
    'Toronto Product Con 2026',
    'TPMA',
    'Toronto Product Management Association',
    'Toronto Product Con schedule',
    'conference schedule',
    'Toronto',
    'product management',
    '2026',
  ],
  authors: [{ name: organizationName, url: organizationUrl }],
  creator: organizationName,
  publisher: organizationName,
  category: 'conference',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: '/',
    siteName,
    title: siteTitle,
    description: siteShortDescription,
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteShortDescription,
    images: [socialImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA" className={poppins.variable}>
      <body className="min-h-screen bg-stone-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
