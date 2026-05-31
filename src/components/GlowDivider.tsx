/**
 * A full-width glowing horizontal line used between sections.
 * Inspired by the neon separator lines on premium AI agency sites.
 */
const GlowDivider = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-full h-px overflow-visible ${className}`} aria-hidden>
    {/* Base line */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    <div
      className="absolute left-1/2 -translate-x-1/2 -top-[6px]"
      style={{
        width: "60%",
        height: "13px",
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(38 80% 50% / 0.45), transparent 70%)",
        filter: "blur(4px)",
      }}
    />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_hsl(38_80%_50%_/_0.9),0_0_20px_hsl(38_62%_55%_/_0.5)]" />
  </div>
);

export default GlowDivider;
