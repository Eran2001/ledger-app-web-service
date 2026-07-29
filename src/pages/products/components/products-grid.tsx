import * as Icon from "@/components/icons";
import { CategoryPill } from "@/components/ui/category-pill";
import {
  Grid,
  GridItem,
  GridItemHeader,
  GridItemAction,
  GridEmpty,
} from "@/components/ui/grid";

import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import type { Product, ProductListProps } from "@/types/product-types";

export const ProductsGrid = ({
  rows,
  isArchivedView,
  onEdit,
  onArchive,
  onUnarchive,
}: ProductListProps) => {
  if (rows.length === 0) {
    return (
      <Grid>
        <GridEmpty
          icon={Icon.Search}
          title="No products found"
          description="No products match your search or filter."
          border
          shadow
        />
      </Grid>
    );
  }

  return (
    <Grid>
      {rows.map((p: Product) => (
        <GridItem key={p.id} border shadow>
          <GridItemHeader>
            <div className="min-w-0 flex-1">
              <span className="table-title-text fw-semibold">{p.name}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <GridItemAction onClick={() => onEdit(p)}>
                <Icon.Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </GridItemAction>
              {isArchivedView ? (
                <GridItemAction onClick={() => onUnarchive(p.id)}>
                  <Icon.RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Activate</span>
                </GridItemAction>
              ) : (
                <GridItemAction
                  onClick={() => onArchive(p.id)}
                  className="surface-danger-soft-hover hover:text-danger"
                >
                  <Icon.Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </GridItemAction>
              )}
            </div>
          </GridItemHeader>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <CategoryPill category={p.category} />
            <span className="table-text fw-bold text-main">
              {formatCurrency(p.basePrice)}
            </span>
            <span className="table-text fw-semibold text-main">
              {p.activeSales}
            </span>
            <span className="table-text">{formatDate(p.createdAt)}</span>
            <span className="table-text">{formatDate(p.updatedAt)}</span>
          </div>
        </GridItem>
      ))}
    </Grid>
  );
};
