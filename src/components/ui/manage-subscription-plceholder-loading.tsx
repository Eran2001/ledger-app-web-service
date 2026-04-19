import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const SubscriptionCardSkeleton = () => (
  <Card>
    <CardContent className="p-6 space-y-4">
      <Skeleton className="h-4 w-36" />
      <Separator />
      <div className="flex justify-between items-start">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3.5 w-36" />
        </div>
        <Skeleton className="h-8 w-24 global-rounded" />
      </div>
      <Skeleton className="h-3.5 w-52" />
    </CardContent>
  </Card>
);

const CardsGridSkeleton = () => (
  <Card>
    <CardContent className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-8 w-28 global-rounded" />
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-7 w-7 global-rounded" />
              </div>
              <Skeleton className="h-3.5 w-16" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-10" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
);

const InvoicesTableSkeleton = () => (
  <Card>
    <CardContent className="p-6 space-y-4">
      <Skeleton className="h-4 w-16" />
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <TableRow key={rowIdx} className="[&>td]:py-2">
              {Array.from({ length: 4 }).map((_, colIdx) => (
                <TableCell key={colIdx}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-1">
                  <Skeleton className="h-7 w-7 global-rounded" />
                  <Skeleton className="h-7 w-7 global-rounded" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const ManageSubscriptionPlaceholderLoading = () => (
  <div className="space-y-6">
    <SubscriptionCardSkeleton />
    <CardsGridSkeleton />
    <InvoicesTableSkeleton />
  </div>
);

export default ManageSubscriptionPlaceholderLoading;