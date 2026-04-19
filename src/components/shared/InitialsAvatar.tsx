import React from 'react'
import { cn, getInitials } from '@/lib/utils'

interface InitialsAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-[28px] h-[28px] text-[10px]',
    md: 'w-[36px] h-[36px] text-xs',
    lg: 'w-[56px] h-[56px] text-lg',
  }

  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-[#4F46E5] text-white font-semibold shrink-0", 
      sizeClasses[size],
      className
    )}>
      {getInitials(name)}
    </div>
  )
}
