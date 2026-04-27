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

export const ROOM_COLORS: Record<string, string> = {
  'Auditorium': 'bg-tpma-blue',
  'Room 2': 'bg-tpma-coral',
  'Room 3': 'bg-tpma-gold',
  'Room 4': 'bg-emerald-500',
  'Lunch Room': 'bg-tpma-dark',
}

export const ROOM_COLORS_LIGHT: Record<string, string> = {
  'Auditorium': 'bg-indigo-50 border-tpma-blue',
  'Room 2': 'bg-red-50 border-tpma-coral',
  'Room 3': 'bg-amber-50 border-tpma-gold',
  'Room 4': 'bg-emerald-50 border-emerald-500',
  'Lunch Room': 'bg-slate-50 border-tpma-dark',
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
