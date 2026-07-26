import {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface SyncedHeightPairProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  left: ReactNode;
  right: ReactNode;
  leftClassName?: string;
  rightClassName?: string;
  squareLeft?: boolean;
}

export function SyncedHeightPair({
  left,
  right,
  className,
  leftClassName,
  rightClassName,
  squareLeft = false,
  ...props
}: SyncedHeightPairProps) {
  const rightRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const node = rightRef.current;

    if (!node) return;

    const updateHeight = () => {
      const nextHeight = Math.ceil(node.getBoundingClientRect().height);
      setRightHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight,
      );
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => observer.disconnect();
  }, [right]);

  const leftStyle: CSSProperties | undefined = rightHeight
    ? {
        height: `${rightHeight}px`,
        width: squareLeft ? `${rightHeight}px` : undefined,
      }
    : undefined;

  // Forcing the child's size via inline style (rather than a `*:h-full`
  // class on the wrapper) guarantees it wins over whatever fixed-size
  // classes the child itself carries, regardless of Tailwind's class
  // generation order.
  const leftNode = isValidElement<{ style?: CSSProperties }>(left)
    ? cloneElement(left, {
        style: {
          ...left.props.style,
          height: "100%",
          ...(squareLeft ? { width: "100%" } : null),
        },
      })
    : left;

  return (
    <div className={cn("flex min-w-0 items-start gap-4", className)} {...props}>
      <div className={cn("shrink-0", leftClassName)} style={leftStyle}>
        {leftNode}
      </div>

      <div ref={rightRef} className={cn("min-w-0 flex-1", rightClassName)}>
        {right}
      </div>
    </div>
  );
}
