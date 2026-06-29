export function formatStatusLabel(status: string): string {
  const lower = status.toLowerCase().split("_").join(" ");
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
