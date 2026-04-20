import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  init: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggle: () => {
        const next = !get().isDark;
        set({ isDark: next });
        document.documentElement.classList.toggle("dark", next);
      },
      init: () => {
        document.documentElement.classList.toggle("dark", get().isDark);
      },
    }),
    { name: "ledger-theme" }
  )
);
