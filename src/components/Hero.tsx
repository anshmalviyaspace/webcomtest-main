import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowRight, Zap, Brain, TrendingUp } from "lucide-react";

const LightPillar = lazy(() => import("./LightPillar"));
const SplitText   = lazy(() => import("@/components/SplitText"));

const heroPillarFallback = (
  <div
    className="absolute inset-0 w-full h-full bg-background"
    style={{
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 50% -15%, hsla(259,95%,65%,0.32), transparent 55%),
        radial-gradient(ellipse 55% 45% at 85% 12%, hsla(311,95%,76%,0.18), transparent 58%)
      `,
    }}
    aria-hidden
  />
);

/* ─────────────────────────────────────────
   Shared terminal data
───────────────────────────────────────── */
const NODES = [
  { id: "input",  label: "Lead Signal",  icon: TrendingUp, x: 10, y: 20, delay: 0    },
  { id: "brain",  label: "AI Engine",    icon: Brain,      x: 42, y: 8,  delay: 0.15 },
  { id: "zap",    label: "Auto-Execute", icon: Zap,        x: 74, y: 20, delay: 0.3  },
  { id: "meta",   label: "Meta Ads",     icon: null,       x: 10, y: 62, delay: 0.45 },
  { id: "crm",    label: "CRM Sync",     icon: null,       x: 42, y: 72, delay: 0.6  },
  { id: "report", label: "Live Report",  icon: null,       x: 74, y: 62, delay: 0.75 },
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

/* ─────────────────────────────────────────
   Shared terminal canvas (height + icon size configurable)
───────────────────────────────────────── */
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
    <div className="relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-[0_0_60px_hsla(259,95%,65%,0.12)] overflow-hidden">
      {/* Traffic lights bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card/60">
        <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
        <span className="ml-auto text-xs text-muted-foreground font-mono-data">ai-automation.engine</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      </div>

      {/* Node canvas */}
      <div className="relative" style={{ height: canvasHeight }}>
        {/* SVG edges */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={egId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="hsla(259,95%,65%,0)" />
              <stop offset="50%"  stopColor="hsla(259,95%,65%,0.65)" />
              <stop offset="100%" stopColor="hsla(311,95%,76%,0)" />
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

        {/* Nodes */}
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
                  className={`${nodeBoxSize} rounded-xl flex items-center justify-center border border-primary/30 bg-card/80 backdrop-blur-sm shadow-[0_0_18px_hsla(259,95%,65%,0.3)] ${Icon ? "ring-1 ring-primary/20" : ""}`}
                >
                  {Icon
                    ? <Icon size={iconSize} className="text-primary" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
                  }
                </div>
                <span className={`${labelClass} font-mono-data text-muted-foreground whitespace-nowrap`}>
                  {n.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* Travelling data packets */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute ${packetSize} rounded-full bg-primary hero-packet`}
            style={{ animationDelay: `${i * 1.2}s` }}
          />
        ))}
      </div>

      {/* Status bar */}
      <div className="px-4 py-2.5 border-t border-border/30 bg-card/60 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
        <span className="text-[10px] font-mono-data text-muted-foreground">
          3 automations running · 12 leads processed · ROAS 4.1x
        </span>
      </div>
    </div>
  );
};

/* ── Ticker ── */
const TICKER = [
  "AI Automation", "Meta Ads", "LinkedIn", "CRM Sync",
  "AI Content", "Lead Nurturing", "ROAS Boost", "AI Chatbots",
];

/* ── Hero ── */
const Hero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 pb-12 sm:pt-32 md:pt-44 md:pb-28">

      {/* Background pillar */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {reduceMotion ? heroPillarFallback : (
          <Suspense fallback={heroPillarFallback}>
            <LightPillar
              topColor="#5227FF" bottomColor="#FF9FFC"
              intensity={1} rotationSpeed={0.3} glowAmount={0.002}
              pillarWidth={3} pillarHeight={0.4} noiseIntensity={0.5}
              pillarRotation={25} interactive={false}
              mixBlendMode="screen" quality="low"
            />
          </Suspense>
        )}
      </div>
      <div className="absolute inset-0 hero-grid-overlay pointer-events-none" aria-hidden />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Badge ── */}
        <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="text-[10px] font-mono-data text-primary tracking-widest uppercase">
            AI-Powered Marketing Agency
          </span>
        </div>

        {/* ── Two-col grid on lg+, single col on mobile ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Copy — left aligned ── */}
          <div className="w-full">

            {/* H1 with SplitText — bigger on mobile so it wraps 2–3 lines */}
            <Suspense fallback={
              <h1 className="font-display font-bold text-foreground leading-[1.1] mb-4 text-[2.15rem] sm:text-[2.6rem] md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem]">
                We Automate Your Growth with AI.
              </h1>
            }>
              <SplitText
                tag="h1"
                text="We Automate Your Growth with AI."
                className="font-display font-bold text-foreground leading-[1.1] mb-4 text-[2.15rem] sm:text-[2.6rem] md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem]"
                delay={35}
                duration={0.9}
                splitType="chars"
                rootMargin="0px"
                threshold={0.01}
                textAlign="left"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
              />
            </Suspense>

            {/* Subtext */}
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base md:text-lg max-w-lg">
              We embed AI into your marketing systems — automating lead generation, ad campaigns, content, and CRM — so your business scales without scaling headcount.
            </p>

            {/* Buttons — left-aligned, compact, NOT full-width */}
            <div className="flex flex-row gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
              <a
                href="#cta"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold border border-primary/40 transition-all hover:-translate-y-px hover:shadow-[0_0_24px_hsla(259,95%,65%,0.45)] active:scale-[0.98] whitespace-nowrap"
              >
                Book a Free AI Audit <ArrowRight size={13} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-foreground text-xs sm:text-sm font-medium border border-border/50 transition-all hover:border-primary/40 hover:bg-primary/5 whitespace-nowrap"
              >
                Explore Services
              </a>
            </div>

            {/* Ticker — clipped */}
            <div className="flex items-center gap-2 w-full overflow-hidden">
              <span className="text-[10px] text-muted-foreground font-mono-data shrink-0">WE DO →</span>
              <div className="overflow-hidden flex-1 min-w-0">
                <div className="hero-ticker flex gap-2">
                  {[...TICKER, ...TICKER].map((t, i) => (
                    <span
                      key={i}
                      className="shrink-0 text-[10px] px-2 py-1 rounded-full border border-border/40 bg-card/40 text-muted-foreground font-mono-data whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Terminal — desktop only (in grid column) ── */}
          <div className="hidden lg:block w-full relative mt-0">
            <TerminalVisual gradientIdSuffix="d" />
            {/* Floating chips */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-primary/20 border border-primary/40 backdrop-blur-sm shadow-lg">
              <p className="text-xs font-mono-data text-primary font-medium">↑ 4.1x ROAS</p>
            </div>
            <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-card border border-border/60 backdrop-blur-sm shadow-lg">
              <p className="text-xs font-mono-data text-muted-foreground">30+ brands automated</p>
            </div>
          </div>

        </div>

        {/* ── Terminal — mobile only (below copy, full width) ── */}
        <div className="lg:hidden w-full relative mt-6">
          <TerminalVisual
            canvasHeight={180}
            iconSize={13}
            nodeBoxSize="w-8 h-8"
            labelClass="text-[7.5px]"
            packetSize="w-1 h-1"
            gradientIdSuffix="m"
          />
          {/* Floating chips — smaller on mobile */}
          <div className="absolute -top-2.5 -right-2 px-2.5 py-1 rounded-xl bg-primary/20 border border-primary/40 backdrop-blur-sm shadow-lg">
            <p className="text-[10px] font-mono-data text-primary font-medium">↑ 4.1x ROAS</p>
          </div>
          <div className="absolute -bottom-2.5 -left-2 px-2.5 py-1 rounded-xl bg-card border border-border/60 backdrop-blur-sm shadow-lg">
            <p className="text-[10px] font-mono-data text-muted-foreground">30+ brands automated</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
