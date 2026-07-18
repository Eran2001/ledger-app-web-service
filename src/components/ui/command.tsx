import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden md-rounded border",
        "command-root has-focus-ring",
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command
          className={cn(
            "**:[[cmdk-group-heading]]:px-2",
            "**:[[cmdk-group]]:px-2",
            "[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0",
            "[&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5",
            "**:data-[slot=command-input-wrapper]:h-12",
            "**:[[cmdk-input]]:h-12",
            "**:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3",
            "[&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  size,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  size?: ResponsiveSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        "flex items-center gap-2 border-b",
        resolvedSize === "compact"
          ? "h-compact px-2.5"
          : resolvedSize === "large"
            ? "h-large px-4"
            : resolvedSize === "extra-large"
              ? "h-extra-large px-5"
              : "h-field px-3",
      )}
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-full w-full",
          resolvedSize === "compact"
            ? "t-label-md"
            : resolvedSize === "extra-large"
              ? "t-body-lg"
              : "t-body-md",
          "no-outline",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "command-input",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-75 scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="t-body-md py-6 text-center"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1",
        "**:[[cmdk-group-heading]]:px-2",
        "**:[[cmdk-group-heading]]:py-1.5",
        "command-group",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px", "command-separator", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  size,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
  size?: ResponsiveSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-pointer select-none",
        "items-center gap-2",
        "md-rounded no-outline",
        resolvedSize === "compact"
          ? "px-2 py-1 t-label-md"
          : resolvedSize === "large"
            ? "px-3 py-2 t-body-md"
            : resolvedSize === "extra-large"
              ? "px-4 py-2.5 t-body-lg"
              : "px-2 py-1.5 t-body-md",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "command-item",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto t-label-md",
        "[letter-spacing:var(--tracking-widest)]",
        "command-shortcut",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
