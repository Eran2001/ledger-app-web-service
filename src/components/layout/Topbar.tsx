import React from 'react'
import { Bell } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { InitialsAvatar } from '../shared/InitialsAvatar'

interface TopbarProps {
  pageTitle: string
  pageSubtitle: string
  primaryAction?: React.ReactNode
}

export const Topbar: React.FC<TopbarProps> = ({ pageTitle, pageSubtitle, primaryAction }) => {
  const { user } = useAuthStore()

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-3 flex items-center justify-between h-16 shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-[#0F172A]">{pageTitle}</h1>
        <span className="text-[#94A3B8]">/</span>
        <span className="text-[#475569] text-sm">{pageSubtitle}</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-[#475569] hover:bg-[#F1F5F9] rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 ml-2">
          <InitialsAvatar name={user?.name || ""} size="sm" />
        </div>

        {primaryAction && (
          <div className="ml-2">
            {primaryAction}
          </div>
        )}
      </div>
    </header>
  )
}
