
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  subtitle: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="surface-card card-rounded border border-default flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="surface-brand-soft circle-rounded h-16 w-16 flex items-center justify-center mb-4">
        <Icon className="h-12 w-12 text-brand p-2" strokeWidth={1.5} />
      </div>
      <p className="t-body fw-semibold text-main mb-1">{title}</p>
      <p className="t-body text-faint max-w-sm">{subtitle}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6 surface-brand text-inverse btn-base h-10 px-5 control-rounded">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
