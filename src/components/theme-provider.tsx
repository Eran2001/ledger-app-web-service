import * as React from "react";
import { useThemeStore } from "@/stores/theme-store";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}

export { useThemeStore };
