export const siteName = 'Toronto Product Con 2026'
export const siteTitle = `${siteName} Schedule`
export const siteDescription =
  'Browse the official Toronto Product Con 2026 schedule for sessions by time and room at TMU Ted Rogers School of Management on May 28, 2026.'
export const siteShortDescription =
  'Official day-of schedule for Toronto Product Con 2026, presented by TPMA on May 28 at TMU Ted Rogers School of Management.'

export const organizationName = 'Toronto Product Management Association'
export const organizationUrl = 'https://www.tpma.ca/'

export const socialImage = {
  url: '/tpc2026-schedule-social.jpg',
  width: 1024,
  height: 576,
  alt: 'Toronto Product Con schedule graphic with the CN Tower and Toronto Product Con Schedule text.',
} as const

/** Canonical site origin for metadata. Override with NEXT_PUBLIC_SITE_URL for a custom domain. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}
