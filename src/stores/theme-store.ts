
import { create } from "zustand"

interface ThemeState {
  isDark: boolean
  toggle: () => void
  init: () => void
  setDark: (dark: boolean) => void
}

const applyTheme = (dark: boolean) => {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (dark) root.classList.add("dark")
  else root.classList.remove("dark")
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  setDark: (dark) => {
    applyTheme(dark)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", dark ? "dark" : "light")
    }
    set({ isDark: dark })
  },
  toggle: () => {
    set((state) => {
      const next = !state.isDark
      applyTheme(next)
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", next ? "dark" : "light")
      }
      return { isDark: next }
    })
  },
  init: () => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem("theme")
    const prefersDark =
      stored === "dark" ||
      (stored === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
    applyTheme(prefersDark)
    set({ isDark: prefersDark })
  },
}))

useThemeStore.getState().init()
