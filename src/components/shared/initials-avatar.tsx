import { forwardRef } from "react";
import { cn, getAvatarColors, getInitials } from "@/lib/utils";

interface InitialsAvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  size?: "sm" | "md" | "lg" | "auto";
}

const SIZE_MAP = {
  sm: { box: "h-compact w-compact", text: "t-caption-bold" },
  md: { box: "h-field w-field", text: "t-meta-bold" },
  lg: { box: "h-extra-large w-extra-large", text: "t-meta-bold" },
  auto: { box: "h-full w-full", text: "t-meta-bold" },
};

export const InitialsAvatar = forwardRef<HTMLDivElement, InitialsAvatarProps>(
  ({ name, size = "md", className, ...props }, ref) => {
    const colors = getAvatarColors(name);
    const sizing = SIZE_MAP[size];
    return (
      <div
        ref={ref}
        className={cn(
          "global-rounded flex items-center justify-center",
          "shrink-0 select-none cursor-pointer",
          sizing.box,
          sizing.text,
          className,
        )}
        style={{ backgroundColor: colors.bg, color: colors.fg }}
        aria-label={name}
        {...props}
      >
        {getInitials(name)}
      </div>
    );
  },
);
InitialsAvatar.displayName = "InitialsAvatar";
