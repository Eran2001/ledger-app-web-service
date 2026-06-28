import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { StatusBadge } from "@/components/shared/status-badge";
import { StatPill } from "@/components/shared/stat-pill";
import { Progress } from "@/components/ui/progress";
import { Stat, StatMeta } from "@/components/ui/stat";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { saleStats, productById } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Sale } from "@/types/customer";

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
  const navigate = useNavigate();
  const product = productById(sale.productId);
  const stat = saleStats(sale.id);
  const progress =
    stat.totalCount === 0 ? 0 : (stat.paidCount / stat.totalCount) * 100;

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="t-section text-main truncate">{product?.name}</h3>
          {product && (
            <StatPill
              label={product.category}
              color={CATEGORY_PILL[product.category] ?? "gray"}
            />
          )}
        </div>
        <StatusBadge status={stat.hasOverdue ? "OVERDUE" : "ACTIVE"} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Sold Price" value={formatCurrency(sale.soldPrice)} />
        <Stat label="Down Payment" value={formatCurrency(sale.downPayment)} />
        <Stat label="Monthly" value={formatCurrency(sale.monthlyAmount)} />
      </div>

      <div>
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

      <Separator />

      <div className="flex items-center justify-between">
        <StatMeta
          label="Next due"
          value={stat.nextDue ? formatDate(stat.nextDue) : "N/A"}
        />
        <Button
          variant="link"
          size="sm"
          className="p-0 t-meta-bold group"
          onClick={() =>
            navigate({
              to: "/sales/$id",
              params: { id: sale.id },
            })
          }
        >
          View Full Details
          <Icon.ArrowRight className="icon-front-hover" />
        </Button>
      </div>
    </Card>
  );
};
