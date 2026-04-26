import { useEffect, useState, RefObject } from "react";

export function useScrollOnTop(ref?: RefObject<HTMLElement>): boolean {
  const [isOnTop, setIsOnTop] = useState(true);

  useEffect(() => {
    const target = ref?.current ?? window;

    const onScroll = () => {
      const scrollTop =
        ref?.current ? ref.current.scrollTop : window.scrollY;
      setIsOnTop(scrollTop === 0);
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [ref]);

  return isOnTop;
}
