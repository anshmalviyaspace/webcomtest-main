import { motion, useInView } from "motion/react";
import { useId, useRef } from "react";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";

const DOMAINS = [
  { label: "Operations", angle: -90 },
  { label: "Sales", angle: -30 },
  { label: "Marketing", angle: 30 },
  { label: "Team & HR", angle: 90 },
  { label: "Data", angle: 150 },
  { label: "Support", angle: 210 },
];

const RADIUS = 58;
const CX = 100;
const CY = 95;

const EcosystemMapIllustration = ({ className = "" }: { className?: string }) => {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { enableHeavyEffects } = usePerformanceProfile();
  const animate = enableHeavyEffects && inView;

  const coreGrad = `eco-core-${uid}`;
  const glowFilter = `eco-glow-${uid}`;
  const lineGrad = `eco-line-${uid}`;

  return (
    <div ref={ref} className={`relative w-full max-w-md mx-auto ${className}`}>
      {/* Ambient gold bloom behind diagram */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 45%, hsl(38 80% 50% / 0.18), transparent 62%)",
          filter: "blur(24px)",
        }}
      />

      <svg
        viewBox="0 0 200 210"
        className="relative w-full h-auto"
        role="img"
        aria-label="AI consulting domains: operations, sales, marketing, team, data, and support connected to a central AI hub"
      >
        <defs>
          <radialGradient id={coreGrad} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="hsl(40 75% 78%)" />
            <stop offset="45%" stopColor="hsl(38 62% 55%)" />
            <stop offset="100%" stopColor="hsl(36 45% 32%)" />
          </radialGradient>
          <linearGradient id={lineGrad} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(38 62% 55% / 0.15)" />
            <stop offset="50%" stopColor="hsl(40 72% 72% / 0.55)" />
            <stop offset="100%" stopColor="hsl(38 62% 55% / 0.15)" />
          </linearGradient>
          <filter id={glowFilter} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer guide ring */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS + 18}
          fill="none"
          stroke="hsl(38 62% 55% / 0.12)"
          strokeWidth="1"
        />
        {animate ? (
          <motion.circle
            cx={CX}
            cy={CY}
            r={RADIUS + 18}
            fill="none"
            stroke="hsl(40 72% 72% / 0.25)"
            strokeWidth="1"
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        {/* Spokes */}
        {DOMAINS.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const x2 = CX + Math.cos(rad) * RADIUS;
          const y2 = CY + Math.sin(rad) * RADIUS;
          return (
            <motion.line
              key={`line-${d.label}`}
              x1={CX}
              y1={CY}
              x2={x2}
              y2={y2}
              stroke={`url(#${lineGrad})`}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            />
          );
        })}

        {/* Mid pulse ring */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={RADIUS - 8}
          fill="none"
          stroke="hsl(38 62% 55% / 0.2)"
          strokeWidth="1"
          strokeDasharray="3 5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1, rotate: animate ? 360 : 0 } : {}}
          transition={
            animate
              ? { opacity: { duration: 0.5 }, rotate: { duration: 48, repeat: Infinity, ease: "linear" } }
              : { duration: 0.5 }
          }
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Core glow */}
        <circle
          cx={CX}
          cy={CY}
          r={32}
          fill="hsl(38 80% 50% / 0.12)"
          filter={`url(#${glowFilter})`}
        />

        {/* Core */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={26}
          fill={`url(#${coreGrad})`}
          stroke="hsl(40 72% 78% / 0.6)"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.08 }}
        />
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fill="hsl(0 0% 8%)"
          fontSize="11"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          AI
        </text>

        {/* Domain nodes */}
        {DOMAINS.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const nx = CX + Math.cos(rad) * RADIUS;
          const ny = CY + Math.sin(rad) * RADIUS;
          const labelY = ny + (d.angle > 45 && d.angle < 135 ? 24 : d.angle < -45 || d.angle > 135 ? -10 : 22);
          const labelAnchor = "middle" as const;

          return (
            <g key={d.label}>
              <motion.circle
                cx={nx}
                cy={ny}
                r={18}
                fill="hsl(0 0% 7%)"
                stroke="hsl(38 62% 55% / 0.45)"
                strokeWidth="1.25"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 200, delay: 0.12 + i * 0.07 }}
              />
              <motion.circle
                cx={nx}
                cy={ny}
                r={6}
                fill="hsl(38 62% 55% / 0.35)"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.07 }}
              />
              <text
                x={nx}
                y={labelY}
                textAnchor={labelAnchor}
                fill="hsl(40 72% 72% / 0.95)"
                fontSize="7.5"
                fontWeight="500"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-3 text-center text-[10px] sm:text-xs font-mono-data text-muted-foreground">
        <span className="text-gold-muted">Whole-business view</span>
        <span className="text-muted-foreground/60"> · not just marketing</span>
      </p>
    </div>
  );
};

export default EcosystemMapIllustration;
