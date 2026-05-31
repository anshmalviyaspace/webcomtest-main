/** Shared palette for inline styles (matches :root in index.css) */
export const palette = {
  bg: "hsl(0 0% 4%)",
  card: "hsl(0 0% 7%)",
  foreground: "hsl(0 0% 96%)",
  muted: "hsl(0 0% 58%)",
  border: "hsl(0 0% 16%)",
  glow: (alpha: number) => `hsl(0 0% 100% / ${alpha})`,
  gold: "hsl(38 62% 55%)",
  goldLight: "hsl(40 72% 72%)",
  goldGlow: (alpha: number) => `hsl(38 80% 50% / ${alpha})`,
  metric: "hsl(142 71% 45%)",
  metricMuted: "hsl(142 50% 40% / 0.5)",
} as const;

/** Shine borders — gold + silver */
export const shineColors = ["#E8C872", "#D4AF37", "#8B7355"];

/** LightPillar hero — warm gold blur into black */
export const heroPillarColors = {
  topColor: "#D4AF37",
  bottomColor: "#0a0a0a",
  warmBottom: "#141008",
} as const;
