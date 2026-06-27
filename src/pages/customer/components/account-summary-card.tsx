import { Card } from "@/components/ui/card";
import { StatPill } from "@/components/shared/stat-pill";
import { Stat } from "@/components/ui/stat";

import { formatCurrency, formatDate } from "@/lib/utils";

type Props = {
  outstanding: number;
  totalPaid: number;
  activeSalesCount: number;
  nextDue?: string;
  customerSince: string;
};

export const AccountSummaryCard = ({
  outstanding,
  totalPaid,
  activeSalesCount,
  nextDue,
  customerSince,
}: Props) => {
  const isOutstanding = outstanding > 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="t-caption text-uppercase text-faint tracking-label">
          Account Summary
        </p>
        <StatPill
          label={isOutstanding ? "Outstanding" : "Clear"}
          color={isOutstanding ? "amber" : "green"}
        />
      </div>

      <p className="t-kpi-lg text-main">{formatCurrency(outstanding)}</p>
      <p className="t-caption text-faint mt-1 mb-4">Outstanding balance</p>

      <div className="flex flex-wrap gap-2 mb-5">
        <StatPill label={`${activeSalesCount} Active Sales`} color="indigo" />
        <StatPill
          label={`${formatCurrency(outstanding)} Outstanding`}
          color="amber"
        />
        <StatPill label={`Since ${formatDate(customerSince)}`} color="gray" />
      </div>

      <div className="border-t border-default pt-5 grid grid-cols-2 gap-x-4 gap-y-4">
        <Stat
          label="Active Sales"
          value={`${activeSalesCount} sale${activeSalesCount !== 1 ? "s" : ""}`}
        />
        <Stat label="Total Paid" value={formatCurrency(totalPaid)} />
        <Stat label="Next Due" value={nextDue ? formatDate(nextDue) : "—"} />
        <Stat label="Last Payment" value={formatDate(customerSince)} />
      </div>
    </Card>
  );
};
