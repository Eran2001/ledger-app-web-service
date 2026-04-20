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
        document.documentElement.classList.add("no-transition");
        set({ isDark: next });
        document.documentElement.classList.toggle("dark", next);
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("no-transition");
        });
      },
      init: () => {
        document.documentElement.classList.toggle("dark", get().isDark);
      },
    }),
    { name: "ledger-theme" }
  )
);
