'use client'

import { TimeBlock, Room } from '@/lib/types'
import { isSessionSaveable } from '@/lib/savedSessions'
import { formatTime, getDurationMinutes } from '@/lib/utils'
import { SessionCard } from './SessionCard'

interface ScheduleTimelineProps {
  timeBlocks: TimeBlock[]
  activeRoom: Room | 'All'
  savedSessionIdSet: Set<string>
  onToggleSavedSession: (sessionId: string) => void
}

export function ScheduleTimeline({
  timeBlocks,
  activeRoom,
  savedSessionIdSet,
  onToggleSavedSession,
}: ScheduleTimelineProps) {
  if (timeBlocks.length === 0) {
    return (
      <div className="text-center py-20 text-tpma-dark/40">
        <p className="text-lg font-cirka">No sessions to show</p>
        <p className="text-sm mt-1">Check back soon for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {timeBlocks.map((block, index) => (
        <TimeBlockRow
          key={`${block.start_time}-${block.end_time}-${index}`}
          block={block}
          activeRoom={activeRoom}
          savedSessionIdSet={savedSessionIdSet}
          onToggleSavedSession={onToggleSavedSession}
        />
      ))}
    </div>
  )
}

function TimeBlockRow({
  block,
  activeRoom,
  savedSessionIdSet,
  onToggleSavedSession,
}: {
  block: TimeBlock
  activeRoom: Room | 'All'
  savedSessionIdSet: Set<string>
  onToggleSavedSession: (sessionId: string) => void
}) {
  const isBreakType = block.sessions.every(
    s => ['break', 'lunch', 'registration', 'afterparty', 'announcement'].includes(s.session_type)
  )
  const duration = getDurationMinutes(block.start_time, block.end_time)

  // Full-width events (breaks, lunch, registration, afterparty)
  if (block.is_full_width || isBreakType) {
    const session = block.sessions[0]
    if (!session) return null

    const isBreak = session.session_type === 'break'
    const isAfterparty = session.session_type === 'afterparty'
    const isRegistration = session.session_type === 'registration'
    const isLunch = session.session_type === 'lunch'

    return (
      <div className={`
        flex items-center gap-3 py-3 px-4 my-2 rounded-lg
        ${isAfterparty ? 'bg-tpma-dark text-white' : ''}
        ${isRegistration ? 'bg-tpma-blue/5 border border-tpma-blue/20' : ''}
        ${isLunch ? 'bg-amber-50 border border-amber-200/60' : ''}
        ${isBreak ? 'border-b border-stone-100' : ''}
        ${session.session_type === 'announcement' ? 'bg-tpma-blue/5 border border-tpma-blue/20' : ''}
      `}>
        <span className={`time-label shrink-0 w-20 ${isAfterparty ? 'text-white/60' : ''}`}>
          {formatTime(block.start_time)}
        </span>
        <div className="flex-1 min-w-0">
          <span className={`
            text-sm font-medium
            ${isBreak ? 'text-tpma-dark/40' : ''}
            ${isAfterparty ? 'text-white font-cirka text-lg' : ''}
            ${isRegistration || isLunch ? 'text-tpma-dark' : ''}
          `}>
            {session.title}
          </span>
          {session.description && !isBreak && (
            <p className={`text-xs mt-0.5 ${isAfterparty ? 'text-white/60' : 'text-tpma-dark/50'}`}>
              {session.description}
            </p>
          )}
        </div>
        {!isBreak && (
          <span className={`text-xs shrink-0 ${isAfterparty ? 'text-white/40' : 'text-tpma-dark/30'}`}>
            {duration}m
          </span>
        )}
      </div>
    )
  }

  // Parallel session block
  const roomSessions = activeRoom === 'All'
    ? block.sessions.filter(s => !s.is_full_width)
    : block.sessions.filter(s => s.room === activeRoom)

  if (roomSessions.length === 0) return null

  return (
    <div className="py-2">
      {/* Time header */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className="time-label w-20 shrink-0">
          {formatTime(block.start_time)}
        </span>
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-xs text-tpma-dark/30">{duration}m</span>
      </div>

      {/* Session cards */}
      <div className="pl-0 md:pl-[88px]">
        <div className={`
          grid gap-2
          ${activeRoom === 'All' && roomSessions.length > 1
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1'
          }
        `}>
          {roomSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              compact={activeRoom === 'All' && roomSessions.length > 1}
              canSave={isSessionSaveable(session)}
              isSaved={savedSessionIdSet.has(session.id)}
              onToggleSavedSession={onToggleSavedSession}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
