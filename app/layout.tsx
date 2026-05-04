import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Poppins } from 'next/font/google'
import './globals.css'

const siteName = 'Toronto Product Con 2026'

/** Canonical site origin for metadata (OG/Twitter absolute URLs). Vercel sets VERCEL_URL; override with NEXT_PUBLIC_SITE_URL for a custom domain. */
function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

const siteUrl = getSiteUrl()

const longDescription =
  'Browse the Toronto Product Con 2026 conference schedule: sessions by time and room at TMU Ted Rogers School of Management on May 28, 2026. Presented by the Toronto Product Management Association (TPMA).'

const shortDescription =
  'Day-of schedule for Toronto Product Con 2026 — May 28 at TMU Ted Rogers School of Management.'

const ogImage = {
  url: '/og-tpc2026-schedule.png' as const,
  width: 1024,
  height: 576,
  alt: 'Stylized graphic of the CN Tower in Toronto with a yellow-to-purple gradient background and geometric white line overlays.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: longDescription,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Toronto Product Management Association',
      url: 'https://www.tpma.ca/',
    },
    {
      '@type': 'Event',
      '@id': `${siteUrl}/#event`,
      name: siteName,
      description: longDescription,
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
      image: `${siteUrl}${ogImage.url}`,
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
    default: `${siteName} — Schedule`,
    template: `%s | ${siteName}`,
  },
  description: longDescription,
  applicationName: siteName,
  keywords: [
    'Toronto Product Con',
    'TPMA',
    'Toronto Product Management Association',
    'conference schedule',
    'Toronto',
    'product management',
    '2026',
  ],
  authors: [{ name: 'Toronto Product Management Association', url: 'https://www.tpma.ca/' }],
  creator: 'Toronto Product Management Association',
  publisher: 'Toronto Product Management Association',
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
    title: `${siteName} — Schedule`,
    description: shortDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Schedule`,
    description: shortDescription,
    images: [ogImage.url],
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
