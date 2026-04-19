import { Skeleton } from "@/components/ui/skeleton";

interface GridPlaceholderLoadingProps {
  cardCount?: number;
  pageSize?: number;
}

const GridCardSkeleton = () => (
  <div className="border border-border global-rounded bg-card flex flex-col">
    <div className="flex-1 p-4 space-y-2">
      <div className="flex justify-end">
        <Skeleton className="h-5 w-14 global-rounded" />
      </div>

      <Skeleton className="h-5 w-3/4" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-3 shrink-0 global-rounded" />
        <Skeleton className="h-3 w-32" />
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-start gap-2">
          <Skeleton className="h-3 w-3 shrink-0 global-rounded mt-0.5" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 shrink-0 global-rounded" />
          <Skeleton className="h-3 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 shrink-0 global-rounded" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>

    <div className="flex justify-end gap-1 border-t border-border px-3 py-2">
      <Skeleton className="h-7 w-7 global-rounded" />
      <Skeleton className="h-7 w-7 global-rounded" />
    </div>
  </div>
);

const GridPlaceholderLoading = ({
  cardCount = 6,
  pageSize = 8,
}: GridPlaceholderLoadingProps) => {
  const showPagination = cardCount > pageSize;

  return (
    <div className="space-y-4">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: cardCount }).map((_, i) => (
          <GridCardSkeleton key={i} />
        ))}
      </div>

      {showPagination && (
        <div className="flex items-center justify-between px-1 py-3 border-t">
          <Skeleton className="h-4 w-36" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-7 global-rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridPlaceholderLoading;