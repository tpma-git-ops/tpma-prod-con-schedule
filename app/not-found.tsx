import Link from 'next/link'

export default function NotFound() {
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
          <p className="text-white/75 text-sm mt-1 font-poppins">
            TMU Ted Rogers School of Management
          </p>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <p className="font-cirka text-7xl md:text-8xl font-bold text-tpma-dark/15 leading-none">
            404
          </p>
          <h2 className="font-cirka text-2xl md:text-3xl font-bold text-tpma-dark mt-4">
            We couldn&apos;t find that session
          </h2>
          <p className="text-tpma-dark/75 mt-3 text-sm md:text-base">
            The page you&apos;re looking for may have moved or doesn&apos;t exist. Head back to the
            schedule to see what&apos;s happening.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-tpma-dark px-6 py-2.5 text-sm font-semibold text-white hover:bg-tpma-dark/90 transition-colors"
            >
              Back to schedule
            </Link>
            <a
              href="https://www.tpma.ca/"
              className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-2.5 text-sm font-semibold text-tpma-dark hover:bg-stone-100 transition-colors"
            >
              Visit tpma.ca
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
