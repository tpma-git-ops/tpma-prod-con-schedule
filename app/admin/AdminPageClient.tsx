'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { Session, Speaker, ROOMS, SessionType } from '@/lib/types'
import { formatTime } from '@/lib/utils'
import { SessionEditor } from '@/components/admin/SessionEditor'
import { SpeakerManager } from '@/components/admin/SpeakerManager'

type Tab = 'sessions' | 'speakers'

export default function AdminPageClient() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [showNewSession, setShowNewSession] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('sessions')
  const supabase = createClient()
  const router = useRouter()

  // Check auth
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      setAuthenticated(true)
    }
    checkAuth()
  }, [supabase, router])

  const fetchData = useCallback(async () => {
    const [sessionsRes, speakersRes] = await Promise.all([
      supabase
        .from('sessions')
        .select(`*, session_speakers (id, speaker_id, role, display_order, speakers (*))`)
        .order('sort_order', { ascending: true }),
      supabase
        .from('speakers')
        .select('*')
        .order('name', { ascending: true }),
    ])

    if (sessionsRes.data) setSessions(sessionsRes.data as Session[])
    if (speakersRes.data) setSpeakers(speakersRes.data as Speaker[])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    if (authenticated) fetchData()
  }, [authenticated, fetchData])

  const toggleStatus = async (session: Session) => {
    const newStatus = session.status === 'published' ? 'draft' : 'published'
    await supabase.from('sessions').update({ status: newStatus }).eq('id', session.id)
    fetchData()
  }

  const deleteSession = async (id: string) => {
    if (!confirm('Delete this session?')) return
    await supabase.from('sessions').delete().eq('id', id)
    fetchData()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-tpma-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-cirka text-lg font-bold text-tpma-dark">Schedule Admin</h1>
            <p className="text-[11px] text-tpma-dark/40">TPC 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="text-xs text-tpma-blue hover:underline"
            >
              View live
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-tpma-dark/40 hover:text-tpma-dark"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 flex gap-4">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'sessions'
                ? 'border-tpma-blue text-tpma-dark'
                : 'border-transparent text-tpma-dark/40 hover:text-tpma-dark/60'
            }`}
          >
            Sessions ({sessions.length})
          </button>
          <button
            onClick={() => setActiveTab('speakers')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'speakers'
                ? 'border-tpma-blue text-tpma-dark'
                : 'border-transparent text-tpma-dark/40 hover:text-tpma-dark/60'
            }`}
          >
            Speakers ({speakers.length})
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {activeTab === 'sessions' && (
          <>
            {/* Action bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-tpma-dark/40">
                {sessions.filter(s => s.status === 'draft').length} draft ·{' '}
                {sessions.filter(s => s.status === 'published').length} published
              </p>
              <button
                onClick={() => setShowNewSession(true)}
                className="px-3 py-1.5 bg-tpma-blue text-white text-xs font-medium rounded-lg
                  hover:bg-tpma-blue/90 transition-colors"
              >
                + Add Session
              </button>
            </div>

            {/* Sessions list */}
            <div className="space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg border
                    transition-colors hover:bg-stone-50
                    ${session.status === 'draft' ? 'border-amber-200 bg-amber-50/30' : 'border-stone-100'}
                  `}
                >
                  {/* Status toggle */}
                  <button
                    onClick={() => toggleStatus(session)}
                    className={`
                      w-9 h-5 rounded-full relative transition-colors shrink-0
                      ${session.status === 'published' ? 'bg-emerald-500' : 'bg-stone-300'}
                    `}
                    title={session.status === 'published' ? 'Click to unpublish' : 'Click to publish'}
                  >
                    <span className={`
                      absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform
                      ${session.status === 'published' ? 'left-[18px]' : 'left-0.5'}
                    `} />
                  </button>

                  {/* Session info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-tpma-dark/40 font-mono w-20 shrink-0">
                        {formatTime(session.start_time)}
                      </span>
                      <span className="text-sm font-medium text-tpma-dark truncate">
                        {session.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-tpma-dark/40">{session.room}</span>
                      <span className="text-tpma-dark/20">·</span>
                      <span className="text-[11px] text-tpma-dark/40">{session.session_type}</span>
                      {session.session_speakers?.length > 0 && (
                        <>
                          <span className="text-tpma-dark/20">·</span>
                          <span className="text-[11px] text-tpma-dark/40">
                            {session.session_speakers.map(ss => ss.speakers.name).join(', ')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setEditingSession(session)}
                      className="p-1.5 text-tpma-dark/30 hover:text-tpma-blue rounded transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="p-1.5 text-tpma-dark/30 hover:text-red-500 rounded transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'speakers' && (
          <SpeakerManager speakers={speakers} onUpdate={fetchData} />
        )}
      </div>

      {/* Edit/New Session Modal */}
      {(editingSession || showNewSession) && (
        <SessionEditor
          session={editingSession}
          speakers={speakers}
          onClose={() => {
            setEditingSession(null)
            setShowNewSession(false)
          }}
          onSave={() => {
            setEditingSession(null)
            setShowNewSession(false)
            fetchData()
          }}
        />
      )}
    </main>
  )
}
