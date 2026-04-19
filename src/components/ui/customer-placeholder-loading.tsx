import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CustomerProfileSkeleton = () => (
  <div className="flex flex-col lg:flex-row lg:items-center gap-4 pb-4 border-b border-border">
    <div className="flex items-center gap-3 shrink-0 lg:pr-6">
      <Skeleton className="w-17.5 h-17.5 global-rounded shrink-0" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-32 global-rounded" />
          <Skeleton className="h-5 w-20 global-rounded" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-24 global-rounded" />
          <Skeleton className="h-5 w-20 global-rounded" />
          <Skeleton className="h-5 w-16 global-rounded" />
        </div>
      </div>
    </div>

    <div className="hidden lg:block w-px self-stretch bg-border" />

    <div className="flex flex-col gap-2 flex-1 lg:px-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-3 w-20 shrink-0" />
          <Skeleton className="h-3 w-24 shrink-0" />
          <Skeleton className="h-2 flex-1 global-rounded" />
        </div>
      ))}
    </div>

    <div className="hidden lg:block w-px self-stretch bg-border" />

    <div className="flex lg:flex-col gap-3 lg:gap-2 lg:items-end lg:pl-6 shrink-0">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  </div>
);

const CustomerAccountSkeleton = () => (
  <Card className="border-border/50 shadow-none">
    <CardContent className="py-4 px-5 space-y-3">
      <Skeleton className="h-4 w-32" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </CardContent>
  </Card>
);

const TableRowsSkeleton = ({ cols, rows = 4 }: { cols: number; rows?: number; }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {Array.from({ length: cols }).map((_, i) => (
          <TableHead key={i}>
            <Skeleton className="h-4 w-20" />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <TableRow key={rowIdx} className="[&>td]:py-3">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <TableCell key={colIdx}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const CustomerAttachmentsSkeleton = () => (
  <Card className="border-border/50 shadow-none">
    <CardContent className="py-2 px-6">
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-8 w-16 global-rounded" />
        <Skeleton className="h-8 w-36 global-rounded" />
      </div>

      <TableRowsSkeleton cols={3} rows={4} />

      <div className="px-4 py-3">
        <Skeleton className="h-3 w-40" />
      </div>
    </CardContent>
  </Card>
);

const CustomerPlaceholderLoading = () => (
  <div className="overflow-y-auto h-full p-6 space-y-6">
    <CustomerProfileSkeleton />

    <div className="flex gap-2">
      <Skeleton className="h-8 w-20 global-rounded" />
    </div>

    <div className="grid grid-cols-10 gap-6">
      <div className="col-span-3 max-lg:col-span-10">
        <CustomerAccountSkeleton />
      </div>
      <div className="col-span-7 max-lg:col-span-10">
        <CustomerAttachmentsSkeleton />
      </div>
    </div>
  </div>
);

export default CustomerPlaceholderLoading;