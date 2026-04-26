import React from 'react'
import { cn, getInitials } from '@/lib/utils'

interface InitialsAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 t-micro-bold',
    md: 'w-9 h-9 t-caption-bold',
    lg: 'w-14 h-14 t-display',
  }

  return (
    <div className={cn(
      "flex items-center justify-center circle-rounded surface-brand text-brand-contrast shrink-0",
      sizeClasses[size],
      className
    )}>
      {getInitials(name)}
    </div>
  )
}
