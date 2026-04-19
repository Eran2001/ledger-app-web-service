import { Skeleton } from "@/components/ui/skeleton";

const AddMembersPlaceholderLoading = () => (
  <ul className="space-y-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <li key={i} className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-7 w-7 global-rounded shrink-0" />
      </li>
    ))}
  </ul>
);

export default AddMembersPlaceholderLoading;