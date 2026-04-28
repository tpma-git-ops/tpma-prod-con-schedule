'use client'

import type { ReactNode } from 'react'
import { ROOM_TAB_UNCONFERENCE, type Session, type TimeBlock, type Room } from '@/lib/types'
import { isSessionSaveable } from '@/lib/savedSessions'
import { formatTime, getDurationMinutes } from '@/lib/utils'
import { SessionCard } from './SessionCard'

const FULL_WIDTH_EVENT_TYPES = new Set<Session['session_type']>([
  'break',
  'lunch',
  'registration',
  'afterparty',
  'announcement',
])

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
    <div className="schedule-timeline space-y-[var(--timeline-block-gap)]">
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
  const isBreakType = block.sessions.every((session) => FULL_WIDTH_EVENT_TYPES.has(session.session_type))
  const duration = getDurationMinutes(block.start_time, block.end_time)

  if (block.is_full_width || isBreakType) {
    const session = block.sessions[0]
    if (!session) return null

    const isBreak = session.session_type === 'break'
    const isAfterparty = session.session_type === 'afterparty'

    return (
      <TimelineBlockShell
        startTime={block.start_time}
        duration={duration}
        showDuration={!isBreak}
      >
        <div className={getFullWidthContentClassName(session.session_type)}>
          <span className={getFullWidthTitleClassName(session.session_type)}>
            {session.title}
          </span>
          {session.description && !isBreak && (
            <p className={`mt-1 ${isAfterparty ? 'schedule-supporting-inverse' : 'schedule-supporting'}`}>
              {session.description}
            </p>
          )}
        </div>
      </TimelineBlockShell>
    )
  }

  const roomSessions =
    activeRoom === 'All'
      ? block.sessions.filter((session) => !session.is_full_width)
      : activeRoom === ROOM_TAB_UNCONFERENCE
        ? block.sessions.filter((session) => session.session_type === 'unconference')
        : block.sessions.filter((session) => session.room === activeRoom)

  if (roomSessions.length === 0) return null

  return (
    <TimelineBlockShell
      startTime={block.start_time}
      duration={duration}
      showDuration
    >
      <div className="min-w-0">
        <div className={`
          grid gap-2
          ${(activeRoom === 'All' || activeRoom === ROOM_TAB_UNCONFERENCE) &&
          roomSessions.length > 1
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1'
          }
        `}>
          {roomSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              compact={
                (activeRoom === 'All' || activeRoom === ROOM_TAB_UNCONFERENCE) &&
                roomSessions.length > 1
              }
              showRoom={
                activeRoom === 'All' || activeRoom === ROOM_TAB_UNCONFERENCE
              }
              canSave={isSessionSaveable(session)}
              isSaved={savedSessionIdSet.has(session.id)}
              onToggleSavedSession={onToggleSavedSession}
            />
          ))}
        </div>
      </div>
    </TimelineBlockShell>
  )
}

function TimelineBlockShell({
  startTime,
  duration,
  showDuration,
  children,
}: {
  startTime: string
  duration: number
  showDuration: boolean
  children: ReactNode
}) {
  const formattedTime = formatTime(startTime)

  return (
    <div className="space-y-2 md:space-y-0">
      <div className="timeline-block-mobile-meta">
        <span className="time-label">{formattedTime}</span>
        {showDuration && <span className="time-duration">{duration}m</span>}
      </div>

      <div className="timeline-block-grid">
        <div className="timeline-block-desktop-time">
          <span className="time-label">{formattedTime}</span>
        </div>

        <div className="min-w-0">{children}</div>

        <div className="timeline-block-desktop-duration">
          {showDuration && <span className="time-duration">{duration}m</span>}
        </div>
      </div>
    </div>
  )
}

function getFullWidthContentClassName(sessionType: Session['session_type']) {
  const classNames = ['min-w-0']

  if (sessionType === 'break') {
    classNames.push('border-b', 'border-stone-100', 'py-3')
    return classNames.join(' ')
  }

  classNames.push('rounded-lg', 'border', 'px-4', 'py-3')

  if (sessionType === 'afterparty') {
    classNames.push('border-transparent', 'bg-tpma-dark', 'text-white')
  } else if (sessionType === 'registration') {
    classNames.push('border-stone-200', 'bg-stone-50')
  } else if (sessionType === 'lunch') {
    classNames.push('border-amber-200/60', 'bg-amber-50')
  } else if (sessionType === 'announcement') {
    classNames.push('border-tpma-blue/20', 'bg-tpma-blue/5')
  } else {
    classNames.push('border-stone-200', 'bg-white')
  }

  return classNames.join(' ')
}

function getFullWidthTitleClassName(sessionType: Session['session_type']) {
  if (sessionType === 'afterparty') {
    return 'block font-cirka text-lg font-bold text-white'
  }

  if (sessionType === 'break') {
    return 'block text-sm font-medium text-tpma-dark/40'
  }

  return 'block text-sm font-medium text-tpma-dark'
}
