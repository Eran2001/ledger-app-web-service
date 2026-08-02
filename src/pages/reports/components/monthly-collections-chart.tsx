import { useId } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

import { Card } from "@/components/ui/card";

import { formatCurrency } from "@/utils/format-currency";

export interface MonthlyPoint {
  month: string;
  collected: number;
}

interface MonthlyCollectionsChartProps {
  data: MonthlyPoint[];
}

const ChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="surface-popover border-stroke border-default global-rounded shadow-card px-3 py-2">
      <p className="t-label-sm text-soft">{label}</p>
      <p className="t-body-md-bold text-main">
        {formatCurrency(Number(payload[0].value))}
      </p>
    </div>
  );
};

export const MonthlyCollectionsChart = ({
  data,
}: MonthlyCollectionsChartProps) => {
  const gradientId = useId();

  return (
    <Card border shadow className="p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="t-title-lg text-main">Monthly Collections</h2>
          <p className="t-label-md text-soft">Last 6 months</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.55} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              cursor={{ fill: "var(--primary-light)" }}
              content={<ChartTooltip />}
            />
            <Bar
              dataKey="collected"
              fill={`url(#${gradientId})`}
              radius={[6, 6, 0, 0]}
              barSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
