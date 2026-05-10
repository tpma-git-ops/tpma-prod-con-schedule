import type { Metadata } from 'next'
import AdminPageClient from './AdminPageClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminPageClient />
}
