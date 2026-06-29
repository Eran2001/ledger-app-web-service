export interface Payment {
  id: string;
  installmentScheduleId: string;
  paidAmount: number;
  paidDate: string;
  recordedBy: string;
  notes?: string;
}
