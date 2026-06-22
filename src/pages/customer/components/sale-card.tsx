import { Link } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { StatusBadge } from "@/components/shared/status-badge";
import { StatPill } from "@/components/shared/stat-pill";
import { Progress } from "@/components/ui/progress";

import { saleStats, productById } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Sale } from "@/types/customer";

import { Stat } from "./stat";

const CATEGORY_PILL: Record<
  string,
  "indigo" | "teal" | "amber" | "purple" | "gray"
> = {
  Electronics: "indigo",
  Appliances: "teal",
  Furniture: "amber",
  Hardware: "purple",
  Other: "gray",
};

export const SaleCard = ({ sale }: { sale: Sale }) => {
  const product = productById(sale.productId);
  const stat = saleStats(sale.id);
  const progress =
    stat.totalCount === 0 ? 0 : (stat.paidCount / stat.totalCount) * 100;

  return (
    <div className="card-base p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="t-section text-main truncate mb-1.5">
            {product?.name}
          </h3>
          {product && (
            <StatPill
              label={product.category}
              color={CATEGORY_PILL[product.category] ?? "gray"}
            />
          )}
        </div>
        <StatusBadge status={stat.hasOverdue ? "OVERDUE" : "ACTIVE"} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <Stat label="Sold Price" value={formatCurrency(sale.soldPrice)} />
        <Stat label="Down Payment" value={formatCurrency(sale.downPayment)} />
        <Stat label="Monthly" value={formatCurrency(sale.monthlyAmount)} />
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between t-caption text-soft mb-1.5">
          <span>
            {stat.paidCount} of {stat.totalCount} installments paid
          </span>
          <span className="fw-bold text-main">
            {formatCurrency(stat.outstanding)} left
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-default">
        <p className="t-caption text-soft">
          Next due:{" "}
          <span className="fw-semibold text-main">
            {stat.nextDue ? formatDate(stat.nextDue) : "—"}
          </span>
        </p>
        <Link
          to="/sales/$id"
          params={{ id: sale.id }}
          className="t-caption-bold text-brand inline-flex items-center gap-1"
        >
          View Full Details <Icon.ArrowRight />
        </Link>
      </div>
    </div>
  );
};
