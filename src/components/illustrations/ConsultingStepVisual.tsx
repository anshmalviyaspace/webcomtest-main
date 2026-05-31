import { motion, AnimatePresence } from "motion/react";

export type ConsultingStepId = "discovery" | "audit" | "roadmap" | "advisory";

const STEP_ORDER: ConsultingStepId[] = ["discovery", "audit", "roadmap", "advisory"];

interface ConsultingStepVisualProps {
  step: ConsultingStepId;
  className?: string;
  /** When false, skips heavy SVG motion loops */
  animate?: boolean;
}

/** Animated SVG scenes for each consulting phase */
const ConsultingStepVisual = ({ step, className = "", animate = true }: ConsultingStepVisualProps) => {
  return (
    <div className={`relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[320px] sm:max-h-[380px] ${className}`}>
      <div className="absolute inset-0 rounded-2xl ai-panel-grid opacity-60" aria-hidden />
      <div className="absolute inset-0 rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-sm overflow-hidden">
        <div className="ai-scanline pointer-events-none" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            {step === "discovery" && <DiscoveryScene animate={animate} />}
            {step === "audit" && <AuditScene animate={animate} />}
            {step === "roadmap" && <RoadmapScene animate={animate} />}
            {step === "advisory" && <AdvisoryScene animate={animate} />}
          </motion.div>
        </AnimatePresence>
        {/* Corner brackets */}
        <span className="ai-corner ai-corner-tl" aria-hidden />
        <span className="ai-corner ai-corner-tr" aria-hidden />
        <span className="ai-corner ai-corner-bl" aria-hidden />
        <span className="ai-corner ai-corner-br" aria-hidden />
      </div>
    </div>
  );
};

export { STEP_ORDER };
export default ConsultingStepVisual;

function DiscoveryScene({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md" aria-hidden>
      <defs>
        <linearGradient id="disc-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(0 0% 100% /0.9)" />
          <stop offset="100%" stopColor="hsl(0 0% 100% /0.7)" />
        </linearGradient>
      </defs>
      {animate ? (
        <motion.circle cx="200" cy="120" r="48" fill="hsl(0 0% 100% /0.12)" stroke="url(#disc-g)" strokeWidth="1.5"
          animate={{ r: [46, 52, 46] }} transition={{ duration: 3, repeat: Infinity }} />
      ) : (
        <circle cx="200" cy="120" r="48" fill="hsl(0 0% 100% /0.12)" stroke="url(#disc-g)" strokeWidth="1.5" />
      )}
      <circle cx="200" cy="120" r="28" fill="hsl(0 0% 100% /0.2)" />
      <text x="200" y="126" textAnchor="middle" fill="hsl(252,40%,97%)" fontSize="11" fontFamily="monospace">CALL</text>
      {[0, 1, 2, 3, 4].map((i) =>
        animate ? (
          <motion.rect key={i} x={160 + i * 16} y={175} width="8" height={20 + (i % 3) * 12} rx="2"
            fill="hsl(0 0% 100% /0.5)"
            animate={{ height: [16, 32 + (i % 2) * 8, 16] }}
            transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
          />
        ) : (
          <rect key={i} x={160 + i * 16} y={175} width="8" height={24} rx="2" fill="hsl(0 0% 100% /0.5)" />
        ),
      )}
      {animate ? (
      <motion.g animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
        <rect x="72" y="68" width="120" height="36" rx="10" fill="hsl(256,36%,14%)" stroke="hsl(0 0% 100% /0.35)" />
        <text x="84" y="90" fill="hsl(252,22%,90%)" fontSize="10">Goals & stack?</text>
        <rect x="208" y="88" width="130" height="36" rx="10" fill="hsl(0 0% 100% /0.15)" stroke="hsl(0 0% 100% /0.4)" />
        <text x="220" y="110" fill="hsl(0 0% 85%)" fontSize="10">Bottlenecks found</text>
      </motion.g>
      ) : (
      <g opacity={0.9}>
        <rect x="72" y="68" width="120" height="36" rx="10" fill="hsl(256,36%,14%)" stroke="hsl(0 0% 100% /0.35)" />
        <text x="84" y="90" fill="hsl(252,22%,90%)" fontSize="10">Goals & stack?</text>
        <rect x="208" y="88" width="130" height="36" rx="10" fill="hsl(0 0% 100% /0.15)" stroke="hsl(0 0% 100% /0.4)" />
        <text x="220" y="110" fill="hsl(0 0% 85%)" fontSize="10">Bottlenecks found</text>
      </g>
      )}
    </svg>
  );
}

function AuditScene({ animate }: { animate: boolean }) {
  const nodes = [
    { x: 80, y: 90, label: "Ops" },
    { x: 200, y: 60, label: "Sales" },
    { x: 320, y: 90, label: "Mktg" },
    { x: 120, y: 200, label: "HR" },
    { x: 280, y: 200, label: "Data" },
  ];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md" aria-hidden>
      {nodes.map((n, i) => (
        <g key={n.label}>
          {animate ? (
          <motion.circle cx={n.x} cy={n.y} r="22" fill="hsl(256,36%,12%)" stroke="hsl(0 0% 100% /0.4)" strokeWidth="1"
            animate={{ strokeOpacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }} />
          ) : (
          <circle cx={n.x} cy={n.y} r="22" fill="hsl(256,36%,12%)" stroke="hsl(0 0% 100% /0.5)" strokeWidth="1" />
          )}
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="hsl(252,40%,97%)" fontSize="9" fontFamily="monospace">{n.label}</text>
        </g>
      ))}
      <line x1="200" y1="55" x2="200" y2="125" stroke="hsl(0 0% 100% /0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="200" cy="140" r="18" fill="hsl(0 0% 100% /0.25)" stroke="hsl(0 0% 100% /0.8)" strokeWidth="1.5" />
      <text x="200" y="145" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">SCAN</text>
      {animate ? (
        <motion.rect x="40" width="320" height="3" rx="1.5" fill="hsl(0 0% 100% /0.5)"
          animate={{ y: [70, 210, 70] }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      ) : (
        <rect x="40" y="140" width="320" height="3" rx="1.5" fill="hsl(0 0% 100% /0.35)" />
      )}
    </svg>
  );
}

function RoadmapScene({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md" aria-hidden>
      <rect x="60" y="40" width="280" height="200" rx="12" fill="hsl(256,36%,10%)" stroke="hsl(0 0% 100% /0.25)" />
      <text x="80" y="68" fill="hsl(0 0% 80%)" fontSize="10" fontFamily="monospace">AI_OPPORTUNITY_MAP</text>
      {[
        { y: 95, w: 200, label: "Quick win — automate intake", c: "hsla(160,70%,45%,0.8)" },
        { y: 130, w: 160, label: "CRM + AI follow-ups", c: "hsl(0 0% 100% /0.8)" },
        { y: 165, w: 220, label: "Reporting dashboard", c: "hsl(0 0% 100% /0.8)" },
        { y: 200, w: 140, label: "Phase 2 — team tools", c: "hsla(200,80%,60%,0.6)" },
      ].map((row, i) => (
        <g key={i}>
          {animate ? (
          <motion.rect x="80" y={row.y} width={row.w} height="22" rx="6" fill="hsl(0 0% 100% /0.12)" stroke={row.c} strokeWidth="1"
            initial={{ width: 0 }} animate={{ width: row.w }} transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }} />
          ) : (
          <rect x="80" y={row.y} width={row.w} height="22" rx="6" fill="hsl(0 0% 100% /0.12)" stroke={row.c} strokeWidth="1" />
          )}
          <text x="88" y={row.y + 15} fill="hsl(252,22%,88%)" fontSize="9">{row.label}</text>
        </g>
      ))}
      {animate ? (
        <motion.circle cx="330" cy="220" r="8" fill="hsl(0 0% 100% /1)"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      ) : (
        <circle cx="330" cy="220" r="8" fill="hsl(0 0% 100% /0.8)" />
      )}
    </svg>
  );
}

function AdvisoryScene({ animate }: { animate: boolean }) {
  const orbitNodes = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { cx: 200 + Math.cos(rad) * 85, cy: 140 + Math.sin(rad) * 70 };
  });

  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md" aria-hidden>
      {animate ? (
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 140px" }}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 200 + Math.cos(rad) * 85;
          const cy = 140 + Math.sin(rad) * 70;
          return (
            <circle key={i} cx={cx} cy={cy} r="10" fill="hsl(0 0% 100% /0.2)" stroke="hsl(0 0% 100% /0.5)" strokeWidth="1" />
          );
        })}
      </motion.g>
      ) : (
      <g>
        {orbitNodes.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r="10" fill="hsl(0 0% 100% /0.2)" stroke="hsl(0 0% 100% /0.5)" strokeWidth="1" />
        ))}
      </g>
      )}
      <circle cx="200" cy="140" r="36" fill="hsl(0 0% 100% /0.2)" stroke="hsl(0 0% 100% /0.7)" strokeWidth="2" />
      <text x="200" y="136" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">YOU</text>
      <text x="200" y="150" textAnchor="middle" fill="hsl(0 0% 80%)" fontSize="8" fontFamily="monospace">implement</text>
      {animate ? (
      <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
        <rect x="155" y="210" width="90" height="28" rx="8" fill="hsl(0 0% 100% /0.15)" stroke="hsl(0 0% 100% /0.5)" />
        <text x="200" y="228" textAnchor="middle" fill="hsl(313,28%,91%)" fontSize="9">On-demand consult</text>
      </motion.g>
      ) : (
      <g>
        <rect x="155" y="210" width="90" height="28" rx="8" fill="hsl(0 0% 100% /0.15)" stroke="hsl(0 0% 100% /0.5)" />
        <text x="200" y="228" textAnchor="middle" fill="hsl(313,28%,91%)" fontSize="9">On-demand consult</text>
      </g>
      )}
      <text x="200" y="255" textAnchor="middle" fill="hsl(252,16%,72%)" fontSize="8">+ selective build</text>
    </svg>
  );
}
