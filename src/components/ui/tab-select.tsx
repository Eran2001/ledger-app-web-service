import * as React from "react";
import * as Icon from "@/components/icons";
import { cn } from "@/lib/utils";

type TabItem = {
  value: string;
  label: React.ReactNode;
  icon?: React.ElementType<{ className?: string }>;
  badge?: React.ReactNode;
};

export function TabSelect({
  tabs,
  value,
  onValueChange,
  children,
}: {
  tabs: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = React.useState(false);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    const maxScrollLeft = Math.max(node.scrollWidth - node.clientWidth, 0);

    setHasOverflow(maxScrollLeft > 1);
    setCanScrollLeft(node.scrollLeft > 1);
    setCanScrollRight(node.scrollLeft < maxScrollLeft - 1);
  }, []);

  React.useEffect(() => {
    updateScrollState();

    const node = scrollRef.current;
    if (!node) return;

    const handleScroll = () => updateScrollState();
    const resizeObserver = new ResizeObserver(() => updateScrollState());

    node.addEventListener("scroll", handleScroll, { passive: true });
    resizeObserver.observe(node);

    const tabList = node.firstElementChild;
    if (tabList instanceof HTMLElement) {
      resizeObserver.observe(tabList);
    }

    return () => {
      node.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  React.useEffect(() => {
    const node = scrollRef.current;
    const activeTab = node?.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]',
    );

    activeTab?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });

    updateScrollState();
  }, [value, updateScrollState]);

  const scrollTabs = React.useCallback((direction: "left" | "right") => {
    const node = scrollRef.current;
    if (!node) return;

    const amount = Math.max(node.clientWidth * 0.6, 180);

    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 items-stretch gap-2 md:gap-3">
        <button
          type="button"
          aria-label="Scroll tabs left"
          onClick={() => scrollTabs("left")}
          disabled={!canScrollLeft}
          className={cn(
            "hidden h-field w-field shrink-0 items-center justify-center border-b-stroke border-default text-soft transition hover:text-main disabled:pointer-events-none disabled:opacity-40 md:inline-flex",
            !hasOverflow && "md:hidden",
          )}
        >
          <Icon.ChevronLeft className="icon-default" />
        </button>

        <div
          ref={scrollRef}
          className="min-w-0 flex-1 overflow-x-auto hide-scrollbar scroll-smooth"
        >
          <div
            role="tablist"
            className="flex w-max min-w-full border-b-stroke border-default"
          >
            {tabs.map((t) => (
              <button
                key={t.value}
                type="button"
                role="tab"
                aria-selected={value === t.value}
                onClick={() => onValueChange(t.value)}
                className={cn(
                  "tab-trigger inline-flex h-field shrink-0 items-center px-5 whitespace-nowrap border-b-stroke t-body-md-bold",
                  value === t.value && "surface-muted t-rounded",
                )}
              >
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  {t.icon ? <t.icon className="icon-default shrink-0" /> : null}
                  <span className="whitespace-nowrap">{t.label}</span>
                  {t.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Scroll tabs right"
          onClick={() => scrollTabs("right")}
          disabled={!canScrollRight}
          className={cn(
            "hidden h-field w-field shrink-0 items-center justify-center border-b-stroke border-default text-soft transition hover:text-main disabled:pointer-events-none disabled:opacity-40 md:inline-flex",
            !hasOverflow && "md:hidden",
          )}
        >
          <Icon.ChevronRight className="icon-default" />
        </button>
      </div>
      {children}
    </div>
  );
}

export function TabPanel({
  value,
  active,
  className,
  children,
}: {
  value: string;
  active: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (value !== active) return null;
  return <div className={cn("pt-6", className)}>{children}</div>;
}
