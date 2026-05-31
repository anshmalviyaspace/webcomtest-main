import { useEffect, useState } from "react";

export interface PerformanceProfile {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  /** Run WebGL, particles, char-split, infinite SVG loops */
  enableHeavyEffects: boolean;
}

function readProfile(): PerformanceProfile {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isLowEnd: false,
      prefersReducedMotion: false,
      enableHeavyEffects: true,
    };
  }

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const isLowEnd = cores <= 4;

  return {
    isMobile,
    isLowEnd,
    prefersReducedMotion,
    /** Full motion on mobile; only off when user prefers reduced motion */
    enableHeavyEffects: !prefersReducedMotion,
  };
}

/** Shared device / motion profile for adaptive effects */
export function usePerformanceProfile(): PerformanceProfile {
  const [profile, setProfile] = useState<PerformanceProfile>(readProfile);

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 767px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setProfile(readProfile());

    mobileMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  return profile;
}
