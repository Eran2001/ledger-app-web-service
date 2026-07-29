import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CategoryPill } from "@/components/ui/category-pill";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from "@/components/ui/table";

import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import type { Product, ProductListProps } from "@/types/product-types";

export const ProductsTable = ({
  rows,
  isArchivedView,
  onEdit,
  onArchive,
  onUnarchive,
}: ProductListProps) => {
  return (
    <Table variant="main" layout="fixed">
      <colgroup>
        <col className="w-[22%]" />
        <col className="w-[14%]" />
        <col className="w-[14%]" />
        <col className="w-[12%]" />
        <col className="w-[12%]" />
        <col className="w-[14%]" />
        <col className="w-[12%]" />
      </colgroup>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Base Price</TableHead>
          <TableHead className="text-center">Active Sales</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableEmpty
            colSpan={7}
            icon={Icon.Search}
            title="No products found"
            description="No products match your search or filter."
          />
        ) : (
          rows.map((p: Product) => (
            <TableRow key={p.id} onClick={() => onEdit(p)}>
              <TableCell>
                <span className="table-title-text fw-semibold">{p.name}</span>
              </TableCell>
              <TableCell>
                <CategoryPill category={p.category} />
              </TableCell>
              <TableCell>
                <span className="table-text fw-bold text-main">
                  {formatCurrency(p.basePrice)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="table-text fw-semibold text-main">
                  {p.activeSales}
                </span>
              </TableCell>
              <TableCell>
                <span className="table-text">{formatDate(p.createdAt)}</span>
              </TableCell>
              <TableCell>
                <span className="table-text">{formatDate(p.updatedAt)}</span>
              </TableCell>
              <TableCell className="text-right">
                <div
                  className="flex items-center justify-end"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="focus-visible:shadow-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon.MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      onClick={(e) => e.stopPropagation()}
                      border
                      shadow
                    >
                      <DropdownMenuItem onClick={() => onEdit(p)}>
                        <Icon.Edit /> Edit
                      </DropdownMenuItem>
                      {isArchivedView ? (
                        <DropdownMenuItem onClick={() => onUnarchive(p.id)}>
                          <Icon.RotateCcw /> Activate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onArchive(p.id)}>
                          <Icon.Archive /> Archive
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
