'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Session, ROOMS, Room } from '@/lib/types'
import { groupSessionsIntoTimeBlocks } from '@/lib/utils'
import { ScheduleTimeline } from '@/components/ScheduleTimeline'
import { RoomFilter } from '@/components/RoomFilter'

export default function SchedulePage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRoom, setActiveRoom] = useState<Room | 'All'>('All')
  const supabase = createClient()

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
    }
    setLoading(false)
  }, [supabase])

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

  const filteredSessions = activeRoom === 'All'
    ? sessions
    : sessions.filter(s => s.is_full_width || s.room === activeRoom)

  const timeBlocks = groupSessionsIntoTimeBlocks(filteredSessions)

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
        </div>
      </div>

      {/* Schedule */}
      <div className="max-w-3xl mx-auto px-4 py-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-tpma-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ScheduleTimeline timeBlocks={timeBlocks} activeRoom={activeRoom} />
        )}
      </div>
    </main>
  )
}
