'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Pill } from '@/components/Pill'
import { createClient } from '@/lib/supabase-browser'
import { Session, Room, ROOM_TAB_UNCONFERENCE } from '@/lib/types'
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

export default function SchedulePageClient() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [hasLoadedSessions, setHasLoadedSessions] = useState(false)
  const [activeRoom, setActiveRoom] = useState<Room | 'All'>('All')
  const [savedSessionIds, setSavedSessionIds] = useState<string[]>([])
  const [hasHydratedSavedSessions, setHasHydratedSavedSessions] = useState(false)
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [hasScrolledPastFilters, setHasScrolledPastFilters] = useState(false)
  const [supabase] = useState(() => createClient())
  const stickyFilterSentinelRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    const sentinelElement = stickyFilterSentinelRef.current

    if (!sentinelElement) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      const updateShadowState = () => {
        setHasScrolledPastFilters(window.scrollY > 8)
      }

      updateShadowState()
      window.addEventListener('scroll', updateShadowState, { passive: true })

      return () => {
        window.removeEventListener('scroll', updateShadowState)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolledPastFilters(!entry.isIntersecting)
      },
      {
        rootMargin: '-8px 0px 0px 0px',
        threshold: 0,
      }
    )

    observer.observe(sentinelElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  const savedSessionIdSet = new Set(savedSessionIds)
  const savedSessionCount = savedSessionIds.length

  const roomFilteredSessions =
    activeRoom === 'All'
      ? sessions
      : activeRoom === ROOM_TAB_UNCONFERENCE
        ? sessions.filter(
            (session) =>
              session.session_type === 'unconference' || session.is_full_width,
          )
        : sessions.filter(
            (session) => session.is_full_width || session.room === activeRoom,
          )

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
            title:
              activeRoom === ROOM_TAB_UNCONFERENCE
                ? 'No saved unconference sessions to show'
                : `No saved sessions in ${activeRoom}`,
            description: 'Try another room or return to the full schedule.',
          }
    : activeRoom === 'All'
      ? {
          title: 'No sessions to show',
          description: 'Check back soon for updates.',
        }
        : {
            title:
              activeRoom === ROOM_TAB_UNCONFERENCE
                ? 'No unconference sessions to show'
                : `No sessions in ${activeRoom}`,
            description: 'Try another room or return to the full schedule.',
          }

  return (
    <main className="min-h-screen bg-[#F4F3EC]">
      {/* Header */}
      <header className="bg-tpma-dark text-white">
        <div className="max-w-3xl xl:max-w-7xl mx-auto px-4">
          {/* Utility row: brand + secondary link */}
          <div className="flex items-center justify-between gap-4 py-3 border-b border-white/10">
            <a
              href="https://www.tpma.ca"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Toronto Product Management Association"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tpma-gold focus-visible:ring-offset-2 focus-visible:ring-offset-tpma-dark"
            >
              <Image
                src="/tpma-logo-inverse.png"
                alt="Toronto Product Management Association"
                width={887}
                height={434}
                priority
                className="w-20 md:w-24 h-auto"
              />
            </a>
            <a
              href="https://www.tpma.ca/conference/toronto-product-conference"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-white/70 hover:text-tpma-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tpma-gold focus-visible:ring-offset-2 focus-visible:ring-offset-tpma-dark transition-colors"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M8.5 5.5 4 10m0 0 4.5 4.5M4 10h9a3 3 0 0 0 0-6h-1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Conference Home</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>

          {/* Hero row: page identity + primary CTA */}
          <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <p className="schedule-eyebrow text-tpma-gold mb-2">
                May 28, 2026
              </p>
              <h1 className="font-cirka text-3xl md:text-4xl font-bold tracking-tight">
                Toronto Product Con
              </h1>
              <p className="text-white/70 text-sm mt-1.5 font-poppins">
                TMU Ted Rogers School of Management
              </p>
            </div>
            <a
              href="https://luma.com/torontoproductcon?utm_campaign=tpma_product_con_2026&utm_medium=referral&utm_source=tpma_schedule"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 self-start sm:self-end items-center gap-1.5 rounded-[25px] bg-tpma-gold px-4 py-2 text-sm font-semibold text-tpma-dark hover:bg-tpma-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tpma-gold focus-visible:ring-offset-2 focus-visible:ring-offset-tpma-dark transition-colors"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M3 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4V7Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 6v2M9 11v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span>Tickets</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Room Filter */}
      <div ref={stickyFilterSentinelRef} aria-hidden="true" className="pointer-events-none h-px w-full -mb-px" />
      <div
        className={`
          sticky top-0 z-30 border-b border-stone-200 bg-[#F4F3EC]/95 backdrop-blur-sm transition-shadow duration-200
          ${hasScrolledPastFilters ? 'shadow-[0_12px_24px_-20px_rgba(15,23,42,0.45)]' : 'shadow-none'}
        `}
      >
        <div className="max-w-3xl xl:max-w-7xl mx-auto px-4">
          <RoomFilter activeRoom={activeRoom} onRoomChange={setActiveRoom} />
          <div className="flex items-center justify-between gap-3 pb-3 -mt-1">
            <p className="min-w-0 text-2xs font-medium leading-tight text-tpma-dark/80">
              {savedSessionCount > 0 ? `${savedSessionCount} saved` : 'Star sessions to save them'}
            </p>
            <Pill
              onClick={() => setShowSavedOnly((currentValue) => !currentValue)}
              aria-pressed={showSavedOnly}
              isActive={showSavedOnly}
              leadingVisual={(
                <svg
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 ${showSavedOnly ? 'text-tpma-gold' : 'text-tpma-dark/75'}`}
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
              )}
              label="My Schedule"
              trailingVisual={(
                <span
                  className={`
                    schedule-counter rounded-full px-1.5 py-0.5
                    ${showSavedOnly ? 'bg-white/15 text-white' : 'bg-stone-100 text-tpma-dark/80'}
                  `}
                >
                  {savedSessionCount}
                </span>
              )}
            />
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="max-w-3xl xl:max-w-7xl mx-auto px-4 py-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-tpma-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : timeBlocks.length === 0 ? (
          <div className="text-center py-20 text-tpma-dark/55">
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
