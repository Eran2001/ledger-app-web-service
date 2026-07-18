import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const STROKE_BORDER_CLASSES = [
  "border-stroke",
  "border-t-stroke",
  "border-r-stroke",
  "border-b-stroke",
  "border-l-stroke",
] as const;

export function cn(...inputs: ClassValue[]) {
  const rawClassName = clsx(inputs);
  const mergedClassName = twMerge(rawClassName);

  const missingStrokeClasses = STROKE_BORDER_CLASSES.filter(
    (className) =>
      rawClassName.includes(className) && !mergedClassName.includes(className),
  );

  if (missingStrokeClasses.length === 0) {
    return mergedClassName;
  }

  return `${mergedClassName} ${missingStrokeClasses.join(" ")}`;
}
