import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import * as Icon from "@/components/icons";

import { cn } from "@/lib/utils";

const NavigationMenuContext = React.createContext<{ viewport: boolean }>({
  viewport: true,
});

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
      <NavigationMenuContext.Provider value={{ viewport }}>
        {children}
        {viewport && <NavigationMenuViewport />}
      </NavigationMenuContext.Provider>
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

const navigationMenuTriggerStyle = () =>
  cn(
    "group inline-flex w-max items-center justify-center",
    "global-rounded h-field px-4 py-2 t-body-md fw-medium",
    "nav-menu-trigger",
  );

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <Icon.ChevronDownIcon
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
  const { viewport } = React.useContext(NavigationMenuContext);
  const inlinePanel = !viewport;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [openUpward, setOpenUpward] = React.useState(false);

  const updatePlacement = React.useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    if (!inlinePanel) {
      setOpenUpward(false);
      return;
    }

    const item = content.closest<HTMLElement>(
      '[data-slot="navigation-menu-item"]',
    );
    const trigger = item?.querySelector<HTMLElement>(
      '[data-slot="navigation-menu-trigger"]',
    );
    if (!trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const contentHeight =
      content.getBoundingClientRect().height || content.scrollHeight;
    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const shouldOpenUpward =
      spaceBelow < contentHeight + 16 && spaceAbove > spaceBelow;

    setOpenUpward(shouldOpenUpward);
  }, [inlinePanel]);

  React.useLayoutEffect(() => {
    updatePlacement();
    const rafId = window.requestAnimationFrame(updatePlacement);
    const content = contentRef.current;
    if (!content) {
      return () => window.cancelAnimationFrame(rafId);
    }

    const resizeObserver = new ResizeObserver(updatePlacement);
    resizeObserver.observe(content);

    const mutationObserver = new MutationObserver(updatePlacement);
    mutationObserver.observe(content, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [updatePlacement]);

  return (
    <NavigationMenuPrimitive.Content
      ref={contentRef}
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full p-0 pr-0.5 z-dropdown md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
        "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        inlinePanel && "absolute left-0 duration-200",
        inlinePanel &&
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
        inlinePanel &&
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        inlinePanel &&
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        inlinePanel && !openUpward && "top-full mt-1.5",
        inlinePanel && openUpward && "top-auto bottom-full mb-1.5",
        "nav-menu-content global-rounded",
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
          "global-rounded",
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
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "global-rounded flex flex-col gap-1 p-2 t-body-md",
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
        "top-full z-dropdown flex h-1.5 items-end justify-center overflow-hidden",
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
