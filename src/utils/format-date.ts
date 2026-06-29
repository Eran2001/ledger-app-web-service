import { format } from "date-fns";

export const formatDate = (date: string | Date | null | undefined): string => {
  if (date == null) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";
  return format(d, "d MMM yyyy");
};
