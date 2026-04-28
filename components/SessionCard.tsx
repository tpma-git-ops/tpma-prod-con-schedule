'use client'

import { KeyboardEvent, MouseEvent, useId, useState } from 'react'
import { Session, SessionSpeaker, SESSION_TYPE_LABELS, getRoomStyle } from '@/lib/types'
import { isLinkedInProfileUrl } from '@/lib/speakerLinks'

interface SessionCardProps {
  session: Session
  compact?: boolean
  showRoom?: boolean
  canSave?: boolean
  isSaved?: boolean
  onToggleSavedSession?: (sessionId: string) => void
}

function cameFromNestedControl(target: EventTarget | null, currentTarget: HTMLDivElement) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const interactiveAncestor = target.closest('button, a')
  return interactiveAncestor !== null && interactiveAncestor !== currentTarget
}

function buildCompactSpeakerSummary(
  regularSpeakers: SessionSpeaker[],
  moderators: SessionSpeaker[],
  panelists: SessionSpeaker[],
  hosts: SessionSpeaker[],
  speakers: SessionSpeaker[]
) {
  if (regularSpeakers.length > 0) {
    return regularSpeakers.map((speaker) => speaker.speakers.name).join(' & ')
  }

  if (moderators.length > 0) {
    return `Moderated by ${moderators.map((speaker) => speaker.speakers.name).join(', ')}`
  }

  if (panelists.length > 0) {
    return `Panel: ${panelists.map((speaker) => speaker.speakers.name).join(', ')}`
  }

  if (hosts.length > 0) {
    return `Hosted by ${hosts.map((speaker) => speaker.speakers.name).join(', ')}`
  }

  return speakers.map((speaker) => speaker.speakers.name).join(', ')
}

export function SessionCard({
  session,
  compact = false,
  showRoom = true,
  canSave = false,
  isSaved = false,
  onToggleSavedSession,
}: SessionCardProps) {
  const [expanded, setExpanded] = useState(false)
  const titleId = useId()
  const detailsId = useId()
  const hasDetails = Boolean(session.description || session.session_speakers?.length)
  const isKeynote = session.session_type === 'keynote'
  const roomStyle = getRoomStyle(session.room)
  const sessionTypeLabel = SESSION_TYPE_LABELS[session.session_type]
  const showType = session.session_type !== 'talk' && Boolean(sessionTypeLabel)
  const showMetadata = showRoom || showType

  const speakers = [...(session.session_speakers || [])].sort((a, b) => a.display_order - b.display_order)

  const moderators = speakers.filter((speaker) => speaker.role === 'moderator')
  const panelists = speakers.filter((speaker) => speaker.role === 'panelist')
  const regularSpeakers = speakers.filter((speaker) => speaker.role === 'speaker')
  const hosts = speakers.filter((speaker) => speaker.role === 'host')
  const compactSpeakerSummary = buildCompactSpeakerSummary(
    regularSpeakers,
    moderators,
    panelists,
    hosts,
    speakers
  )

  const toggleExpanded = () => {
    if (!hasDetails) {
      return
    }

    setExpanded((currentExpanded) => !currentExpanded)
  }

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    if (cameFromNestedControl(event.target, event.currentTarget)) {
      return
    }

    toggleExpanded()
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (cameFromNestedControl(event.target, event.currentTarget)) {
      return
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    toggleExpanded()
  }

  return (
    <div
      className={`
        session-card relative overflow-hidden border-l-[3px]
        ${compact ? 'px-2.5 py-2' : 'px-3 py-2.5'}
        ${isKeynote ? 'border-indigo-200 border-l-tpma-blue bg-indigo-50/80' : `border-stone-200 bg-white ${roomStyle.cardBar}`}
        ${hasDetails ? 'session-card-interactive' : ''}
        ${expanded ? 'shadow-sm' : ''}
      `}
      role={hasDetails ? 'button' : undefined}
      tabIndex={hasDetails ? 0 : undefined}
      aria-expanded={hasDetails ? expanded : undefined}
      aria-controls={hasDetails ? detailsId : undefined}
      aria-labelledby={hasDetails ? titleId : undefined}
      onClick={hasDetails ? handleCardClick : undefined}
      onKeyDown={hasDetails ? handleCardKeyDown : undefined}
    >
      {isSaved && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-tpma-gold"
        />
      )}

      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3
            id={titleId}
            className={`
              font-cirka font-bold leading-tight tracking-tight text-tpma-dark
              ${isKeynote ? (compact ? 'text-base' : 'text-lg') : compact ? 'text-sm' : 'text-base'}
            `}
          >
            {session.title}
          </h3>

          {showMetadata && (
            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
              {showRoom && (
                <>
                  <span className={`h-2 w-2 shrink-0 rounded-full ${roomStyle.dot}`} />
                  <span className={`schedule-meta ${roomStyle.text}`}>
                    {session.room}
                  </span>
                </>
              )}
              {showRoom && showType && (
                <span className="schedule-meta-subtle">·</span>
              )}
              {showType && (
                isKeynote ? (
                  <span className="inline-flex items-center rounded-full bg-tpma-gold/25 px-1.5 py-0.5 text-3xs font-semibold uppercase tracking-[0.08em] text-tpma-dark">
                    {sessionTypeLabel}
                  </span>
                ) : (
                  <span className="schedule-meta-subtle">
                    {sessionTypeLabel}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 pl-2">
          {canSave && onToggleSavedSession && (
            <button
              type="button"
              aria-pressed={isSaved}
              aria-label={isSaved ? 'Remove from My Schedule' : 'Save to My Schedule'}
              title={isSaved ? 'Remove from My Schedule' : 'Save to My Schedule'}
              className={`
                rounded-full p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tpma-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50
                ${isSaved ? 'text-tpma-gold' : 'text-tpma-dark/20 hover:text-tpma-gold'}
              `}
              onClick={(event) => {
                event.stopPropagation()
                onToggleSavedSession(session.id)
              }}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill={isSaved ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.562.562 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.562.562 0 00-.182.557l1.285 5.387a.562.562 0 01-.84.61L12 17.77l-4.736 2.772a.562.562 0 01-.84-.61l1.285-5.387a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.562.562 0 00.475-.345l2.125-5.111z"
                />
              </svg>
            </button>
          )}

          {hasDetails && (
            <svg
              className={`h-3 w-3 text-tpma-dark/30 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </div>

      {speakers.length > 0 && (
        compact ? (
          <p className="mt-1 truncate text-xs text-tpma-dark/60">
            {compactSpeakerSummary}
          </p>
        ) : (
          <div className="mt-1">
            {regularSpeakers.length > 0 && (
              <p className="schedule-supporting">
                {regularSpeakers.map((speaker) => speaker.speakers.name).join(' & ')}
                {regularSpeakers[0]?.speakers.company && (
                  <span className="schedule-supporting-subtle"> · {regularSpeakers[0].speakers.company}</span>
                )}
              </p>
            )}
            {moderators.length > 0 && (
              <p className="schedule-supporting">
                <span className="schedule-supporting-subtle">Moderated by </span>
                {moderators.map((speaker) => speaker.speakers.name).join(', ')}
              </p>
            )}
            {panelists.length > 0 && (
              <p className="mt-0.5 schedule-supporting-subtle">
                {panelists.map((speaker) => speaker.speakers.name).join(', ')}
              </p>
            )}
          </div>
        )
      )}

      {expanded && hasDetails && (
        <div
          id={detailsId}
          className="mt-3 border-t border-stone-200/60 pt-3"
        >
          {speakers.length > 0 && (
            <div className="space-y-2">
              {speakers.map((sessionSpeaker) => (
                <div key={sessionSpeaker.id} className="flex items-start gap-2">
                  {sessionSpeaker.speakers.photo_url ? (
                    <img
                      src={sessionSpeaker.speakers.photo_url}
                      alt={sessionSpeaker.speakers.name}
                      className="h-8 w-8 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tpma-dark/10">
                      <span className="text-xs font-medium text-tpma-dark/40">
                        {sessionSpeaker.speakers.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-tpma-dark">
                        {sessionSpeaker.speakers.name}
                      </span>
                      {sessionSpeaker.speakers.linkedin_url && (
                        <a
                          href={sessionSpeaker.speakers.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={isLinkedInProfileUrl(sessionSpeaker.speakers.linkedin_url) ? 'LinkedIn profile' : 'Speaker profile'}
                          aria-label={
                            isLinkedInProfileUrl(sessionSpeaker.speakers.linkedin_url)
                              ? 'LinkedIn profile'
                              : 'Speaker profile page'
                          }
                          className="rounded-full text-tpma-blue hover:text-tpma-blue/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-tpma-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {isLinkedInProfileUrl(sessionSpeaker.speakers.linkedin_url) ? (
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          ) : (
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5M10.5 13.5L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          )}
                        </a>
                      )}
                    </div>
                    {(sessionSpeaker.speakers.title || sessionSpeaker.speakers.company) && (
                      <p className="schedule-meta-subtle">
                        {[sessionSpeaker.speakers.title, sessionSpeaker.speakers.company].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {session.description && (
            <p className={`schedule-supporting ${speakers.length > 0 ? 'mt-3' : ''}`}>
              {session.description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
