import { cn } from "@/lib/utils";
import { KpiCardProps } from "@/types/dashboard";

export const KpiCard = ({ label, value, sub, trend, danger }: KpiCardProps) => {
  return (
    <div
      className={cn(
        "surface-card global-rounded border border-default p-4 border-l-4 dropdown-shadow",
        danger ? "border-start-danger" : "border-start-brand",
      )}
    >
      <p className="t-micro-bold text-soft text-uppercase mb-2">{label}</p>
      <p className="t-kpi text-main">{value}</p>
      <div className="mt-2 flex items-center gap-2">
        {trend && (
          <span className={cn("t-micro fw-bold", trend.color)}>
            {trend.label}
          </span>
        )}
        {sub && <span className="t-micro text-faint">{sub}</span>}
      </div>
    </div>
  );
};
