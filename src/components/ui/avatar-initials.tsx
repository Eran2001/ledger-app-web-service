const getCircleColor = (name = "") => {
  if (!name) return "#3B82F6";

  const hash = name
    .toLowerCase()
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const AvatarInitials = ({ name = "", size = 24, className = "" }) => {
  const initials = name
    .split(" ")
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const bg = getCircleColor(name);

  return (
    <div
      className={`global-rounded flex items-center justify-center text-white font-medium ${className}`}
      style={{
        backgroundColor: bg,
        width: size,
        height: size,
        fontSize: size * 0.35,
      }}
    >
      {initials || "?"}
    </div>
  );
};

export default AvatarInitials;
