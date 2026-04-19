import React from 'react'
import { LucideIcon } from 'lucide-react'
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
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="t-display text-heading">{title}</h3>
      <p className="t-body text-hint mt-1 max-w-xs">{subtitle}</p>
      {actionLabel && (
        <Button
          className="mt-6 bg-primary hover:bg-primary-dark"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
