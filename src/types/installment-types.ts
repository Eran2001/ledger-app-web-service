export type InstallmentStatus =
  | "PENDING"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE"
  | "WRITTEN_OFF";

export interface InstallmentSchedule {
  id: string;
  saleId: string;
  installmentNumber: number;
  dueDate: string;
  expectedAmount: number;
  paidAmount: number;
  status: InstallmentStatus;
}
