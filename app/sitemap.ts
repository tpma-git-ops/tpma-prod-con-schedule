import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
