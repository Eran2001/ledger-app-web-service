import React from 'react'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

const statusMap: Record<string, { bg: string, text: string }> = {
  'PAID': { bg: 'var(--status-paid-bg)', text: 'var(--status-paid-text)' },
  'PARTIALLY_PAID': { bg: 'var(--status-partial-bg)', text: 'var(--status-partial-text)' },
  'OVERDUE': { bg: 'var(--status-overdue-bg)', text: 'var(--status-overdue-text)' },
  'PENDING': { bg: 'var(--status-pending-bg)', text: 'var(--status-pending-text)' },
  'ACTIVE': { bg: 'var(--status-active-bg)', text: 'var(--status-active-text)' },
  'COMPLETED': { bg: 'var(--status-completed-bg)', text: 'var(--status-completed-text)' },
  'WRITTEN_OFF': { bg: 'var(--status-writtenoff-bg)', text: 'var(--status-writtenoff-text)' },
  'active': { bg: 'var(--status-completed-bg)', text: 'var(--status-completed-text)' },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusMap[status] || { bg: '#F1F5F9', text: '#475569' }
  
  return (
    <span 
      className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap", className)}
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {status.replace('_', ' ')}
    </span>
  )
}
