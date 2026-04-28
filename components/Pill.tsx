'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  leadingVisual?: ReactNode
  trailingVisual?: ReactNode
  label: ReactNode
}

export function Pill({
  isActive = false,
  leadingVisual,
  trailingVisual,
  label,
  className,
  type = 'button',
  ...props
}: PillProps) {
  const pillClassName = [
    'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tpma-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50',
    isActive
      ? 'border-tpma-dark bg-tpma-dark text-white shadow-sm'
      : 'border-stone-200 bg-white text-tpma-dark/70 hover:border-stone-300 hover:bg-stone-100',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type={type} className={pillClassName} {...props}>
      <span className="flex min-w-0 items-center gap-1.5">
        {leadingVisual ? <span className="shrink-0">{leadingVisual}</span> : null}
        <span>{label}</span>
      </span>
      {trailingVisual ? <span className="shrink-0">{trailingVisual}</span> : null}
    </button>
  )
}
