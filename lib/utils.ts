import { Session, TimeBlock } from './types'

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} - ${formatTime(end)}`
}

export function groupSessionsIntoTimeBlocks(sessions: Session[]): TimeBlock[] {
  const blockMap = new Map<string, Session[]>()

  // Sort sessions by sort_order first
  const sorted = [...sessions].sort((a, b) => a.sort_order - b.sort_order)

  for (const session of sorted) {
    const key = `${session.start_time}-${session.end_time}`
    if (!blockMap.has(key)) {
      blockMap.set(key, [])
    }
    blockMap.get(key)!.push(session)
  }

  const blocks: TimeBlock[] = []

  for (const [key, blockSessions] of Array.from(blockMap.entries())) {
    const [start_time, end_time] = key.split('-')
    const isFullWidth = blockSessions.every(s => s.is_full_width)
    blocks.push({
      start_time,
      end_time,
      sessions: blockSessions,
      is_full_width: isFullWidth,
    })
  }

  // Sort blocks by start_time, then by the minimum sort_order in each block
  blocks.sort((a, b) => {
    const timeCompare = a.start_time.localeCompare(b.start_time)
    if (timeCompare !== 0) return timeCompare
    const aMin = Math.min(...a.sessions.map(s => s.sort_order))
    const bMin = Math.min(...b.sessions.map(s => s.sort_order))
    return aMin - bMin
  })

  return blocks
}

export function getDurationMinutes(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return (eh * 60 + em) - (sh * 60 + sm)
}
