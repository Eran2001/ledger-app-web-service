import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type TableOptions,
} from "@tanstack/react-table";

import * as Icon from "@/components/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from "@/components/ui/table";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

interface DataTableEmptyState {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyState: DataTableEmptyState;
  onRowClick?: (row: TData) => void;
  enableSorting?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnVisibility?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
  options?: Partial<TableOptions<TData>>;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  emptyState,
  onRowClick,
  enableSorting = true,
  enableGlobalFilter = true,
  enableColumnVisibility = true,
  enablePagination = true,
  pageSize = 10,
  searchPlaceholder = "Search…",
  options,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    enableSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    initialState: { pagination: { pageSize, pageIndex: 0 } },
    ...options,
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      {(enableGlobalFilter || enableColumnVisibility) && (
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          searchPlaceholder={searchPlaceholder}
          showSearch={enableGlobalFilter}
          showColumnVisibility={enableColumnVisibility}
        />
      )}

      <Table variant="main">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortable = enableSorting && header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className={sortable ? "cursor-pointer select-none" : undefined}
                    onClick={
                      sortable
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {sortable && sorted === "asc" && (
                        <Icon.ArrowUp className="icon-compact text-faint" />
                      )}
                      {sortable && sorted === "desc" && (
                        <Icon.ArrowDown className="icon-compact text-faint" />
                      )}
                      {sortable && !sorted && (
                        <Icon.ArrowUpDown className="icon-compact text-faint" />
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableEmpty
              colSpan={table.getAllLeafColumns().length}
              icon={emptyState.icon}
              title={emptyState.title}
              description={emptyState.description}
            />
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                className={onRowClick ? "cursor-pointer" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {enablePagination && <DataTablePagination table={table} />}
    </div>
  );
};
