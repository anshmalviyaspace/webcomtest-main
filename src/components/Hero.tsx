import { lazy, Suspense } from "react";
import { ArrowRight, Brain, TrendingUp, Search } from "lucide-react";
import { consultingCopy } from "@/content/consultingCopy";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { useVisibilityPause } from "@/hooks/useVisibilityPause";
import { heroPillarColors } from "@/theme/consulting-palette";

const LightPillar = lazy(() => import("./LightPillar"));
const SplitText = lazy(() => import("@/components/SplitText"));

/** CSS fallback — same gold blur as WebGL pillar (mobile / reduced motion) */
const HeroPillarBackdrop = () => (
  <>
    <div className="hero-pillar-glow" aria-hidden />
    <div className="hero-pillar-glow-sharp" aria-hidden />
  </>
);

/* ─────────────────────────────────────────
   Shared terminal data
───────────────────────────────────────── */
const NODES = [
  { id: "input",  label: "Business Ops", icon: TrendingUp, x: 10, y: 20, delay: 0    },
  { id: "brain",  label: "AI Audit",     icon: Search,     x: 42, y: 8,  delay: 0.15 },
  { id: "zap",    label: "Roadmap",      icon: Brain,      x: 74, y: 20, delay: 0.3  },
  { id: "meta",   label: "Sales",        icon: null,       x: 10, y: 62, delay: 0.45 },
  { id: "crm",    label: "Marketing",    icon: null,       x: 42, y: 72, delay: 0.6  },
  { id: "report", label: "Team & Data",  icon: null,       x: 74, y: 62, delay: 0.75 },
];

const EDGES = [
  { x1: 14, y1: 26, x2: 40, y2: 12 },
  { x1: 46, y1: 12, x2: 72, y2: 26 },
  { x1: 12, y1: 34, x2: 12, y2: 58 },
  { x1: 42, y1: 22, x2: 42, y2: 68 },
  { x1: 76, y1: 34, x2: 76, y2: 58 },
  { x1: 16, y1: 68, x2: 40, y2: 74 },
  { x1: 46, y1: 74, x2: 72, y2: 68 },
];

interface TerminalVisualProps {
  canvasHeight?: number;
  iconSize?: number;
  nodeBoxSize?: string;
  labelClass?: string;
  packetSize?: string;
  gradientIdSuffix?: string;
}

const TerminalVisual = ({
  canvasHeight = 280,
  iconSize = 18,
  nodeBoxSize = "w-11 h-11",
  labelClass = "text-[9px]",
  packetSize = "w-1.5 h-1.5",
  gradientIdSuffix = "d",
}: TerminalVisualProps) => {
  const egId = `eg-${gradientIdSuffix}`;
  const gfId = `gf-${gradientIdSuffix}`;

  return (
    <div className="relative rounded-lg border border-gold/30 bg-card/80 backdrop-blur-sm overflow-hidden ai-interface-frame">
      <div className="ai-scanline pointer-events-none" aria-hidden />
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card/60">
        <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-gold/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-gold" />
        <span className="ml-auto text-xs text-muted-foreground font-mono-data">ai-consulting.engine</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      </div>

      <div className="relative" style={{ height: canvasHeight }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={egId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(38 62% 55% / 0)" />
              <stop offset="50%" stopColor="hsl(40 72% 72% / 0.7)" />
              <stop offset="100%" stopColor="hsl(38 62% 55% / 0)" />
            </linearGradient>
            <filter id={gfId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {EDGES.map((e, i) => (
            <line
              key={i}
              x1={`${e.x1}%`} y1={`${e.y1}%`}
              x2={`${e.x2}%`} y2={`${e.y2}%`}
              stroke={`url(#${egId})`}
              strokeWidth="0.5"
              filter={`url(#${gfId})`}
              className="hero-edge"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </svg>

        {NODES.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="absolute hero-node"
              style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${n.delay}s` }}
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`${nodeBoxSize} rounded-lg flex items-center justify-center border border-gold/25 bg-secondary/90 ${Icon ? "ring-1 ring-gold/15" : ""}`}
                >
                  {Icon
                    ? <Icon size={iconSize} className="text-gold-light" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  }
                </div>
                <span className={`${labelClass} font-mono-data text-muted-foreground whitespace-nowrap`}>
                  {n.label}
                </span>
              </div>
            </div>
          );
        })}

        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute ${packetSize} rounded-full hero-packet`}
            style={{ animationDelay: `${i * 1.2}s` }}
          />
        ))}
      </div>

      <div className="px-4 py-2.5 border-t border-border/30 bg-card/60 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-metric shrink-0" />
        <span className="text-[10px] font-mono-data text-muted-foreground">
          audit complete · 12 opportunities mapped · roadmap delivered
        </span>
      </div>
    </div>
  );
};

const TICKER = [
  "Ops & Workflows", "Sales & CRM", "Marketing Funnels", "Team & HR",
  "Data & Reporting", "AI Roadmaps", "Discovery Calls", "On-Demand Advice",
];

const Hero = () => {
  const profile = usePerformanceProfile();
  const { ref: heroRef, isActive: heroVisible } = useVisibilityPause<HTMLElement>();
  const useStaticPillar = profile.prefersReducedMotion || profile.isMobile;
  const pillarQuality = profile.isLowEnd ? "low" : "medium";

  return (
    <section
      ref={heroRef}
      className={`relative w-full overflow-hidden bg-background pt-28 pb-12 sm:pt-36 md:pt-48 md:pb-28 ${!profile.enableHeavyEffects ? "anim-paused" : ""}`}
    >
      {/* Gold light blur — WebGL pillar on desktop, CSS blur on mobile */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {useStaticPillar ? (
          <HeroPillarBackdrop />
        ) : (
          <Suspense fallback={<HeroPillarBackdrop />}>
            <LightPillar
              topColor={heroPillarColors.topColor}
              bottomColor={heroPillarColors.bottomColor}
              intensity={1}
              rotationSpeed={0.3}
              glowAmount={0.002}
              pillarWidth={3}
              pillarHeight={0.4}
              noiseIntensity={0.45}
              pillarRotation={25}
              interactive={false}
              mixBlendMode="screen"
              quality={pillarQuality}
              paused={!heroVisible}
            />
          </Suspense>
        )}
      </div>
      <div className="absolute inset-0 hero-grid-overlay pointer-events-none" aria-hidden />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold-subtle">
          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          <span className="text-[10px] font-mono-data text-gold-light tracking-[0.18em] uppercase">
            {consultingCopy.badge}
          </span>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="w-full">
            {profile.enableHeavyEffects ? (
              <Suspense fallback={
                <h1 className="font-display font-bold text-foreground leading-[1.1] mb-4 text-[2.15rem] sm:text-[2.6rem] md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem]">
                  {consultingCopy.headline}
                </h1>
              }>
                <SplitText
                  tag="h1"
                  text={consultingCopy.headline}
                  className="font-display font-bold text-foreground leading-[1.1] mb-4 text-[2.15rem] sm:text-[2.6rem] md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem]"
                  delay={35}
                  duration={0.9}
                  splitType="words"
                  rootMargin="0px"
                  threshold={0.01}
                  textAlign="left"
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </Suspense>
            ) : (
              <h1 className="font-display font-bold text-foreground leading-[1.1] mb-4 text-[2.15rem] sm:text-[2.6rem] md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem]">
                {consultingCopy.headline}
              </h1>
            )}

            <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base md:text-lg max-w-lg">
              {consultingCopy.subhead}
            </p>

            <div className="flex flex-row gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
              <a
                href="#cta"
                className="btn-cta gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-xs sm:text-sm whitespace-nowrap"
              >
                {consultingCopy.ctaPrimary} <ArrowRight size={13} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-gold-light text-xs sm:text-sm font-medium border border-gold/35 transition-all hover:border-gold/60 hover:bg-gold-subtle whitespace-nowrap"
              >
                {consultingCopy.ctaSecondary}
              </a>
            </div>

            <div className="flex items-center gap-2 w-full overflow-hidden">
              <span className="text-[10px] text-gold-muted font-mono-data shrink-0">WE MAP →</span>
              <div className="overflow-hidden flex-1 min-w-0">
                <div className="hero-ticker flex gap-2">
                  {[...TICKER, ...TICKER].map((t, i) => (
                    <span
                      key={i}
                      className="shrink-0 text-[10px] px-2 py-1 rounded-full border border-gold/20 bg-card/50 text-muted-foreground font-mono-data whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-full relative mt-0">
            <TerminalVisual gradientIdSuffix="d" />
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-lg border border-gold/30 bg-card/95 backdrop-blur-sm">
              <p className="text-xs font-mono-data text-gold-light font-medium">AI roadmap delivered</p>
            </div>
            <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-lg border border-border bg-card/95 backdrop-blur-sm">
              <p className="text-xs font-mono-data text-muted-foreground">30+ businesses advised</p>
            </div>
          </div>
        </div>

        <div className="lg:hidden w-full relative mt-6">
          <TerminalVisual
            canvasHeight={180}
            iconSize={13}
            nodeBoxSize="w-8 h-8"
            labelClass="text-[7.5px]"
            packetSize="w-1 h-1"
            gradientIdSuffix="m"
          />
          <div className="absolute -top-2.5 -right-2 px-2.5 py-1 rounded-lg border border-gold/30 bg-card/95 backdrop-blur-sm">
            <p className="text-[10px] font-mono-data text-gold-light font-medium">AI roadmap delivered</p>
          </div>
          <div className="absolute -bottom-2.5 -left-2 px-2.5 py-1 rounded-lg border border-border bg-card/95 backdrop-blur-sm">
            <p className="text-[10px] font-mono-data text-muted-foreground">30+ businesses advised</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
