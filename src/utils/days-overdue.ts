import { differenceInDays } from "date-fns";

export const daysOverdue = (dueDate: string | Date | null | undefined): string => {
  if (dueDate == null) return "—";
  const d = new Date(dueDate);
  if (isNaN(d.getTime())) return "—";
  const days = Math.max(0, differenceInDays(new Date(), d));
  return `${days} days late`;
};
