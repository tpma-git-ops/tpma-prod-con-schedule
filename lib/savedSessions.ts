import type { Session } from './types'

export const SAVED_SESSIONS_STORAGE_KEY = 'tpma-schedule:saved-session-ids:v1'

function normalizeSavedSessionIds(sessionIds: string[]): string[] {
  return Array.from(
    new Set(sessionIds.filter((sessionId) => typeof sessionId === 'string' && sessionId.length > 0))
  )
}

export function isSessionSaveable(session: Pick<Session, 'is_full_width'>): boolean {
  return !session.is_full_width
}

export function readSavedSessionIds(): string[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(SAVED_SESSIONS_STORAGE_KEY)
    if (!rawValue) {
      return []
    }

    const parsedValue = JSON.parse(rawValue)
    if (!Array.isArray(parsedValue)) {
      return []
    }

    return normalizeSavedSessionIds(parsedValue)
  } catch {
    return []
  }
}

export function writeSavedSessionIds(sessionIds: string[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const normalizedIds = normalizeSavedSessionIds(sessionIds)

    if (normalizedIds.length === 0) {
      window.localStorage.removeItem(SAVED_SESSIONS_STORAGE_KEY)
      return
    }

    window.localStorage.setItem(SAVED_SESSIONS_STORAGE_KEY, JSON.stringify(normalizedIds))
  } catch {
    // Ignore storage failures so the schedule still works in private browsing or restrictive environments.
  }
}

export function toggleSavedSessionId(sessionIds: string[], sessionId: string): string[] {
  const normalizedIds = normalizeSavedSessionIds(sessionIds)

  if (normalizedIds.includes(sessionId)) {
    return normalizedIds.filter((savedSessionId) => savedSessionId !== sessionId)
  }

  return [...normalizedIds, sessionId]
}

export function reconcileSavedSessionIds(
  savedSessionIds: string[],
  availableSessionIds: string[]
): string[] {
  const availableSessionIdSet = new Set(availableSessionIds)

  return normalizeSavedSessionIds(savedSessionIds).filter((sessionId) =>
    availableSessionIdSet.has(sessionId)
  )
}
