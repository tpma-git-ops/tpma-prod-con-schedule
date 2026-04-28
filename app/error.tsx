'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-tpma-dark text-white">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-tpma-gold text-xs font-poppins font-semibold tracking-widest uppercase mb-1">
            May 28, 2026
          </p>
          <h1 className="font-cirka text-2xl md:text-3xl font-bold tracking-tight">
            Toronto Product Con
          </h1>
          <p className="text-white/60 text-sm mt-1 font-poppins">
            TMU Ted Rogers School of Management
          </p>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-tpma-coral/10 text-tpma-coral mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          <h2 className="font-cirka text-2xl md:text-3xl font-bold text-tpma-dark">
            Something went sideways
          </h2>
          <p className="text-tpma-dark/60 mt-3 text-sm md:text-base">
            We hit an unexpected hiccup loading this part of the schedule. You can try again, or
            head back to the main agenda.
          </p>

          {error.digest && (
            <p className="mt-4 text-[11px] text-tpma-dark/40 font-mono">
              Reference: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full bg-tpma-dark px-6 py-2.5 text-sm font-semibold text-white hover:bg-tpma-dark/90 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-2.5 text-sm font-semibold text-tpma-dark hover:bg-stone-100 transition-colors"
            >
              Back to schedule
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
