import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const PlanCardSkeleton = () => (
  <div className="flex-1 p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-5 w-14 global-rounded" />
    </div>

    <div className="space-y-1">
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-20" />
    </div>

    <div className="space-y-1.5">
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-4/5" />
    </div>

    <Skeleton className="h-9 w-full global-rounded" />

    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 shrink-0 global-rounded" />
          <Skeleton className="h-3.5 w-full" />
        </div>
      ))}
    </div>
  </div>
);

const StartupPlansPlaceholderLoading = () => (
  <div className="flex flex-col items-center gap-6 mb-8">
    <Skeleton className="h-9 w-xs global-rounded" />

    <Card className="w-full">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-border">
          <PlanCardSkeleton />
          <PlanCardSkeleton />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StartupPlansPlaceholderLoading;