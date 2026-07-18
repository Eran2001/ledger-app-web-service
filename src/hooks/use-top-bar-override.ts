import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

import type { TopBarProps } from "@/components/shared/top-bar";
import { useTopBarStore } from "@/stores/top-bar-store";

export function useTopBarOverride(config: Partial<TopBarProps> | null) {
  const { pathname } = useLocation();
  const setOverride = useTopBarStore((state) => state.setOverride);
  const clearOverride = useTopBarStore((state) => state.clearOverride);

  useEffect(() => {
    if (!config) {
      clearOverride(pathname);
      return;
    }

    setOverride(pathname, config);

    return () => clearOverride(pathname);
  }, [clearOverride, config, pathname, setOverride]);
}
