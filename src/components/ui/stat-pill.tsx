import { cn } from "@/lib/utils";

type PillColor =
  | "indigo"
  | "amber"
  | "gray"
  | "green"
  | "red"
  | "teal"
  | "purple";

const COLOR_CLASS: Record<PillColor, string> = {
  indigo: "pill-indigo",
  amber: "pill-amber",
  gray: "pill-gray",
  green: "pill-green",
  red: "pill-red",
  teal: "pill-teal",
  purple: "pill-purple",
};

export function StatPill({
  label,
  color = "indigo",
  border = false,
  shadow = false,
  className,
}: {
  label: string;
  color?: PillColor;
  border?: boolean;
  shadow?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "t-label-sm fw-bold px-3 py-1.5 global-rounded inline-block whitespace-nowrap text-uppercase tracking-label",
        COLOR_CLASS[color],
        border && "border-stroke",
        shadow && "shadow-card",
        className,
      )}
    >
      {label}
    </span>
  );
}
