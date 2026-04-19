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

const FormSkeleton = () => (
  <div className="space-y-4">
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full global-rounded" />
    </div>
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-20 w-full global-rounded" />
    </div>
  </div>
);

const MembersTableSkeleton = () => (
  <>
    <Skeleton className="h-4 w-16" />
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {["Name", "Role", "Status", "Action"].map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, rowIdx) => (
              <TableRow key={rowIdx} className="[&>td]:py-2">
                {Array.from({ length: 3 }).map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
                <TableCell>
                  <Skeleton className="h-7 w-7 global-rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </>
);

const EditGroupPlaceholderLoading = () => (
  <>
    <div className="py-8 px-6 overflow-y-auto flex-1 space-y-4">
      <FormSkeleton />
      <MembersTableSkeleton />
    </div>

    <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
      <Skeleton className="h-9 w-20 global-rounded" />
      <Skeleton className="h-9 w-20 global-rounded" />
    </div>
  </>
);

export default EditGroupPlaceholderLoading;