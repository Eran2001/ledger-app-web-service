"use client"

import type { ReactNode } from "react"
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar"

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden surface-page">
      <Sidebar />
      <MobileSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">{children}</main>
    </div>
  )
}
