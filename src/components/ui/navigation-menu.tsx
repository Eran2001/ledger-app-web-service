import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      delayDuration={0}
      skipDelayDuration={0}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = (size: ResponsiveSize = "default") =>
  cn(
    "group inline-flex w-max items-center justify-center",
    "xl-rounded fw-medium",
    size === "compact"
      ? "h-compact px-3 py-1.5 t-label-md"
      : size === "large"
        ? "h-large px-5 py-2.5 t-body-md"
        : size === "extra-large"
          ? "h-extra-large px-6 py-3 t-body-lg"
          : "h-field px-4 py-2 t-body-md",
    "nav-menu-trigger",
  );

function NavigationMenuTrigger({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> & {
  size?: ResponsiveSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        navigationMenuTriggerStyle(resolvedSize),
        "group",
        className,
      )}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-px ml-1 size-3"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

interface NavMenuContentItem {
  title: string;
  desc: string;
  to: string;
}

interface NavigationMenuContentProps extends React.ComponentProps<
  typeof NavigationMenuPrimitive.Content
> {
  items?: NavMenuContentItem[];
}

function NavigationMenuContent({
  className,
  items,
  children,
  ...props
}: NavigationMenuContentProps) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full p-0 pr-0.5 md:absolute md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
        "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        "group-data-[viewport=false]/navigation-menu:top-full",
        "group-data-[viewport=false]/navigation-menu:mt-1.5",
        "group-data-[viewport=false]/navigation-menu:duration-200",
        "group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in",
        "group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out",
        "group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
        "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95",
        "group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0",
        "group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0",
        "nav-menu-content xl-rounded",
        className,
      )}
      {...props}
    >
      {items ? (
        <ul className="grid gap-1 p-1 w-56">
          {items.map((item) => (
            <li key={item.to}>
              <NavigationMenuLink href={item.to}>
                <div className="t-body-md fw-medium">{item.title}</div>
                <p className="t-label-md">{item.desc}</p>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      ) : (
        children
      )}
    </NavigationMenuPrimitive.Content>
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-0 isolate z-dropdown flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-1.5 w-full overflow-hidden",
          "xl-rounded",
          "origin-top-center",
          "h-(--radix-navigation-menu-viewport-height)",
          "md:w-(--radix-navigation-menu-viewport-width)",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "nav-menu-viewport",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  size,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link> & {
  size?: ResponsiveSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 md-rounded",
        resolvedSize === "compact"
          ? "p-1.5 t-label-md"
          : resolvedSize === "large"
            ? "p-2.5 t-body-md"
            : resolvedSize === "extra-large"
              ? "p-3 t-body-lg"
              : "p-2 t-body-md",
        "[&_svg:not([class*='size-'])]:size-4",
        "nav-menu-link",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
        "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    >
      <div className="nav-menu-indicator-arrow relative top-[60%] h-2 w-2 rotate-45" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
