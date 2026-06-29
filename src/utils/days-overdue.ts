import { differenceInDays } from "date-fns";

export function daysOverdue(dueDate: string | Date): number {
  return Math.max(0, differenceInDays(new Date(), new Date(dueDate)));
}
