import React from 'react'
import { cn } from '@/lib/utils'

interface StatPillProps {
  label: string
  color?: 'indigo' | 'amber' | 'gray'
  className?: string
}

export const StatPill: React.FC<StatPillProps> = ({ label, color = 'gray', className }) => {
  return (
    <span className={cn(
      "badge-text px-3 py-1 rounded-lg whitespace-nowrap",
      `pill-${color}`,
      className
    )}>
      {label}
    </span>
  )
}
