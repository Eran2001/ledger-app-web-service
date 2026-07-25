import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import * as Icon from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

function Command({
  className,
  border = false,
  shadow = false,
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & {
  border?: boolean;
  shadow?: boolean;
}) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "surface-card flex h-full w-full flex-col overflow-hidden global-rounded",
        "command-root has-focus-ring",
        border && "border-stroke border-input-default",
        shadow && "shadow-card",
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
  border = false,
  shadow = false,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  border?: boolean;
  shadow?: boolean;
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
          border={border}
          shadow={shadow}
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
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-field items-center gap-2 border-b-stroke border-input-default px-3"
    >
      <Icon.SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-full w-full t-body-md",
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
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-pointer select-none",
        "items-center gap-2",
        "global-rounded no-outline",
        "px-2 py-1.5 t-body-md",
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
