import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import * as Icon from "@/components/icons";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

import { formatCurrency } from "@/utils/format-currency";
import type { CustomersTableProps, EnrichedCustomer } from "@/types/customer-types";

const columns: ColumnDef<EnrichedCustomer>[] = [
  { accessorKey: "fullName", header: "Customer" },
  { accessorKey: "nic", header: "NIC Number" },
  { accessorKey: "primary_phone", header: "Phone" },
  { accessorKey: "activeSalesCount", header: "Active Sales" },
  {
    accessorKey: "outstanding",
    header: "Outstanding",
    cell: ({ getValue }) => {
      const outstanding = getValue<number>();
      return outstanding > 0 ? formatCurrency(outstanding) : "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <StatusBadge status={getValue<EnrichedCustomer["status"]>()} />
    ),
  },
];

export const CustomersTanstackTable = ({ rows }: CustomersTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={rows}
      emptyState={{
        icon: Icon.Users,
        title: "No customers found",
        description: "No customers match your search or filter.",
      }}
      enableGlobalFilter={false}
      onRowClick={(row) =>
        navigate({ to: "/customers/$id", params: { id: row.id } })
      }
    />
  );
};
