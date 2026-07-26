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
  TableCellMedia,
  TableEmpty,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";

import { formatCurrency } from "@/utils/format-currency";
import type { CustomersTableProps } from "@/types/customer-types";

export const CustomersTable = ({ rows }: CustomersTableProps) => {
  const navigate = useNavigate();

  return (
    <Table variant="main" layout="fixed">
      <colgroup>
        <col className="w-[22%]" />
        <col className="w-[18%]" />
        <col className="w-[16%]" />
        <col className="w-[12%]" />
        <col className="w-[14%]" />
        <col className="w-[11%]" />
        <col className="w-[7%]" />
      </colgroup>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>NIC Number</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Active Sales</TableHead>
          <TableHead>Outstanding</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableEmpty
            colSpan={7}
            icon={Icon.Users}
            title="No customers found"
            description="No customers match your search or filter."
          />
        ) : (
          rows.map((c) => (
            <TableRow
              key={c.id}
              onClick={() =>
                navigate({ to: "/customers/$id", params: { id: c.id } })
              }
            >
              <TableCell>
                <TableCellMedia
                  name={c.fullName}
                  title={c.fullName}
                  subtitle={c.city}
                />
              </TableCell>
              <TableCell>{c.nic}</TableCell>
              <TableCell>{c.primary_phone}</TableCell>
              <TableCell>{c.activeSalesCount}</TableCell>
              <TableCell>
                {c.outstanding > 0 ? (
                  <span>{formatCurrency(c.outstanding)}</span>
                ) : (
                  <span>N/A</span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={c.status} />
              </TableCell>
              <TableCell>
                <div
                  className="flex items-center justify-end gap-2"
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
                            to: "/customers/$id",
                            params: { id: c.id },
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
          ))
        )}
      </TableBody>
    </Table>
  );
};
