import { useEffect, useState } from "react";

const breakpoints = {
  xxs: 300,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
  "4xl": 2560,
  "5xl": 3840,
  "6xl": 5120,
  "7xl": 7680,
  "8xl": 10000,
  "9xl": 12000,
  "10xl": 14000,
} as const;

export const useWidth = () => {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, breakpoints };
};

/*
 * Usage:
 *
 *   const { width, breakpoints } = useWidth();
 *
 *   // boolean checks
 *   const isMobile  = width < breakpoints.md;
 *   const isTablet  = width >= breakpoints.md && width < breakpoints.lg;
 *   const isDesktop = width >= breakpoints.lg;
 *
 *   // named breakpoints available:
 *   // xxs · xs · sm · md · lg · xl · 2xl · 3xl · 4xl · 5xl · 6xl · 7xl · 8xl · 9xl · 10xl
 *
 *   // quoted keys for numbered breakpoints:
 *   if (width >= breakpoints["2xl"]) { ... }
 *
 *   // inside JSX:
 *   {width < breakpoints.md && <MobileNav />}
 *   {width >= breakpoints.lg ? <Sidebar /> : <DrawerMenu />}
 *
 *  // or if u have one breakpoint
 *  const { width, breakpoints } = useWidth();
 *  const isMaxXs = width < breakpoints.xs;
 */
