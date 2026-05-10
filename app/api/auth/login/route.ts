import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function createAuthClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key environment variable.')
  }

  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
}

function getAuthCallbackOrigin(request: Request) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (configuredSiteUrl) return configuredSiteUrl

  const requestUrl = new URL(request.url)
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
  const forwardedProto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ||
    requestUrl.protocol.replace(/:$/, '')

  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`

  return requestUrl.origin
}

function getErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status?: unknown }).status
    if (typeof status === 'number') return status
  }

  return undefined
}

export async function POST(request: Request) {
  let email: unknown

  try {
    const body = await request.json()
    email = body?.email
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const normalizedEmail = email.trim().toLowerCase()
  let supabase: ReturnType<typeof createAuthClient>

  try {
    supabase = createAuthClient()
  } catch (error) {
    console.error('Supabase auth client configuration failed:', error)
    return NextResponse.json({ error: 'Unable to send login link.' }, { status: 500 })
  }

  const { data: isAdmin, error: lookupError } = await supabase.rpc('is_admin_email', {
    candidate_email: normalizedEmail,
  })

  if (lookupError) {
    console.error('Admin email lookup failed:', lookupError)
    return NextResponse.json({ error: 'Unable to send login link.' }, { status: 500 })
  }

  // Use the same response for non-admin addresses to avoid account enumeration.
  if (!isAdmin) {
    return NextResponse.json({ ok: true })
  }

  const origin = getAuthCallbackOrigin(request)
  const { error } = await supabase.auth.signInWithOtp({
    email: normalizedEmail,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  })

  if (error) {
    console.error('Magic-link send failed:', error)

    if (getErrorStatus(error) === 429) {
      return NextResponse.json(
        { error: 'Too many login links requested. Wait a few minutes and try again.' },
        { status: 429 }
      )
    }

    return NextResponse.json({ error: 'Unable to send login link.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
