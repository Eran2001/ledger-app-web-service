import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts";

import { Card } from "@/components/ui/card";

export interface CollectionStatusPoint {
  name: string;
  value: number;
  color: string;
}

interface CollectionStatusChartProps {
  data: CollectionStatusPoint[];
}

const ChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0];

  return (
    <div className="surface-popover border-stroke border-default global-rounded shadow-card px-3 py-2">
      <p className="t-label-sm text-soft">{entry.name}</p>
      <p className="t-body-md-bold text-main">{entry.value}</p>
    </div>
  );
};

export const CollectionStatusChart = ({ data }: CollectionStatusChartProps) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card border shadow className="p-5">
      <div className="mb-4">
        <h2 className="t-title-lg text-main">Collection Status</h2>
        <p className="t-label-md text-soft">By installment</p>
      </div>
      <div className="flex h-72 flex-col">
        <div className="relative flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                cornerRadius={6}
                stroke="var(--card-bg)"
                strokeWidth={3}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="t-display-lg text-main">{total}</p>
            <p className="t-label-sm text-soft text-uppercase tracking-label">
              Total
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 global-rounded"
                style={{ backgroundColor: entry.color }}
              />
              <span className="t-label-sm text-soft">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
