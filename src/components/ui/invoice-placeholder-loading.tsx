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

const SummaryCardsSkeleton = () => (
  <div className="grid grid-cols-3 gap-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="global-rounded border bg-muted/30 p-3 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-28" />
      </div>
    ))}
  </div>
);

const LineItemsSkeleton = () => (
  <div>
    <Skeleton className="h-3 w-20 my-3" />
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, rowIdx) => (
              <TableRow key={rowIdx} className="[&>td]:py-3">
                {Array.from({ length: 4 }).map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

const InvoicePlaceholderLoading = () => (
  <div className="p-6 overflow-y-auto flex-1 space-y-6">
    <SummaryCardsSkeleton />

    <div className="flex gap-2">
      <Skeleton className="h-8 w-20 global-rounded" />
      <Skeleton className="h-8 w-16 global-rounded" />
    </div>

    <LineItemsSkeleton />
  </div>
);

export default InvoicePlaceholderLoading;