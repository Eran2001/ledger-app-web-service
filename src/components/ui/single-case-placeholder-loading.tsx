import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfileSkeleton = () => (
  <Card className="border-border/50 shadow-none">
    <CardContent className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-19 h-19 global-rounded shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-16 global-rounded" />
              <Skeleton className="h-5 w-16 global-rounded" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-3.5 w-28" />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex gap-2 shrink-0">
          <Skeleton className="h-8 w-36 global-rounded" />
          <Skeleton className="h-8 w-28 global-rounded" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const CustomerBehaviorSkeleton = () => (
  <div className="space-y-4">
    <Card className="border-border/50 shadow-none">
      <CardHeader className="py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 global-rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="border-l-4 border-border/40 pl-3 space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          {/* <Skeleton className="h-3.5 w-5/6" /> */}
          {/* <Skeleton className="h-3.5 w-4/6" /> */}
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="global-rounded px-4 py-3 flex items-center justify-between border bg-muted/30">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 global-rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-6" />
        </div>
      ))}
    </div>
  </div>
);

const TimelineSkeleton = () => (
  <Card className="border-border/50 shadow-none">
    <CardHeader className="py-3">
      <Skeleton className="h-4 w-28" />
    </CardHeader>
    <CardContent className="space-y-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="py-3 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Skeleton className="w-10 h-10 global-rounded shrink-0" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 global-rounded" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
          <Skeleton className="h-3.5 w-24" />
        </div>
      ))}
    </CardContent>
  </Card>
);

const RightSidebarSkeleton = () => (
  <div className="space-y-4">
    <Card className="border-border shadow-none overflow-hidden p-0">
      <div className="bg-muted/20 px-4 pt-4 pb-5 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 global-rounded" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="space-y-2 global-rounded p-3 bg-muted/20">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="flex justify-between pt-1">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-5 w-20 global-rounded" />
          </div>
        </div>
      </div>
      <div className="bg-card px-4 py-3">
        <Skeleton className="h-8 w-full global-rounded" />
      </div>
    </Card>

    <Card className="border-border/50 shadow-none">
      <CardHeader className="py-3">
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-16" />
          </div>
          <Skeleton className="h-1.5 w-full global-rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3.5 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card className="border-border/50 shadow-none">
      <CardHeader className="py-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3.5 w-12" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-7 h-7 global-rounded shrink-0" />
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="space-y-1 items-end flex flex-col">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-4 w-16 global-rounded" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="border-border/50 shadow-none">
      <CardHeader className="py-3">
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 global-rounded shrink-0" />
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-7 w-7 global-rounded" />
              <Skeleton className="h-7 w-7 global-rounded" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

const ManualCallSkeleton = () => (
  <Card className="border-border/50 shadow-none">
    <div className="w-full flex items-center justify-between px-4 py-3">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-5 w-5 rounded-sm" />
    </div>
  </Card>
);

const SingleCasePlaceholderLoading = () => (
  <div className="overflow-y-auto h-full">
    <div className="px-6 pt-6">
      <ProfileSkeleton />
    </div>

    <div className="grid grid-cols-12 gap-4 px-6 py-4">
      <div className="col-span-12 xl:col-span-8 space-y-4">
        <CustomerBehaviorSkeleton />
        <TimelineSkeleton />
      </div>

      <div className="col-span-12 xl:col-span-4">
        <div className="sticky top-0 space-y-4">
          <ManualCallSkeleton />
          <RightSidebarSkeleton />
        </div>
      </div>
    </div>
  </div>
);

export default SingleCasePlaceholderLoading;