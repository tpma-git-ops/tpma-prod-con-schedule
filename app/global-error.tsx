'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAFAF9',
          color: '#262626',
          fontFamily:
            'Poppins, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <header style={{ backgroundColor: '#29303E', color: '#FFFFFF' }}>
          <div
            style={{
              maxWidth: 768,
              margin: '0 auto',
              padding: '24px 16px',
            }}
          >
            <p
              style={{
                color: '#FFCF60',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                margin: '0 0 4px',
              }}
            >
              May 28, 2026
            </p>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 28,
                fontWeight: 700,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Toronto Product Con
            </h1>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '64px 16px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 420, width: '100%' }}>
            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 28,
                fontWeight: 700,
                margin: 0,
                color: '#29303E',
              }}
            >
              The app couldn&apos;t load
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: 15,
                lineHeight: 1.5,
                color: 'rgba(41, 48, 62, 0.65)',
              }}
            >
              Something went wrong starting up the schedule. Try reloading — if it keeps happening,
              please let an organizer know.
            </p>

            {error.digest && (
              <p
                style={{
                  marginTop: 16,
                  fontSize: 11,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  color: 'rgba(41, 48, 62, 0.4)',
                }}
              >
                Reference: {error.digest}
              </p>
            )}

            <div
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={reset}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 9999,
                  padding: '10px 24px',
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: '#29303E',
                  color: '#FFFFFF',
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: 9999,
                  padding: '10px 24px',
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: '#FFFFFF',
                  color: '#29303E',
                  border: '1px solid #E7E5E4',
                  textDecoration: 'none',
                }}
              >
                Back to schedule
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
