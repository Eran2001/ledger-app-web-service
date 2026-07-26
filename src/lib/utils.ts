import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge treats any "border-{word}" as a border-color utility (its
// color scale accepts any value, since custom themes can't be statically
// known). Our semantic *-stroke classes only set border-width/style, so
// without this override they collide with border-color classes like
// `border-default` and get silently dropped, leaving no border rendered.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "border-stroke-style": [
        "border-stroke",
        "border-t-stroke",
        "border-r-stroke",
        "border-b-stroke",
        "border-l-stroke",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
