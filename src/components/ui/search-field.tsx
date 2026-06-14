import * as React from "react";

import * as Icon from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface SearchFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "size"
> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onSearch?: () => void;
  containerClassName?: string;
  size?: "default" | "compact" | "large";
}

export function SearchField({
  value,
  onChange,
  onClear,
  onSearch,
  placeholder = "Search…",
  containerClassName,
  className,
  size = "default",
  ...props
}: SearchFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    props.onKeyDown?.(event);

    if (!event.defaultPrevented && event.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center w-full cursor-text search-field-root",
        size === "compact"
          ? "h-compact gap-1.5 px-2.5"
          : size === "large"
            ? "h-large gap-2.5 px-4"
            : "h-field gap-2 px-3",
        containerClassName,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {onSearch ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 search-field-icon-btn"
          onClick={(event) => {
            event.stopPropagation();
            onSearch();
          }}
          aria-label="Search"
        >
          <Icon.Search
            className={cn(
              size === "large" ? "icon-large" : "icon-default",
              "search-field-icon",
            )}
          />
        </Button>
      ) : (
        <Icon.Search
          className={cn(
            size === "large" ? "icon-large" : "icon-default",
            "shrink-0 search-field-icon",
          )}
        />
      )}
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "flex-1 min-w-0 h-full p-0",
          "surface-transparent no-border no-rounded no-shadow no-outline",
          "t-meta search-field-input",
          size === "compact" && "search-field-input-compact",
          size === "large" && "search-field-input-large",
          className,
        )}
        {...props}
      />
      {value && (
        <Icon.X
          className={cn(
            size === "large"
              ? "icon-large"
              : size === "compact"
                ? "icon-compact"
                : "icon-default",
            "shrink-0 search-field-clear cursor-pointer",
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
        />
      )}
    </div>
  );
}
