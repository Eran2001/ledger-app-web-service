import * as React from 'react'
import { useThemeStore } from '@/store/theme-store'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>
}

export { useThemeStore }
