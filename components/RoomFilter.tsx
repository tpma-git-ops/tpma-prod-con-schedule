'use client'

import { ROOMS, Room, ROOM_COLORS } from '@/lib/types'

interface RoomFilterProps {
  activeRoom: Room | 'All'
  onRoomChange: (room: Room | 'All') => void
}

const ROOM_SHORT_LABELS: Record<string, string> = {
  'All': 'All',
  'Auditorium': 'Main Stage',
  'Room 2': 'Room 2',
  'Room 3': 'Room 3',
  'Room 4': 'Room 4',
  'Lunch Room': 'Unconf',
}

const ROOM_DOT_COLORS: Record<string, string> = {
  'Auditorium': 'bg-tpma-blue',
  'Room 2': 'bg-tpma-coral',
  'Room 3': 'bg-tpma-gold',
  'Room 4': 'bg-emerald-500',
  'Lunch Room': 'bg-tpma-dark',
}

export function RoomFilter({ activeRoom, onRoomChange }: RoomFilterProps) {
  const options: (Room | 'All')[] = ['All', ...ROOMS]

  return (
    <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide -mx-1 px-1">
      {options.map((room) => {
        const isActive = activeRoom === room
        return (
          <button
            key={room}
            onClick={() => onRoomChange(room)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
              whitespace-nowrap transition-all duration-150
              ${isActive
                ? 'bg-tpma-dark text-white shadow-sm'
                : 'bg-white text-tpma-dark/70 hover:bg-stone-100 border border-stone-200'
              }
            `}
          >
            {room !== 'All' && (
              <span className={`w-2 h-2 rounded-full ${ROOM_DOT_COLORS[room]} ${isActive ? 'opacity-100' : 'opacity-60'}`} />
            )}
            {ROOM_SHORT_LABELS[room] || room}
          </button>
        )
      })}
    </div>
  )
}
