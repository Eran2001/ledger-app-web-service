import { useState, type ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DUMMY_LOADING_MS = 500;

interface IconActionButtonProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  tone: "success" | "destructive";
  onAction: () => void;
}

const TONE_CLASSNAME: Record<IconActionButtonProps["tone"], string> = {
  success:
    "text-success-role hover:text-success-role surface-success-soft-hover",
  destructive: "text-danger hover:text-danger surface-danger-soft-hover",
};

export function IconActionButton({
  icon: Icon,
  label,
  tone,
  onAction,
}: IconActionButtonProps) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      onAction();
      setLoading(false);
    }, DUMMY_LOADING_MS);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn("h-field w-field", TONE_CLASSNAME[tone])}
      onClick={handleClick}
      disabled={loading}
      aria-label={label}
    >
      {loading ? (
        <svg
          className="icon-default animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <Icon />
      )}
    </Button>
  );
}
