interface BellAlertBadgeProps {
  isPending: boolean;
  count: number;
}

export function BellAlertBadge({ isPending, count }: BellAlertBadgeProps) {
  if (isPending) {
    return (
      <span className="absolute -top-1 -right-1 h-3 w-3 circle-rounded border-2 bell-spinner animate-spin" />
    );
  }

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 h-4 w-4 circle-rounded surface-danger ui-xs fw-medium text-danger-contrast flex items-center justify-center">
      {count > 9 ? "9+" : count}
    </span>
  );
}
