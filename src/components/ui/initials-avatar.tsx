import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { getAvatarColors } from "@/utils/get-avatar-colors";
import { getInitials } from "@/utils/get-initials";

interface InitialsAvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  border?: boolean;
  shadow?: boolean;
}

export const InitialsAvatar = forwardRef<HTMLDivElement, InitialsAvatarProps>(
  (
    {
      name,
      border = false,
      shadow = false,
      className,
      ...props
    },
    ref,
  ) => {
    const colors = getAvatarColors(name);
    return (
      <div
        ref={ref}
        className={cn(
          "global-rounded flex items-center justify-center",
          "shrink-0 select-none cursor-pointer",
          "h-field w-field t-body-md-bold",
          border && "border-stroke border-default",
          shadow && "shadow-card",
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
