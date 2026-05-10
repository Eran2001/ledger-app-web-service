
import { cn } from "@/lib/utils"

type Status =
  | "PAID"
  | "PARTIALLY_PAID"
  | "OVERDUE"
  | "PENDING"
  | "ACTIVE"
  | "COMPLETED"
  | "WRITTEN_OFF"

const VAR_MAP: Record<Status, { bg: string; text: string }> = {
  PAID: { bg: "var(--status-paid-bg)", text: "var(--status-paid-text)" },
  PARTIALLY_PAID: { bg: "var(--status-partial-bg)", text: "var(--status-partial-text)" },
  OVERDUE: { bg: "var(--status-overdue-bg)", text: "var(--status-overdue-text)" },
  PENDING: { bg: "var(--status-pending-bg)", text: "var(--status-pending-text)" },
  ACTIVE: { bg: "var(--status-active-bg)", text: "var(--status-active-text)" },
  COMPLETED: { bg: "var(--status-completed-bg)", text: "var(--status-completed-text)" },
  WRITTEN_OFF: { bg: "var(--status-writtenoff-bg)", text: "var(--status-writtenoff-text)" },
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const colors = VAR_MAP[status]
  return (
    <span
      className={cn("badge-text px-2.5 py-0.5 global-rounded whitespace-nowrap inline-block", className)}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {status.replace("_", " ")}
    </span>
  )
}
