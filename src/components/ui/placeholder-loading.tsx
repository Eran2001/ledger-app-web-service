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

interface PlaceHolderLoadingProps {
  statCardCount?: 0 | 1 | 2 | 3 | 4 | 5;
  tabCount?: number;
  rightIconCount?: number;
  columnCount?: number;
  rowCount?: number;
}

const StatCardSkeleton = () => (
  <Card className="border-l-4 border-l-muted shadow-card">
    <CardContent className="py-4 px-4 flex flex-row items-center justify-between gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-20" />
      </div>
      <Skeleton className="w-12 h-12 global-rounded shrink-0" />
    </CardContent>
  </Card>
);

interface ToolbarSkeletonProps {
  tabCount: number;
  rightIconCount: number;
}

const ToolbarSkeleton = ({ tabCount, rightIconCount }: ToolbarSkeletonProps) => (
  <div className="px-4 pt-4 pb-3 border-b flex items-center gap-3 flex-wrap">
    <Skeleton className="h-10 w-72 global-rounded" />

    <div className="flex items-center gap-2 flex-1">
      {Array.from({ length: tabCount }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-24 global-rounded" />
      ))}
    </div>

    <div className="flex items-center gap-2 ml-auto">
      {Array.from({ length: rightIconCount }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 global-rounded" />
      ))}
    </div>
  </div>
);

interface TableContentSkeletonProps {
  columnCount: number;
  rowCount: number;
}

const TableContentSkeleton = ({ columnCount, rowCount }: TableContentSkeletonProps) => (
  <>
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columnCount }).map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-24" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIdx) => (  // was hardcoded 10
          <TableRow key={rowIdx}>
            {Array.from({ length: columnCount }).map((_, colIdx) => (
              <TableCell key={colIdx}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <div className="flex items-center justify-between px-4 py-3 border-t">
      <Skeleton className="h-4 w-36" />
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 global-rounded" />
        ))}
      </div>
    </div>
  </>
);

const PlaceHolderLoading = ({
  statCardCount = 4,
  tabCount = 5,
  rightIconCount = 2,
  columnCount = 7,
  rowCount = 10,
}: PlaceHolderLoadingProps) => {
  const hasStatCards = statCardCount > 0;

  return (
    <div className={hasStatCards ? "space-y-4" : ""}>
      {hasStatCards && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: statCardCount }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <ToolbarSkeleton tabCount={tabCount} rightIconCount={rightIconCount} />
          <TableContentSkeleton columnCount={columnCount} rowCount={rowCount} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceHolderLoading;