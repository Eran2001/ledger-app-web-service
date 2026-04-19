import React from 'react'
import { cn } from '@/lib/utils'

interface StatPillProps {
  label: string
  color?: 'indigo' | 'amber' | 'gray'
  className?: string
}

export const StatPill: React.FC<StatPillProps> = ({ label, color = 'gray', className }) => {
  const colorClasses = {
    indigo: 'bg-[#EEF2FF] text-[#4F46E5]',
    amber: 'bg-[#FEF9C3] text-[#A16207]',
    gray: 'bg-[#F1F5F9] text-[#475569]',
  }

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap", 
      colorClasses[color],
      className
    )}>
      {label}
    </span>
  )
}
