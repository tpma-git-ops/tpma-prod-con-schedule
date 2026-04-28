'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Session, Room } from '@/lib/types'
import { groupSessionsIntoTimeBlocks } from '@/lib/utils'
import {
  isSessionSaveable,
  readSavedSessionIds,
  reconcileSavedSessionIds,
  toggleSavedSessionId,
  writeSavedSessionIds,
} from '@/lib/savedSessions'
import { ScheduleTimeline } from '@/components/ScheduleTimeline'
import { RoomFilter } from '@/components/RoomFilter'

export default function SchedulePage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [hasLoadedSessions, setHasLoadedSessions] = useState(false)
  const [activeRoom, setActiveRoom] = useState<Room | 'All'>('All')
  const [savedSessionIds, setSavedSessionIds] = useState<string[]>([])
  const [hasHydratedSavedSessions, setHasHydratedSavedSessions] = useState(false)
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [supabase] = useState(() => createClient())

  const fetchSessions = useCallback(async () => {
    const { data, error } = await supabase
      .from('sessions')
      .select(`
        *,
        session_speakers (
          id,
          speaker_id,
          role,
          display_order,
          speakers (*)
        )
      `)
      .eq('status', 'published')
      .order('sort_order', { ascending: true })

    if (!error && data) {
      setSessions(data as Session[])
      setHasLoadedSessions(true)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    setSavedSessionIds(readSavedSessionIds())
    setHasHydratedSavedSessions(true)
  }, [])

  useEffect(() => {
    fetchSessions()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schedule-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sessions' },
        () => {
          fetchSessions()
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'session_speakers' },
        () => {
          fetchSessions()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchSessions, supabase])

  useEffect(() => {
    if (!hasHydratedSavedSessions || !hasLoadedSessions) {
      return
    }

    const availableSavedSessionIds = sessions
      .filter((session) => isSessionSaveable(session))
      .map((session) => session.id)

    setSavedSessionIds((currentSessionIds) => {
      const reconciledSessionIds = reconcileSavedSessionIds(currentSessionIds, availableSavedSessionIds)

      if (
        reconciledSessionIds.length === currentSessionIds.length &&
        reconciledSessionIds.every((sessionId, index) => sessionId === currentSessionIds[index])
      ) {
        return currentSessionIds
      }

      writeSavedSessionIds(reconciledSessionIds)
      return reconciledSessionIds
    })
  }, [hasHydratedSavedSessions, hasLoadedSessions, sessions])

  const toggleSavedSession = useCallback((sessionId: string) => {
    setSavedSessionIds((currentSessionIds) => {
      const nextSessionIds = toggleSavedSessionId(currentSessionIds, sessionId)
      writeSavedSessionIds(nextSessionIds)
      return nextSessionIds
    })
  }, [])

  const savedSessionIdSet = new Set(savedSessionIds)
  const savedSessionCount = savedSessionIds.length

  const roomFilteredSessions = activeRoom === 'All'
    ? sessions
    : sessions.filter((session) => session.is_full_width || session.room === activeRoom)

  const filteredSessions = showSavedOnly
    ? roomFilteredSessions.filter((session) => savedSessionIdSet.has(session.id))
    : roomFilteredSessions

  const timeBlocks = groupSessionsIntoTimeBlocks(filteredSessions)

  const emptyState = showSavedOnly
    ? savedSessionCount === 0
      ? {
          title: 'No saved sessions yet',
          description: 'Tap the star on any session to build your schedule.',
        }
      : activeRoom === 'All'
        ? {
            title: 'No saved sessions to show',
            description: 'Switch rooms or return to the full schedule.',
          }
        : {
            title: `No saved sessions in ${activeRoom}`,
            description: 'Try another room or return to the full schedule.',
          }
    : activeRoom === 'All'
      ? {
          title: 'No sessions to show',
          description: 'Check back soon for updates.',
        }
      : {
          title: `No sessions in ${activeRoom}`,
          description: 'Try another room or return to the full schedule.',
        }

  return (
    <main className="min-h-screen">
      {/* Header */}
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

      {/* Room Filter */}
      <div className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4">
          <RoomFilter activeRoom={activeRoom} onRoomChange={setActiveRoom} />
          <div className="flex items-center justify-between gap-3 pb-3 -mt-1">
            <p className="text-[11px] text-tpma-dark/45 font-medium">
              {savedSessionCount > 0 ? `${savedSessionCount} saved` : 'Star sessions to save them'}
            </p>
            <button
              type="button"
              onClick={() => setShowSavedOnly((currentValue) => !currentValue)}
              aria-pressed={showSavedOnly}
              className={`
                inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors
                ${showSavedOnly
                  ? 'border-tpma-dark bg-tpma-dark text-white'
                  : 'border-stone-200 bg-white text-tpma-dark hover:bg-stone-100'
                }
              `}
            >
              <svg
                className={`h-3.5 w-3.5 ${showSavedOnly ? 'text-tpma-gold' : 'text-tpma-dark/60'}`}
                viewBox="0 0 24 24"
                fill={showSavedOnly ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.562.562 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.562.562 0 00-.182.557l1.285 5.387a.562.562 0 01-.84.61L12 17.77l-4.736 2.772a.562.562 0 01-.84-.61l1.285-5.387a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.562.562 0 00.475-.345l2.125-5.111z"
                />
              </svg>
              My Schedule
              <span
                className={`
                  rounded-full px-1.5 py-0.5 text-[10px] leading-none
                  ${showSavedOnly ? 'bg-white/15 text-white' : 'bg-stone-100 text-tpma-dark/60'}
                `}
              >
                {savedSessionCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="max-w-3xl mx-auto px-4 py-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-tpma-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : timeBlocks.length === 0 ? (
          <div className="text-center py-20 text-tpma-dark/40">
            <p className="text-lg font-cirka">{emptyState.title}</p>
            <p className="text-sm mt-1">{emptyState.description}</p>
          </div>
        ) : (
          <ScheduleTimeline
            timeBlocks={timeBlocks}
            activeRoom={activeRoom}
            savedSessionIdSet={savedSessionIdSet}
            onToggleSavedSession={toggleSavedSession}
          />
        )}
      </div>
    </main>
  )
}
