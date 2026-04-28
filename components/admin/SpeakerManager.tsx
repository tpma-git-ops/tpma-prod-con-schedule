'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Speaker } from '@/lib/types'

interface SpeakerManagerProps {
  speakers: Speaker[]
  onUpdate: () => void
}

export function SpeakerManager({ speakers, onUpdate }: SpeakerManagerProps) {
  const [editing, setEditing] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const supabase = createClient()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-tpma-dark/40">{speakers.length} speakers</p>
        <button
          onClick={() => setShowNew(true)}
          className="px-3 py-1.5 bg-tpma-blue text-white text-xs font-medium rounded-lg
            hover:bg-tpma-blue/90 transition-colors"
        >
          + Add Speaker
        </button>
      </div>

      {showNew && (
        <SpeakerForm
          onSave={async (data) => {
            await supabase.from('speakers').insert(data)
            setShowNew(false)
            onUpdate()
          }}
          onCancel={() => setShowNew(false)}
        />
      )}

      <div className="space-y-1">
        {speakers.map((speaker) => (
          <div key={speaker.id}>
            {editing === speaker.id ? (
              <SpeakerForm
                speaker={speaker}
                onSave={async (data) => {
                  await supabase.from('speakers').update(data).eq('id', speaker.id)
                  setEditing(null)
                  onUpdate()
                }}
                onCancel={() => setEditing(null)}
                onDelete={async () => {
                  if (!confirm(`Delete ${speaker.name}? This will remove them from all sessions.`)) return
                  await supabase.from('speakers').delete().eq('id', speaker.id)
                  setEditing(null)
                  onUpdate()
                }}
              />
            ) : (
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-stone-100
                  hover:bg-stone-50 cursor-pointer transition-colors"
                onClick={() => setEditing(speaker.id)}
              >
                {speaker.photo_url ? (
                  <img
                    src={speaker.photo_url}
                    alt={speaker.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-tpma-dark/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-tpma-dark/40">
                      {speaker.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-tpma-dark truncate">{speaker.name}</p>
                  <p className="text-[11px] text-tpma-dark/40 truncate">
                    {[speaker.title, speaker.company].filter(Boolean).join(' · ') || 'No details'}
                  </p>
                </div>
                <svg className="w-4 h-4 text-tpma-dark/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface SpeakerFormProps {
  speaker?: Speaker
  onSave: (data: Partial<Speaker>) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

function SpeakerForm({ speaker, onSave, onCancel, onDelete }: SpeakerFormProps) {
  const [form, setForm] = useState({
    name: speaker?.name || '',
    title: speaker?.title || '',
    company: speaker?.company || '',
    photo_url: speaker?.photo_url || '',
    linkedin_url: speaker?.linkedin_url || '',
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    setSaving(true)
    await onSave({
      name: form.name,
      title: form.title || null,
      company: form.company || null,
      photo_url: form.photo_url || null,
      linkedin_url: form.linkedin_url || null,
    })
    setSaving(false)
  }

  return (
    <div className="border border-tpma-blue/20 bg-indigo-50/30 rounded-lg p-3 mb-2">
      <div className="space-y-2">
        <input
          value={form.name}
          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Name"
          className="w-full px-2.5 py-1.5 rounded border border-stone-200 text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            value={form.title}
            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Title/Role"
            className="px-2.5 py-1.5 rounded border border-stone-200 text-xs bg-white
              focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
          />
          <input
            value={form.company}
            onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="Company"
            className="px-2.5 py-1.5 rounded border border-stone-200 text-xs bg-white
              focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
          />
        </div>
        <input
          value={form.photo_url}
          onChange={(e) => setForm(f => ({ ...f, photo_url: e.target.value }))}
          placeholder="Photo URL"
          className="w-full px-2.5 py-1.5 rounded border border-stone-200 text-xs bg-white
            focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
        />
        <input
          value={form.linkedin_url}
          onChange={(e) => setForm(f => ({ ...f, linkedin_url: e.target.value }))}
          placeholder="Profile / speaker page or LinkedIn URL"
          className="w-full px-2.5 py-1.5 rounded border border-stone-200 text-xs bg-white
            focus:outline-none focus:ring-2 focus:ring-tpma-blue/30"
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="text-xs text-tpma-dark/40 hover:text-tpma-dark px-2 py-1">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !form.name}
            className="px-3 py-1 bg-tpma-blue text-white text-xs font-medium rounded
              hover:bg-tpma-blue/90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
