import { cn, getAvatarColors, getInitials } from "@/lib/utils";

interface InitialsAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { box: "h-compact w-compact", text: "t-caption-bold" },
  md: { box: "h-field w-field", text: "t-meta-bold" },
  lg: { box: "h-extra-large w-extra-large", text: "t-meta-bold" },
};

export function InitialsAvatar({
  name,
  size = "md",
  className,
}: InitialsAvatarProps) {
  const colors = getAvatarColors(name);
  const sizing = SIZE_MAP[size];
  return (
    <div
      className={cn(
        "global-rounded flex items-center justify-center",
        "shrink-0 select-none cursor-pointer",
        sizing.box,
        sizing.text,
        className,
      )}
      style={{ backgroundColor: colors.bg, color: colors.fg }}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
