'use client'

import { Pill } from '@/components/Pill'
import { ROOMS, Room, getRoomStyle } from '@/lib/types'

interface RoomFilterProps {
  activeRoom: Room | 'All'
  onRoomChange: (room: Room | 'All') => void
}

const ROOM_PILL_CLASSES: Record<Room | 'All', string> = {
  All: 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-stone-100',
  Auditorium: 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100',
  'Room 2': 'border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100',
  'Room 3': 'border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300 hover:bg-amber-100',
  'Room 4': 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100',
  'Lunch Room': 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100',
}

const ROOM_SHORT_LABELS: Record<string, string> = {
  'All': 'All',
  'Auditorium': 'Main Stage',
  'Room 2': 'Room 2',
  'Room 3': 'Room 3',
  'Room 4': 'Room 4',
  'Lunch Room': 'Unconf',
}

export function RoomFilter({ activeRoom, onRoomChange }: RoomFilterProps) {
  const options: (Room | 'All')[] = ['All', ...ROOMS]

  return (
    <div
      role="group"
      aria-label="Filter sessions by room"
      className="flex gap-1 py-3 overflow-x-auto scrollbar-hide -mx-1 px-1"
    >
      {options.map((room) => {
        const isActive = activeRoom === room
        const roomStyle = room === 'All' ? null : getRoomStyle(room)

        return (
          <Pill
            key={room}
            type="button"
            onClick={() => onRoomChange(room)}
            isActive={isActive}
            className={`
              ${ROOM_PILL_CLASSES[room]}
              ${isActive ? 'font-semibold ring-1 ring-inset ring-tpma-dark/10 shadow-sm' : ''}
            `}
            leadingVisual={room === 'All' ? null : (
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${roomStyle?.dot} ${isActive ? 'opacity-100' : 'opacity-60'}`}
              />
            )}
            label={ROOM_SHORT_LABELS[room] || room}
          />
        )
      })}
    </div>
  )
}
