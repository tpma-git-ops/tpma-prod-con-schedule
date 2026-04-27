'use client'

import { useState } from 'react'
import { Session, ROOM_COLORS, ROOM_COLORS_LIGHT, SESSION_TYPE_LABELS } from '@/lib/types'

interface SessionCardProps {
  session: Session
  compact?: boolean
}

const ROOM_DOT_COLORS: Record<string, string> = {
  'Auditorium': 'bg-tpma-blue',
  'Room 2': 'bg-tpma-coral',
  'Room 3': 'bg-tpma-gold',
  'Room 4': 'bg-emerald-500',
  'Lunch Room': 'bg-tpma-dark',
}

export function SessionCard({ session, compact = false }: SessionCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasDetails = session.description || (session.session_speakers && session.session_speakers.length > 0)
  const isKeynote = session.session_type === 'keynote'
  const borderColor = ROOM_COLORS_LIGHT[session.room] || 'bg-stone-50 border-stone-200'

  const speakers = session.session_speakers
    ?.sort((a, b) => a.display_order - b.display_order) || []

  const moderators = speakers.filter(s => s.role === 'moderator')
  const panelists = speakers.filter(s => s.role === 'panelist')
  const regularSpeakers = speakers.filter(s => s.role === 'speaker')

  return (
    <div
      className={`
        session-card border-l-[3px] px-3 py-2.5
        ${borderColor}
        ${hasDetails ? 'session-card-interactive' : ''}
        ${isKeynote ? 'border-l-tpma-blue bg-indigo-50/80' : ''}
        ${expanded ? 'shadow-sm' : ''}
      `}
      onClick={() => hasDetails && setExpanded(!expanded)}
    >
      {/* Top row: room + type */}
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-2 h-2 rounded-full shrink-0 ${ROOM_DOT_COLORS[session.room] || 'bg-stone-400'}`} />
        <span className="text-[11px] text-tpma-dark/50 font-medium">
          {session.room}
        </span>
        {session.session_type !== 'talk' && SESSION_TYPE_LABELS[session.session_type] && (
          <>
            <span className="text-tpma-dark/20">·</span>
            <span className="text-[11px] text-tpma-dark/40">
              {SESSION_TYPE_LABELS[session.session_type]}
            </span>
          </>
        )}
        {hasDetails && (
          <svg
            className={`w-3 h-3 ml-auto text-tpma-dark/30 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>

      {/* Title */}
      <h3 className={`
        font-cirka font-bold leading-tight
        ${isKeynote ? 'text-base text-tpma-dark' : 'text-sm text-tpma-dark'}
        ${compact ? 'text-sm' : ''}
      `}>
        {session.title}
      </h3>

      {/* Speaker names (always visible) */}
      {speakers.length > 0 && (
        <div className="mt-1">
          {regularSpeakers.length > 0 && (
            <p className="text-xs text-tpma-dark/60">
              {regularSpeakers.map(s => s.speakers.name).join(' & ')}
              {regularSpeakers[0]?.speakers.company && (
                <span className="text-tpma-dark/40"> · {regularSpeakers[0].speakers.company}</span>
              )}
            </p>
          )}
          {moderators.length > 0 && (
            <p className="text-xs text-tpma-dark/60">
              <span className="text-tpma-dark/40">Moderated by </span>
              {moderators.map(s => s.speakers.name).join(', ')}
            </p>
          )}
          {panelists.length > 0 && (
            <p className="text-xs text-tpma-dark/40 mt-0.5">
              {panelists.map(s => s.speakers.name).join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Expanded details */}
      {expanded && hasDetails && (
        <div className="mt-3 pt-3 border-t border-stone-200/60">
          {session.description && (
            <p className="text-xs text-tpma-dark/60 leading-relaxed">
              {session.description}
            </p>
          )}

          {/* Speaker details */}
          {speakers.length > 0 && (
            <div className="mt-3 space-y-2">
              {speakers.map((ss) => (
                <div key={ss.id} className="flex items-start gap-2">
                  {ss.speakers.photo_url ? (
                    <img
                      src={ss.speakers.photo_url}
                      alt={ss.speakers.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-tpma-dark/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-tpma-dark/40">
                        {ss.speakers.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-tpma-dark">
                        {ss.speakers.name}
                      </span>
                      {ss.speakers.linkedin_url && (
                        <a
                          href={ss.speakers.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tpma-blue hover:text-tpma-blue/80"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    {(ss.speakers.title || ss.speakers.company) && (
                      <p className="text-[11px] text-tpma-dark/40">
                        {[ss.speakers.title, ss.speakers.company].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
