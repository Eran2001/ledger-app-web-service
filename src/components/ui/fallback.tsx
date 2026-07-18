import { cn } from "@/lib/utils";

function Fallback({
  className,
  children = "-",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="fallback"
      className={cn("t-label-md text-faint", className)}
      {...props}
    >
      {children}
    </span>
  );
}

export { Fallback };
