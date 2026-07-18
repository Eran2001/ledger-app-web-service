import { useEffect } from "react";

type ScrollRouter = {
  subscribe: (eventType: "onResolved", callback: () => void) => () => void;
};

function scrollMainContentToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  document.querySelectorAll<HTMLElement>("main .overflow-y-auto").forEach((el) => {
    el.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
}

function scheduleScrollMainContentToTop() {
  requestAnimationFrame(() => {
    scrollMainContentToTop();
  });
}

export function useScrollOnTop(router: ScrollRouter) {
  useEffect(() => {
    scheduleScrollMainContentToTop();

    const unsubscribe = router.subscribe("onResolved", () => {
      scheduleScrollMainContentToTop();
    });

    return unsubscribe;
  }, [router]);
}
