import { getInitials } from "@/utils/get-initials";

function normalizeAvatarKey(value: string) {
  const normalized = getInitials(value).replace(/[^A-Z0-9]/gi, "").toUpperCase();
  return normalized || "U";
}

export function getAvatarColors(value: string) {
  const key = normalizeAvatarKey(value);
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;

  return {
    bg: `hsl(${hue} 72% 92%)`,
    fg: `hsl(${hue} 78% 32%)`,
  };
}
