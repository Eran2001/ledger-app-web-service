import { Skeleton } from "@/components/ui/skeleton";

const SectionHeaderSkeleton = () => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-5 global-rounded" />
      <Skeleton className="h-5 w-40" />
    </div>
    <Skeleton className="h-8 w-20 global-rounded" />
  </div>
);

const FieldSkeleton = ({ labelWidth = "w-24" }: { labelWidth?: string }) => (
  <div className="space-y-1.5">
    <Skeleton className={`h-4 ${labelWidth}`} />
    <Skeleton className="h-10 w-full global-rounded" />
  </div>
);

export const AIGeneralSettingsPlaceholderLoading = () => (
  <div className="space-y-6">
    <SectionHeaderSkeleton />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FieldSkeleton labelWidth="w-24" />
      <FieldSkeleton labelWidth="w-20" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FieldSkeleton labelWidth="w-20" />
      <FieldSkeleton labelWidth="w-16" />
    </div>

    <div className="space-y-4">
      <Skeleton className="h-4 w-36" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <FieldSkeleton labelWidth="w-28" />
        <FieldSkeleton labelWidth="w-44" />
        <FieldSkeleton labelWidth="w-52" />
      </div>
    </div>

    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <div className="border global-rounded overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-b last:border-0">
            <Skeleton className="h-4 w-4 global-rounded shrink-0" />
            <Skeleton className="h-4 w-24 shrink-0" />
            <Skeleton className="h-8 w-24 global-rounded" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-8 w-24 global-rounded" />
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-32 global-rounded" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-10 w-32 global-rounded" />
      </div>
    </div>

    <div className="flex justify-end">
      <Skeleton className="h-9 w-20 global-rounded" />
    </div>
  </div>
);

export const AIWorkFlowPlaceholderLoading = () => (
  <div className="space-y-6">
    <SectionHeaderSkeleton />

    <div className="border global-rounded p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-6 w-10 global-rounded" />
      </div>
    </div>

    <div className="border global-rounded p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-6 w-10 global-rounded" />
      </div>
    </div>

    <div className="border global-rounded p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-6 w-10 global-rounded" />
      </div>
    </div>

    <div className="flex justify-end">
      <Skeleton className="h-9 w-20 global-rounded" />
    </div>
  </div>
);

export const AIAgentConfigPlaceholderLoading = () => (
  <div className="space-y-4">
    <SectionHeaderSkeleton />

    <div className="flex justify-center">
      <Skeleton className="h-9 w-96 global-rounded" />
    </div>

    <FieldSkeleton labelWidth="w-24" />

    <div className="grid sm:grid-cols-2 gap-4">
      <FieldSkeleton labelWidth="w-20" />
      <FieldSkeleton labelWidth="w-12" />
    </div>

    <div className="flex justify-end">
      <Skeleton className="h-9 w-20 global-rounded" />
    </div>
  </div>
);