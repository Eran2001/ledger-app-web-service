import type { useWidth } from "@/hooks/use-width";

type Breakpoints = ReturnType<typeof useWidth>["breakpoints"];

export type ResponsiveSize = "compact" | "default" | "large" | "extra-large";

export function getResponsiveSize(
  width: number,
  breakpoints: Breakpoints,
): ResponsiveSize {
  if (width >= breakpoints["5xl"]) return "extra-large";
  if (width >= breakpoints["2xl"]) return "large";
  if (width >= breakpoints.lg) return "default";
  return "compact";
}
