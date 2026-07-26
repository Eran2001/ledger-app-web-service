import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { KpiCardProps } from "@/types/dashboard-types";

export const KpiCard = ({
  label,
  value,
  sub,
  trend,
  danger,
  border,
  shadow,
}: KpiCardProps) => {
  return (
    <Card border={border} shadow={shadow} className="p-0 gap-0">
      <div className="global-rounded overflow-hidden relative p-4">
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-0 bottom-0 w-1",
            danger ? "surface-danger" : "surface-brand",
          )}
        />
        <p className="t-label-sm-bold text-soft text-uppercase mb-2">{label}</p>
        <p className="t-display-lg text-main">{value}</p>
        <div className="mt-2 flex items-center gap-2">
          {trend && (
            <span className={cn("t-label-sm fw-bold", trend.color)}>
              {trend.label}
            </span>
          )}
          {sub && <span className="t-label-sm text-faint">{sub}</span>}
        </div>
      </div>
    </Card>
  );
};
