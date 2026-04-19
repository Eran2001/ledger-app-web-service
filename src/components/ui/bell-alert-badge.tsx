interface BellAlertBadgeProps {
  isPending: boolean;
  count: number;
}

export function BellAlertBadge({ isPending, count }: BellAlertBadgeProps) {
  if (isPending) {
    return (
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-card border-t-primary animate-spin" />
    );
  }

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-2xs font-medium text-destructive-foreground flex items-center justify-center">
      {count > 9 ? "9+" : count}
    </span>
  );
}