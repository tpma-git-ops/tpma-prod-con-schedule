'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Session, Speaker, ROOMS, SessionType, SpeakerRole } from '@/lib/types'

interface SessionEditorProps {
  session: Session | null // null = new session
  speakers: Speaker[]
  onClose: () => void
  onSave: () => void
}

const SESSION_TYPES: SessionType[] = [
  'keynote', 'talk', 'panel', 'break', 'lunch',
  'unconference', 'afterparty', 'registration', 'sponsor', 'announcement',
]

const FULL_WIDTH_TYPES: SessionType[] = ['break', 'lunch', 'afterparty', 'registration', 'announcement']

export function SessionEditor({ session, speakers, onClose, onSave }: SessionEditorProps) {
  const isNew = !session
  const supabase = createClient()

  const [form, setForm] = useState({
    title: session?.title || '',
    description: session?.description || '',
    room: session?.room || 'Auditorium',
    start_time: session?.start_time?.slice(0, 5) || '09:00',
    end_time: session?.end_time?.slice(0, 5) || '09:30',
    session_type: (session?.session_type || 'talk') as SessionType,
    status: session?.status || 'draft',
    sort_order: session?.sort_order || 0,
    is_full_width: session?.is_full_width || false,
  })

  const [sessionSpeakers, setSessionSpeakers] = useState<
    { speaker_id: string; role: SpeakerRole; display_order: number }[]
  >(
    session?.session_speakers?.map(ss => ({
      speaker_id: ss.speaker_id,
      role: ss.role,
      display_order: ss.display_order,
    })) || []
  )

  const [saving, setSaving] = useState(false)

  const handleTypeChange = (type: SessionType) => {
    setForm(f => ({
      ...f,
      session_type: type,
      is_full_width: FULL_WIDTH_TYPES.includes(type),
      room: FULL_WIDTH_TYPES.includes(type) ? 'all' : f.room === 'all' ? 'Auditorium' : f.room,
    }))
  }

  const addSpeaker = () => {
    if (speakers.length === 0) return
    const available = speakers.filter(
      s => !sessionSpeakers.some(ss => ss.speaker_id === s.id)
    )
    if (available.length === 0) return
    setSessionSpeakers([
      ...sessionSpeakers,
      {
        speaker_id: available[0].id,
        role: 'speaker',
        display_order: sessionSpeakers.length + 1,
      },
    ])
  }

  const removeSpeaker = (index: number) => {
    setSessionSpeakers(sessionSpeakers.filter((_, i) => i !== index))
  }

  const updateSpeaker = (
    index: number,
    field: 'speaker_id' | 'role',
    value: string
  ) => {
    setSessionSpeakers(
      sessionSpeakers.map((ss, i) =>
        i === index ? { ...ss, [field]: value } : ss
      )
    )
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      let sessionId = session?.id

      if (isNew) {
        const { data, error } = await supabase
          .from('sessions')
          .insert({
            title: form.title,
            description: form.description || null,
            room: form.room,
            start_time: form.start_time,
            end_time: form.end_time,
            session_type: form.session_type,
            status: form.status,
            sort_order: form.sort_order,
            is_full_width: form.is_full_width,
          })
          .select()
          .single()

        if (error) throw error
        sessionId = data.id
      } else {
        const { error } = await supabase
          .from('sessions')
          .update({
            title: form.title,
            description: form.description || null,
            room: form.room,
            start_time: form.start_time,
            end_time: form.end_time,
            session_type: form.session_type,
            status: form.status,
            sort_order: form.sort_order,
            is_full_width: form.is_full_width,
          })
          .eq('id', sessionId!)

        if (error) throw error
      }

      // Update speakers: delete existing, insert new
      if (sessionId) {
        await supabase.from('session_speakers').delete().eq('session_id', sessionId)

        if (sessionSpeakers.length > 0) {
          await supabase.from('session_speakers').insert(
            sessionSpeakers.map(ss => ({
              session_id: sessionId,
              speaker_id: ss.speaker_id,
              role: ss.role,
              display_order: ss.display_order,
            }))
          )
        }
      }

      onSave()
    } catch (err) {
      console.error('Save error:', err)
      alert('Failed to save. Check console for details.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto
        rounded-t-2xl sm:rounded-2xl shadow-xl">
        <div className="sticky top-0 bg-white border-b border-stone-100 px-4 py-3 flex items-center justify-between z-10">
          <h2 className="font-cirka text-lg font-bold">
            {isNew ? 'New Session' : 'Edit Session'}
          </h2>
          <button onClick={onClose} className="text-tpma-dark/55 hover:text-tpma-dark p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-tpma-dark/75 mb-1">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-tpma-blue/30 focus:border-tpma-blue"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-tpma-dark/75 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-tpma-blue/30 focus:border-tpma-blue resize-none"
            />
          </div>

          {/* Type + Room */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-tpma-dark/75 mb-1">Type</label>
              <select
                value={form.session_type}
                onChange={(e) => handleTypeChange(e.target.value as SessionType)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm
                  focus:outline-none focus:ring-2 focus:ring-tpma-blue/30 bg-white"
              >
                {SESSION_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-tpma-dark/75 mb-1">Room</label>
              <select
                value={form.room}
                onChange={(e) => setForm(f => ({ ...f, room: e.target.value }))}
                disabled={form.is_full_width}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm
                  focus:outline-none focus:ring-2 focus:ring-tpma-blue/30 bg-white
                  disabled:opacity-50 disabled:bg-stone-50"
              >
                {form.is_full_width ? (
                  <option value="all">All (full width)</option>
                ) : (
                  ROOMS.map(r => <option key={r} value={r}>{r}</option>)
                )}
              </select>
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-tpma-dark/75 mb-1">Start</label>
              <input
                type="time"
                value={form.start_time}
                onChange={(e) => setForm(f => ({ ...f, start_time: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm
                  focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-tpma-dark/75 mb-1">End</label>
              <input
                type="time"
                value={form.end_time}
                onChange={(e) => setForm(f => ({ ...f, end_time: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm
                  focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
              />
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-medium text-tpma-dark/75 mb-1">
              Sort Order <span className="text-tpma-dark/30">(lower = earlier in timeline)</span>
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
              className="w-24 px-3 py-2 rounded-lg border border-stone-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
            />
          </div>

          {/* Speakers */}
          {!FULL_WIDTH_TYPES.includes(form.session_type) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-tpma-dark/75">Speakers</label>
                <button
                  onClick={addSpeaker}
                  className="text-xs text-tpma-blue hover:underline"
                >
                  + Add speaker
                </button>
              </div>

              {sessionSpeakers.length === 0 ? (
                <p className="text-xs text-tpma-dark/30 py-2">No speakers assigned</p>
              ) : (
                <div className="space-y-2">
                  {sessionSpeakers.map((ss, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        value={ss.speaker_id}
                        onChange={(e) => updateSpeaker(index, 'speaker_id', e.target.value)}
                        className="flex-1 px-2 py-1.5 rounded border border-stone-200 text-xs bg-white"
                      >
                        {speakers.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      <select
                        value={ss.role}
                        onChange={(e) => updateSpeaker(index, 'role', e.target.value)}
                        className="w-28 px-2 py-1.5 rounded border border-stone-200 text-xs bg-white"
                      >
                        <option value="speaker">Speaker</option>
                        <option value="moderator">Moderator</option>
                        <option value="panelist">Panelist</option>
                        <option value="host">Host</option>
                      </select>
                      <button
                        onClick={() => removeSpeaker(index)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-stone-100 px-4 py-3 flex items-center justify-between">
          <div>
            <button
              onClick={() => setForm(f => ({
                ...f,
                status: f.status === 'published' ? 'draft' : 'published'
              }))}
              className={`status-badge text-xs ${
                form.status === 'published' ? 'status-published' : 'status-draft'
              }`}
            >
              {form.status}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-tpma-dark/75 hover:text-tpma-dark"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.title}
              className="px-4 py-2 bg-tpma-blue text-white text-sm font-medium rounded-lg
                hover:bg-tpma-blue/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
