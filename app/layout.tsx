import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Toronto Product Con 2026 - Schedule',
  description: 'Conference schedule for Toronto Product Con 2026 at TMU Ted Rogers School of Management.',
  openGraph: {
    title: 'Toronto Product Con 2026 - Schedule',
    description: 'May 28, 2026 at TMU Ted Rogers School of Management',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-stone-50">
        {children}
      </body>
    </html>
  )
}
