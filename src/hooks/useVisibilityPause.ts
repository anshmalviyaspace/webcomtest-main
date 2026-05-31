import { useEffect, useRef, useState, type RefObject } from "react";

type VisibilityPauseOptions = {
  rootMargin?: string;
  threshold?: number;
};

/**
 * Returns whether animations in this subtree should run (in viewport + tab visible).
 */
export function useVisibilityPause<T extends HTMLElement = HTMLDivElement>(
  options: VisibilityPauseOptions = {},
): { ref: RefObject<T | null>; isActive: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true,
  );

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: options.rootMargin ?? "80px 0px",
        threshold: options.threshold ?? 0,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options.rootMargin, options.threshold]);

  return { ref, isActive: inView && pageVisible };
}
