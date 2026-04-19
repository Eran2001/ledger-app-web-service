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
      <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#4F46E5]" />
      </div>
      <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3>
      <p className="text-sm text-[#94A3B8] mt-1 max-w-xs">{subtitle}</p>
      {actionLabel && (
        <Button 
          className="mt-6 bg-[#4F46E5] hover:bg-[#3730A3]"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
