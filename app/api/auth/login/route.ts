import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function createAuthClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
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
  const supabase = createAuthClient()
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

  const origin = new URL(request.url).origin
  const { error } = await supabase.auth.signInWithOtp({
    email: normalizedEmail,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  })

  if (error) {
    console.error('Magic-link send failed:', error)
    return NextResponse.json({ error: 'Unable to send login link.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
