import type { useWidth } from "@/hooks/use-width";

type Breakpoints = ReturnType<typeof useWidth>["breakpoints"];

export type ResponsiveSize = "compact" | "default" | "large" | "extra-large";
export type ResponsiveBreakpoint = "base" | keyof Breakpoints;

export function getResponsiveSize(
  width: number,
  breakpoints: Breakpoints,
): ResponsiveSize {
  if (width >= breakpoints["5xl"]) return "extra-large";
  if (width >= breakpoints["2xl"]) return "large";
  if (width >= breakpoints.lg) return "default";
  return "compact";
}

export function getResponsiveBreakpoint(
  width: number,
  breakpoints: Breakpoints,
): ResponsiveBreakpoint {
  if (width >= breakpoints["10xl"]) return "10xl";
  if (width >= breakpoints["9xl"]) return "9xl";
  if (width >= breakpoints["8xl"]) return "8xl";
  if (width >= breakpoints["7xl"]) return "7xl";
  if (width >= breakpoints["6xl"]) return "6xl";
  if (width >= breakpoints["5xl"]) return "5xl";
  if (width >= breakpoints["4xl"]) return "4xl";
  if (width >= breakpoints["3xl"]) return "3xl";
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  if (width >= breakpoints.xs) return "xs";
  if (width >= breakpoints.xxs) return "xxs";
  return "base";
}
