import type { ReactNode } from "react";

/* KPI CARDS */
export interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: { label: string; color: string };
  danger?: boolean;
}

/* CARD CAPTION */
export interface CardCaptionProps {
  title: string;
  actionLabel?: string;
  actionTo?: string;
  className?: string;
  children: ReactNode;
}
