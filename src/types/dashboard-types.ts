import type { ReactNode } from "react";

import type { PillColor } from "@/components/ui/stat-pill";

/* KPI CARDS */
export interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: { label: string; color: string };
  danger?: boolean;
  border?: boolean;
  shadow?: boolean;
}

/* CARD CAPTION */
export interface CardCaptionProps {
  title: string;
  actionLabel?: string;
  actionTo?: string;
  statLabel?: string;
  statColor?: PillColor;
  className?: string;
  border?: boolean;
  shadow?: boolean;
  children: ReactNode;
}
