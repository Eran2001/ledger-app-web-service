const AVATAR_PALETTE = [
  { bg: "#dbeafe", fg: "#1d4ed8" },
  { bg: "#dcfce7", fg: "#15803d" },
  { bg: "#fef9c3", fg: "#a16207" },
  { bg: "#fee2e2", fg: "#b91c1c" },
  { bg: "#f5f3ff", fg: "#7c3aed" },
  { bg: "#f0fdfa", fg: "#0f766e" },
  { bg: "#fce7f3", fg: "#be185d" },
  { bg: "#e0e7ff", fg: "#4338ca" },
];

export function getAvatarColors(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[idx];
}
