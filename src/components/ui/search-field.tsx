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
  size?: "default" | "compact";
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
        size === "compact" ? "h-8 gap-1.5 px-2.5" : "h-field gap-2 px-3",
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
          <Icon.Search className="size-4 search-field-icon" />
        </Button>
      ) : (
        <Icon.Search className="size-4 shrink-0 search-field-icon" />
      )}
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "flex-1 min-w-0 h-full p-0 surface-transparent no-border no-rounded no-shadow no-outline t-meta search-field-input",
          size === "compact" && "search-field-input-compact",
          className,
        )}
        {...props}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          className={cn(
            "shrink-0 search-field-clear",
            size === "compact" && "size-6",
          )}
          aria-label="Clear search"
        >
          <Icon.X className={cn(size === "compact" ? "size-3.5" : "size-4")} />
        </Button>
      )}
    </div>
  );
}
