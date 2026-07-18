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
}

export function SearchField({
  value,
  onChange,
  onClear,
  onSearch,
  placeholder = "Search…",
  containerClassName,
  className,
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
        "search-field-root global-rounded border-stroke flex h-field w-full cursor-text items-center gap-2 px-3",
        containerClassName,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {onSearch ? (
        <Button
          type="button"
          variant="ghost"
          className="search-field-icon-btn h-compact w-compact shrink-0"
          onClick={(event) => {
            event.stopPropagation();
            onSearch();
          }}
          aria-label="Search"
        >
          <span className="search-field-icon flex items-center justify-center">
            <Icon.Search />
          </span>
        </Button>
      ) : (
        <span className="search-field-icon flex shrink-0 items-center justify-center">
          <Icon.Search />
        </span>
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
          "t-body-md search-field-input",
          className,
        )}
        {...props}
      />
      {value && (
        <span
          className="search-field-clear flex shrink-0 cursor-pointer items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
        >
          <Icon.X />
        </span>
      )}
    </div>
  );
}
