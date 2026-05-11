'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

const MAGIC_LINK_COOLDOWN_MS = 60_000
const MAGIC_LINK_COOLDOWN_KEY = 'tpcMagicLinkRequestedAt'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  const loginRequestInFlight = useRef(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const err = searchParams.get('error')
    if (err) setError(decodeURIComponent(err))
  }, [searchParams])

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')
    const authError = hashParams.get('error_description') || hashParams.get('error')

    if (authError) {
      window.history.replaceState(null, '', '/login')
      setError(authError)
      return
    }

    if (!accessToken || !refreshToken) return

    let cancelled = false

    const finishFragmentLogin = async () => {
      setLoading(true)
      setError('')

      const supabase = createClient()
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (cancelled) return

      if (sessionError) {
        window.history.replaceState(null, '', '/login')
        setError(sessionError.message)
        setLoading(false)
        return
      }

      window.history.replaceState(null, '', '/login')
      router.replace('/admin')
    }

    finishFragmentLogin()

    return () => {
      cancelled = true
    }
  }, [router])

  useEffect(() => {
    const updateCooldown = () => {
      const requestedAt = Number(window.localStorage.getItem(MAGIC_LINK_COOLDOWN_KEY))
      const remaining = requestedAt + MAGIC_LINK_COOLDOWN_MS - Date.now()
      setCooldownRemaining(Math.max(0, Math.ceil(remaining / 1000)))
    }

    updateCooldown()
    const intervalId = window.setInterval(updateCooldown, 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const startCooldown = () => {
    window.localStorage.setItem(MAGIC_LINK_COOLDOWN_KEY, Date.now().toString())
    setCooldownRemaining(Math.ceil(MAGIC_LINK_COOLDOWN_MS / 1000))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loginRequestInFlight.current || cooldownRemaining > 0) return

    loginRequestInFlight.current = true
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        if (response.status === 429) startCooldown()
        setError(body?.error || 'Unable to send login link.')
        return
      }

      startCooldown()
      setSent(true)
    } catch {
      setError('Unable to send login link.')
    } finally {
      loginRequestInFlight.current = false
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-cirka text-2xl font-bold text-tpma-dark">
            Schedule Admin
          </h1>
          <p className="text-sm text-tpma-dark/65 mt-1">
            Toronto Product Con 2026
          </p>
        </div>

        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <p className="text-sm text-emerald-800 font-medium">Check your email</p>
            <p className="text-xs text-emerald-600 mt-1">
              We sent a magic link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-tpma-dark/75 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm
                  focus:outline-none focus:ring-2 focus:ring-tpma-blue/30 focus:border-tpma-blue
                  placeholder:text-stone-300"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || cooldownRemaining > 0}
              className="w-full py-2 px-4 bg-tpma-dark text-white text-sm font-medium rounded-lg
                hover:bg-tpma-dark/90 transition-colors disabled:opacity-50"
            >
              {loading
                ? 'Sending...'
                : cooldownRemaining > 0
                  ? `Try again in ${cooldownRemaining}s`
                  : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

export default function LoginPageClient() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-4">
          <p className="text-sm text-tpma-dark/65">Loading…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
