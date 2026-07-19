import * as React from "react";

import * as Icon from "@/components/icons";
import { Input } from "@/components/ui/input";

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
      <span
        className="search-field-icon flex shrink-0 items-center justify-center cursor-pointer"
        onClick={(event) => {
          if (!onSearch) return;
          event.stopPropagation();
          onSearch();
        }}
      >
        <Icon.Search size={18} />
      </span>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "flex-1 min-w-0 h-field p-0",
          "surface-transparent no-border no-rounded no-shadow no-outline",
          "t-body-md search-field-input",
          className,
        )}
        {...props}
      />
      {value && (
        <span
          className="search-field-clear flex shrink-0 items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
        >
          <Icon.X size={18} />
        </span>
      )}
    </div>
  );
}
