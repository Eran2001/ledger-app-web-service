import { Card } from "@/components/ui/card";
import { StatPill } from "@/components/shared/stat-pill";
import { Stat } from "@/components/ui/stat";
import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";

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
    <Card>
      <div className="flex items-center justify-between">
        <p className="t-caption text-uppercase text-faint">Account Summary</p>
        <StatPill
          label={isOutstanding ? "Outstanding" : "Clear"}
          color={isOutstanding ? "amber" : "green"}
        />
      </div>

      <p className="t-kpi-lg text-main">{formatCurrency(outstanding)}</p>
      <p className="t-caption text-faint">Outstanding balance</p>

      <div className="flex flex-wrap gap-2">
        <StatPill label={`${activeSalesCount} Active Sales`} color="indigo" />
        <StatPill
          label={`${formatCurrency(outstanding)} Outstanding`}
          color="amber"
        />
        <StatPill label={`Since ${formatDate(customerSince)}`} color="gray" />
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
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
