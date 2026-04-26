import React from 'react'
import type { LucideIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  subtitle: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 align-text-center">
      <div className="w-12 h-12 global-rounded surface-brand-soft flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-brand" />
      </div>
      <h3 className="t-display text-main">{title}</h3>
      <p className="t-body text-faint mt-1 max-w-xs">{subtitle}</p>
      {actionLabel && (
        <Button
          className="mt-6 surface-brand surface-brand-strong-hover"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
