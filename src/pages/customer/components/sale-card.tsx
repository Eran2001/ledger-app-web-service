import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { StatusBadge } from "@/components/ui/status-badge";
import { CategoryPill } from "@/components/ui/category-pill";
import { Progress } from "@/components/ui/progress";
import { Stat, StatMeta } from "@/components/ui/stat";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { productById } from "@/constant/product-data";
import { saleStats } from "@/constant/sale-data";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import type { Sale } from "@/types/sale-types";

export const SaleCard = ({
  sale,
  border = false,
  shadow = false,
}: {
  sale: Sale;
  border?: boolean;
  shadow?: boolean;
}) => {
  const navigate = useNavigate();
  const product = productById(sale.productId);
  const stat = saleStats(sale.id);
  const progress =
    stat.totalCount === 0 ? 0 : (stat.paidCount / stat.totalCount) * 100;

  return (
    <Card border={border} shadow={shadow}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="t-title-xl text-main truncate">{product?.name}</h3>
          {product && <CategoryPill category={product.category} />}
        </div>
        <StatusBadge status={stat.hasOverdue ? "OVERDUE" : "ACTIVE"} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Sold Price" value={formatCurrency(sale.soldPrice)} />
        <Stat label="Down Payment" value={formatCurrency(sale.downPayment)} />
        <Stat label="Monthly" value={formatCurrency(sale.monthlyAmount)} />
      </div>

      <div>
        <div className="flex items-center justify-between t-label-md text-soft mb-1.5">
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
        <StatMeta label="Next due" value={formatDate(stat.nextDue)} />
        <Button
          variant="link"
          className="p-0 t-body-md-bold group"
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
