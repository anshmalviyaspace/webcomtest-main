/**
 * A full-width glowing horizontal line used between sections.
 * Inspired by the neon separator lines on premium AI agency sites.
 */
const GlowDivider = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-full h-px overflow-visible ${className}`} aria-hidden>
    {/* Base line */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    {/* Glow bloom */}
    <div
      className="absolute left-1/2 -translate-x-1/2 -top-[6px]"
      style={{
        width: "60%",
        height: "13px",
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, hsla(259,95%,65%,0.35), transparent 70%)",
        filter: "blur(4px)",
      }}
    />
    {/* Center dot */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsla(259,95%,65%,1),0_0_20px_hsla(259,95%,65%,0.6)]" />
  </div>
);

export default GlowDivider;
