import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
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

import { formatCurrency } from "@/utils/format-currency";

export interface OverdueRow {
  id: string;
  saleId: string;
  customerName: string;
  productName: string;
  daysOverdue: number;
  amount: number;
}

interface OverdueAgingTableProps {
  rows: OverdueRow[];
}

export const OverdueAgingTable = ({ rows }: OverdueAgingTableProps) => {
  const navigate = useNavigate();
  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <Table
      variant="simple"
      caption="Overdue Aging"
      statLabel={`${rows.length} Overdue · ${formatCurrency(totalAmount)}`}
      statColor="red"
      border
      shadow
    >
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Days Overdue</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableEmpty
            colSpan={5}
            icon={Icon.CheckCircle2}
            title="No overdue installments"
            description="All installments are on track."
          />
        ) : (
          rows.slice(0, 10).map((r) => {
            const sevText =
              r.daysOverdue > 60 ? "text-danger" : "text-warning-role";
            return (
              <TableRow
                key={r.id}
                onClick={() =>
                  navigate({ to: "/sales/$id", params: { id: r.saleId } })
                }
              >
                <TableCell>{r.customerName}</TableCell>
                <TableCell>{r.productName}</TableCell>
                <TableCell className={`fw-black ${sevText}`}>
                  {r.daysOverdue} days
                </TableCell>
                <TableCell className="fw-bold">
                  {formatCurrency(r.amount)}
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
                        <DropdownMenuItem
                          onClick={() =>
                            navigate({
                              to: "/sales/$id",
                              params: { id: r.saleId },
                            })
                          }
                        >
                          <Icon.Eye /> View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
