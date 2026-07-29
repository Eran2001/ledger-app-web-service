import * as Icon from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";

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
          <div className="flex justify-between items-center py-3 border-b border-default">
            <span className="t-body-md-bold text-main">
              Remaining Balance
            </span>
            <span className="t-title-lg text-main">
              {formatCurrency(remaining)}
            </span>
          </div>
          <div className="surface-brand-soft global-rounded p-4 mt-4 mb-3 flex justify-between items-center">
            <span className="t-body-md-bold text-brand">Monthly Payment</span>
            <span className="t-title-xl text-brand">
              {formatCurrency(monthly)}
            </span>
          </div>
          <Row label="Duration" value={`${months} months`} />
        </div>

        <div className="mt-5 pt-5 border-t border-default">
          <p className="t-label-sm-bold text-soft text-uppercase tracking-label mb-2">
            Generated Schedule
          </p>
          <div className="max-h-75 overflow-y-auto -mx-2">
            <table className="w-full">
              <thead>
                <tr className="t-label-sm text-faint text-uppercase tracking-label">
                  <th className="px-2 py-1.5 text-left">#</th>
                  <th className="px-2 py-1.5 text-left">Due Date</th>
                  <th className="px-2 py-1.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {schedule.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-2 py-6 text-center t-label-md text-faint"
                    >
                      Enter sale details to preview schedule
                    </td>
                  </tr>
                ) : (
                  schedule.map((s) => (
                    <tr key={s.n} className="border-t border-default">
                      <td className="px-2 py-2 t-label-md text-faint">
                        {s.n}
                      </td>
                      <td className="px-2 py-2 t-label-md text-soft">
                        {formatDate(s.due)}
                      </td>
                      <td className="px-2 py-2 text-right t-label-md-bold text-main">
                        {formatCurrency(s.amount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
