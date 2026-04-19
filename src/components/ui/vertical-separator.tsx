import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

interface VerticalSeparatorProps {
  className?: string;
}

export const VerticalSeparator = ({ className }: VerticalSeparatorProps) => (
  <Separator orientation="vertical" className={cn("h-3.5 mr-3", className)} />
);