export type SessionType = 'keynote' | 'talk' | 'panel' | 'break' | 'lunch' | 'unconference' | 'afterparty' | 'registration' | 'sponsor' | 'announcement'

export type SessionStatus = 'draft' | 'published'

export type SpeakerRole = 'speaker' | 'moderator' | 'panelist' | 'host'

export interface Speaker {
  id: string
  name: string
  title: string | null
  company: string | null
  photo_url: string | null
  linkedin_url: string | null
}

export interface SessionSpeaker {
  id: string
  speaker_id: string
  role: SpeakerRole
  display_order: number
  speakers: Speaker
}

export interface Session {
  id: string
  title: string
  description: string | null
  room: string
  start_time: string
  end_time: string
  session_type: SessionType
  status: SessionStatus
  sort_order: number
  is_full_width: boolean
  created_at: string
  updated_at: string
  session_speakers: SessionSpeaker[]
}

export interface TimeBlock {
  start_time: string
  end_time: string
  sessions: Session[]
  is_full_width: boolean
}

export const ROOMS = ['Auditorium', 'Room 2', 'Room 3', 'Room 4', 'Lunch Room'] as const
export type Room = typeof ROOMS[number]

/** Filter pill label “Unconf” — selects unconference sessions across breakout rooms (not Lunch Room venue only). */
export const ROOM_TAB_UNCONFERENCE: Room = 'Lunch Room'

export interface RoomStyle {
  dot: string
  tint: string
  border: string
  text: string
}

export const ROOM_STYLES: Record<Room, RoomStyle> = {
  'Auditorium': {
    dot: 'bg-tpma-blue',
    tint: 'bg-indigo-50',
    border: 'border-indigo-200 border-l-tpma-blue',
    text: 'text-indigo-700',
  },
  'Room 2': {
    dot: 'bg-tpma-coral',
    tint: 'bg-red-50',
    border: 'border-red-200 border-l-tpma-coral',
    text: 'text-red-700',
  },
  'Room 3': {
    dot: 'bg-tpma-gold',
    tint: 'bg-amber-50',
    border: 'border-amber-200 border-l-tpma-gold',
    text: 'text-amber-700',
  },
  'Room 4': {
    dot: 'bg-emerald-500',
    tint: 'bg-emerald-50',
    border: 'border-emerald-200 border-l-emerald-500',
    text: 'text-emerald-700',
  },
  'Lunch Room': {
    dot: 'bg-tpma-dark',
    tint: 'bg-slate-50',
    border: 'border-slate-200 border-l-tpma-dark',
    text: 'text-slate-700',
  },
}

export const DEFAULT_ROOM_STYLE: RoomStyle = {
  dot: 'bg-stone-400',
  tint: 'bg-stone-50',
  border: 'border-stone-200 border-l-stone-300',
  text: 'text-stone-600',
}

export function getRoomStyle(room: string): RoomStyle {
  return room in ROOM_STYLES ? ROOM_STYLES[room as Room] : DEFAULT_ROOM_STYLE
}

export const SESSION_TYPE_LABELS: Record<SessionType, string> = {
  keynote: 'Keynote',
  talk: 'Talk',
  panel: 'Panel',
  break: 'Break',
  lunch: 'Lunch',
  unconference: 'Unconference',
  afterparty: 'Afterparty',
  registration: 'Registration',
  sponsor: 'Sponsor Session',
  announcement: '',
}
