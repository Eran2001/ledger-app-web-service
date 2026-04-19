import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const FieldSkeleton = ({ labelWidth = "w-24" }: { labelWidth?: string }) => (
  <div className="space-y-2">
    <Skeleton className={`h-4 ${labelWidth}`} />
    <Skeleton className="h-10 w-full global-rounded" />
  </div>
);

const OrganizationPlaceholderLoading = () => (
  <Card>
    <CardContent className="p-6 space-y-6">

      <div className="flex items-center gap-4 p-4 global-rounded bg-muted/40 border border-border">
        <Skeleton className="h-16 w-16 global-rounded shrink-0" />
        <Skeleton className="h-9 w-28 global-rounded" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FieldSkeleton labelWidth="w-20" />
        <FieldSkeleton labelWidth="w-36" />
        <FieldSkeleton labelWidth="w-32" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-24 w-full global-rounded" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FieldSkeleton labelWidth="w-28" />
        <FieldSkeleton labelWidth="w-28" />
        <FieldSkeleton labelWidth="w-16" />
      </div>

      <FieldSkeleton labelWidth="w-32" />

      <div className="flex justify-end pt-4 border-t border-border">
        <Skeleton className="h-9 w-28 global-rounded" />
      </div>

    </CardContent>
  </Card>
);

export default OrganizationPlaceholderLoading;