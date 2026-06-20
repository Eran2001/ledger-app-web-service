export default function KpiCard({
  label,
  value,
  sub,
  trend,
  danger,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: { label: string; color: string };
  danger?: boolean;
}) {
  return (
    <div
      className={`surface-card global-rounded border border-default p-5 border-l-4 ${danger ? "border-start-danger" : "border-start-brand"} shadow-sm`}
    >
      <p className="t-micro-bold text-soft text-uppercase tracking-label mb-2">
        {label}
      </p>
      <p className="t-kpi text-main">{value}</p>
      <div className="mt-2 flex items-center gap-2">
        {trend && (
          <span className={`t-micro fw-bold ${trend.color}`}>
            {trend.label}
          </span>
        )}
        {sub && <span className="t-micro text-faint">{sub}</span>}
      </div>
    </div>
  );
}
