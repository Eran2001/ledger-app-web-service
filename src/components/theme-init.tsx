
import { useEffect } from "react"
import { useThemeStore } from "@/store/theme-store"

export function ThemeInit() {
  const init = useThemeStore((s) => s.init)
  useEffect(() => {
    init()
  }, [init])
  return null
}
