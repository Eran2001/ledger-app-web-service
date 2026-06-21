import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, differenceInDays } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `LKR ${amount.toLocaleString()}`
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "d MMM yyyy")
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const AVATAR_PALETTE = [
  { bg: "#dbeafe", fg: "#1d4ed8" },
  { bg: "#dcfce7", fg: "#15803d" },
  { bg: "#fef9c3", fg: "#a16207" },
  { bg: "#fee2e2", fg: "#b91c1c" },
  { bg: "#f5f3ff", fg: "#7c3aed" },
  { bg: "#f0fdfa", fg: "#0f766e" },
  { bg: "#fce7f3", fg: "#be185d" },
  { bg: "#e0e7ff", fg: "#4338ca" },
]

export function getAvatarColors(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
    hash |= 0
  }
  const idx = Math.abs(hash) % AVATAR_PALETTE.length
  return AVATAR_PALETTE[idx]
}

export function daysOverdue(dueDate: string | Date): number {
  return Math.max(0, differenceInDays(new Date(), new Date(dueDate)))
}

export function formatStatusLabel(status: string): string {
  const lower = status.toLowerCase().split("_").join(" ")
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}
