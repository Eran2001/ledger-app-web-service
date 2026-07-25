import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { getAvatarColors } from "@/utils/get-avatar-colors";
import { getInitials } from "@/utils/get-initials";

interface InitialsAvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  border?: boolean;
  shadow?: boolean;
  hAuto?: boolean;
  wAuto?: boolean;
}

export const InitialsAvatar = forwardRef<HTMLDivElement, InitialsAvatarProps>(
  (
    {
      name,
      border = false,
      shadow = false,
      hAuto = false,
      wAuto = false,
      className,
      style,
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
          "t-body-md-bold",
          !hAuto && "h-field",
          !wAuto && "w-field",
          border && "border-stroke border-default",
          shadow && "shadow-card",
          className,
        )}
        style={{ backgroundColor: colors.bg, color: colors.fg, ...style }}
        aria-label={name}
        {...props}
      >
        {getInitials(name)}
      </div>
    );
  },
);
InitialsAvatar.displayName = "InitialsAvatar";
