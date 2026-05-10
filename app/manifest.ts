import type { MetadataRoute } from 'next'
import {
  siteDescription,
  siteName,
  siteShortDescription,
} from '@/lib/siteMetadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} Schedule`,
    short_name: 'TPC 2026',
    description: siteDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fafaf9',
    theme_color: '#171717',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'View schedule',
        short_name: 'Schedule',
        description: siteShortDescription,
        url: '/',
      },
    ],
  }
}
