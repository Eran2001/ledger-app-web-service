import * as Icon from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import { Separator } from "@/components/ui/separator";

interface ScheduleItem {
  n: number;
  due: Date;
  amount: number;
}

interface InstallmentPreviewCardProps {
  soldPrice: number;
  downPayment: number;
  remaining: number;
  monthly: number;
  months: number;
  schedule: ScheduleItem[];
}

export const InstallmentPreviewCard = ({
  soldPrice,
  downPayment,
  remaining,
  monthly,
  months,
  schedule,
}: InstallmentPreviewCardProps) => {
  return (
    <Card border shadow className="gap-0 sticky top-6">
      <CardHeader border className="px-0 pt-0">
        <CardTitle icon={Icon.Calculator}>Installment Preview</CardTitle>
        <CardDescription>
          The payment plan updates instantly as you change the sale terms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <Row label="Sold Price" value={formatCurrency(soldPrice)} />
          <div className="flex justify-between items-center py-3 border-y border-dashed border-success-soft">
            <span className="t-body-md text-soft">Down Payment</span>
            <span className="t-body-md-bold text-success-role">
              −{formatCurrency(downPayment)}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="t-body-md-bold text-main">Remaining Balance</span>
            <span className="t-title-lg text-main">
              {formatCurrency(remaining)}
            </span>
          </div>
          <Separator />
          <div className="surface-brand-soft global-rounded p-4 mt-4 mb-3 flex justify-between items-center">
            <span className="t-body-md-bold text-brand">Monthly Payment</span>
            <span className="t-title-xl text-brand">
              {formatCurrency(monthly)}
            </span>
          </div>
          <Row label="Duration" value={`${months} months`} />
        </div>

        <Separator />

        <div className="pt-5">
          <p className="t-label-sm-bold text-soft text-uppercase tracking-label mb-2">
            Generated Schedule
          </p>
          <div className="max-h-75 overflow-y-auto hide-scrollbar">
            <Table layout="fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-faint">
                      Enter sale details to preview schedule
                    </TableCell>
                  </TableRow>
                ) : (
                  schedule.map((s) => (
                    <TableRow key={s.n}>
                      <TableCell>{s.n}</TableCell>
                      <TableCell>{formatDate(s.due)}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(s.amount)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-3">
    <span className="t-body-md text-soft">{label}</span>
    <span className="t-body-md-bold text-main">{value}</span>
  </div>
);
