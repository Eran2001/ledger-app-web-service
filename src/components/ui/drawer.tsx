import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { XIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/lib/utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-dropdown",
        "dialog-overlay",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        aria-describedby={undefined}
        tabIndex={-1}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement).focus();
        }}
        className={cn(
          "group/drawer-content fixed z-dropdown",
          "flex h-auto flex-col",
          "max-w-4/5",
          "drawer-content",
          "data-[vaul-drawer-direction=top]:inset-x-0",
          "data-[vaul-drawer-direction=top]:top-0",
          "data-[vaul-drawer-direction=top]:mb-24",
          "data-[vaul-drawer-direction=top]:max-h-[80vh]",
          "data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0",
          "data-[vaul-drawer-direction=bottom]:bottom-0",
          "data-[vaul-drawer-direction=bottom]:mt-24",
          "data-[vaul-drawer-direction=bottom]:max-h-[80vh]",
          "data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0",
          "data-[vaul-drawer-direction=right]:right-0",
          "data-[vaul-drawer-direction=right]:border-l",
          "data-[vaul-drawer-direction=left]:inset-y-0",
          "data-[vaul-drawer-direction=left]:left-0",
          "data-[vaul-drawer-direction=left]:border-r",
          className,
        )}
        {...props}
      >
        <VisuallyHidden>
          <DrawerPrimitive.Title>Drawer</DrawerPrimitive.Title>
          <DrawerPrimitive.Description>
            Drawer panel
          </DrawerPrimitive.Description>
        </VisuallyHidden>
        <div
          className={cn(
            "mx-auto mt-4 hidden",
            "h-2 w-25 shrink-0",
            "drawer-handle xl-rounded",
            "group-data-[vaul-drawer-direction=bottom]/drawer-content:block",
          )}
        />
        {showCloseButton && (
          <DrawerPrimitive.Close
            data-slot="drawer-close"
            className={cn(
              "absolute top-4 right-4",
              "flex size-8 items-center justify-center",
              "xl-rounded",
              "cursor-pointer",
              "disabled:pointer-events-none",
              "[&_svg]:pointer-events-none [&_svg]:shrink-0",
              "[&_svg:not([class*='size-'])]:size-4",
              "dialog-close-btn",
            )}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DrawerPrimitive.Close>
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4",
        "md:gap-1.5 md:text-left",
        "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center",
        "group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("t-title-lg-soft drawer-title", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("t-body-md fw-normal drawer-description", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
