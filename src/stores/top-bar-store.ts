import { create } from "zustand";

import type { TopBarProps } from "@/components/shared/top-bar";

interface TopBarOverride {
  pathname: string;
  config: Partial<TopBarProps>;
}

interface TopBarState {
  override: TopBarOverride | null;
  setOverride: (pathname: string, config: Partial<TopBarProps>) => void;
  clearOverride: (pathname: string) => void;
}

export const useTopBarStore = create<TopBarState>((set) => ({
  override: null,
  setOverride: (pathname, config) => set({ override: { pathname, config } }),
  clearOverride: (pathname) =>
    set((state) =>
      state.override?.pathname === pathname ? { override: null } : state,
    ),
}));
