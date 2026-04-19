import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  direction = "bottom",
  modal = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  direction?: "left" | "right" | "bottom";
}) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    direction={direction}
    dismissible={false}
    modal={modal}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 drawer-overlay", className)}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

const drawerContentVariants = cva(
  "fixed z-50 bg-background border flex flex-col max-w-[80%] select-text **:select-text",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full w-80 border-l animate-in slide-in-from-right",
        left: "inset-y-0 left-0 h-full w-80 border-r animate-in slide-in-from-left",
        bottom:
          "inset-x-0 bottom-0 mt-24 rounded-t-sm animate-in slide-in-from-bottom",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
);

interface DrawerContentProps
  extends
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
  VariantProps<typeof drawerContentVariants> {
  isMobile?: boolean;
  onClose?: () => void;
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ side, isMobile = false, className, children, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <DrawerPrimitive.Portal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<unknown>).current = node;
        }}
        className={cn("group", drawerContentVariants({ side }), className)}
        onOpenAutoFocus={(e) => {
          e.preventDefault();

          const firstFocusable = contentRef.current?.querySelector<
            HTMLButtonElement | HTMLInputElement | HTMLElement
          >("input, button, select, textarea, [tabindex]:not([tabindex='-1'])");

          firstFocusable?.focus();
        }}
        {...props}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={props.onClose}
          className={`absolute h-9 w-9 ${isMobile
            ? "right-3 top-3 global-rounded p-2 hover:bg-muted"
            : "-left-11 text-white top-1 group-data-[state=closed]:hidden"
            }`}
        >
          ✕
        </Button>

        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

const DrawerHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="grid gap-1.5 border-b px-6 py-4" {...props} />
);

const DrawerFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mt-auto border-t px-6 py-4" {...props} />
);

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>((props, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className="drawer-title"
    {...props}
  />
));

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>((props, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className="text-sm text-muted-foreground"
    {...props}
  />
));

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
