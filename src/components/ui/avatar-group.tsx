import AvatarInitials from "@/components/ui/avatar-initials";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MAX_VISIBLE = 4;

interface VendorAvatarGroupProps {
  userNames: string[];
  size?: number;
}

const AvatarGroup = ({
  userNames,
  size = 28,
}: VendorAvatarGroupProps) => {
  if (!userNames?.length) {
    return <div style={{ height: size }} />;
  }

  const visible = userNames.slice(0, MAX_VISIBLE);
  const overflow = userNames.length - MAX_VISIBLE;

  const triggerStyle = (index: number): React.CSSProperties => ({
    display: "inline-block",
    width: size,
    height: size,
    borderRadius: "50%",
    flexShrink: 0,
    position: "relative",
    zIndex: index,
    outline: "2px solid white",
    outlineOffset: 0,
    cursor: "pointer",
  });

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 0, marginLeft: 0 }}
    >
      {visible.map((name, index) => (
        <Tooltip key={name} delayDuration={0}>
          <TooltipTrigger asChild>
            <span
              style={{
                ...triggerStyle(index),
                marginLeft: index === 0 ? 0 : -8,
              }}
            >
              <AvatarInitials name={name} size={size} />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="avatar-tooltip-text">{name}</TooltipContent>
        </Tooltip>
      ))}

      {overflow > 0 && (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <span style={{ ...triggerStyle(MAX_VISIBLE), marginLeft: -8 }}>
              <div
                className="avatar-overflow-text"
                style={{
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: size * 0.35,
                }}
              >
                +{overflow}
              </div>
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            {userNames.slice(MAX_VISIBLE).join(", ")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default AvatarGroup;
