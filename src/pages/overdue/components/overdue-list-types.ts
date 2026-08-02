export interface OverdueRow {
  scheduleId: string;
  saleId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  dueDate: string;
  daysOverdue: number;
  expectedAmount: number;
}

export interface OverdueListProps {
  rows: OverdueRow[];
  onRemind: (customerName: string) => void;
}

export function overdueSeverity(days: number) {
  if (days > 60) return { text: "text-danger", row: "bg-overdue-row" };
  if (days > 30) return { text: "text-warning-role", row: "" };
  return { text: "text-warning-role", row: "" };
}
