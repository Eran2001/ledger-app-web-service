import * as React from "react";

import * as Icon from "@/components/icons";
import { Input } from "@/components/ui/input";

import { useWidth } from "@/hooks/use-width";
import { cn } from "@/lib/utils";

interface ExpandingSearchFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "size"
> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onSearch?: () => void;
  expandedWidth?: number;
  containerClassName?: string;
}

export function ExpandingSearchField({
  value,
  onChange,
  onClear,
  onSearch,
  placeholder = "Search…",
  expandedWidth = 280,
  containerClassName,
  className,
  ...props
}: ExpandingSearchFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { width, breakpoints } = useWidth();
  const isMobile = width < breakpoints.md;
  const [expandedState, setExpandedState] = React.useState(false);
  const expanded = isMobile || expandedState;

  const expand = () => {
    setExpandedState(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const collapseIfEmpty = () => {
    if (!isMobile && !value) setExpandedState(false);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    props.onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Enter") onSearch?.();
    if (event.key === "Escape" && !isMobile) {
      onChange("");
      setExpandedState(false);
      inputRef.current?.blur();
    }
  };

  const searchBox = (
    <div
      className={cn(
        "expanding-search-root global-rounded border-stroke border-input-default surface-background flex h-field items-center overflow-hidden",
        isMobile && "w-full gap-2 cursor-text px-3",
      )}
      style={
        isMobile
          ? undefined
          : {
              width: expanded ? expandedWidth : 40,
              paddingLeft: expanded ? 14 : 0,
              paddingRight: expanded ? 6 : 0,
              gap: expanded ? 8 : 0,
              justifyContent: expanded ? "flex-start" : "center",
              transition:
                "width var(--duration-slower) var(--ease-standard), padding var(--duration-slower) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
              cursor: expanded ? "text" : "pointer",
            }
      }
      onClick={() => {
        if (!expanded) expand();
      }}
    >
      <span
        className="expanding-search-icon icon-button flex shrink-0 items-center justify-center"
        onClick={(event) => {
          event.stopPropagation();
          if (!expanded) {
            expand();
            return;
          }
          onSearch?.();
        }}
      >
        <Icon.Search size={18} className="text-faint" />
      </span>

      {expanded && (
        <>
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={collapseIfEmpty}
            placeholder={placeholder}
            className={cn(
              "flex-1 min-w-0 h-field p-0",
              "surface-transparent no-border no-rounded no-shadow no-outline",
              "t-body-md expanding-search-input",
              className,
            )}
            {...props}
          />
          {value && (
            <span
              className="expanding-search-clear icon-button flex shrink-0 items-center justify-center cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleClear();
              }}
            >
              <Icon.X size={16} className="text-faint" />
            </span>
          )}
        </>
      )}
    </div>
  );

  if (isMobile) {
    return <div className={cn(containerClassName)}>{searchBox}</div>;
  }

  return (
    <div className={cn("relative h-field w-field shrink-0", containerClassName)}>
      <div className="absolute top-0 left-0 z-dropdown">{searchBox}</div>
    </div>
  );
}
