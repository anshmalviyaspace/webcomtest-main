import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { ArrowRight, Zap, Brain, TrendingUp } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const LightPillar = lazy(() => import("./LightPillar"));
const SplitText = lazy(() => import("@/components/SplitText"));

const heroPillarFallback = (
  <div
    className="absolute inset-0 w-full h-full bg-background"
    style={{
      zIndex: 0,
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 50% -15%, hsla(259, 95%, 65%, 0.32), transparent 55%),
        radial-gradient(ellipse 55% 45% at 85% 12%, hsla(311, 95%, 76%, 0.18), transparent 58%)
      `,
    }}
    aria-hidden
  />
);

/* Animated AI workflow nodes */
const AIWorkflowVisual = () => {
  const nodes = [
    { id: "input",    label: "Lead Signal",      icon: TrendingUp, x: 10,  y: 20,  delay: 0 },
    { id: "brain",    label: "AI Engine",         icon: Brain,      x: 42,  y: 8,   delay: 0.15 },
    { id: "zap",      label: "Auto-Execute",      icon: Zap,        x: 74,  y: 20,  delay: 0.3 },
    { id: "meta",     label: "Meta Ads",          icon: null,       x: 10,  y: 62,  delay: 0.45 },
    { id: "crm",      label: "CRM Sync",          icon: null,       x: 42,  y: 72,  delay: 0.6 },
    { id: "report",   label: "Live Report",       icon: null,       x: 74,  y: 62,  delay: 0.75 },
  ];

  const edges = [
    { from: { x: 22, y: 28 }, to: { x: 42, y: 16 } },
    { from: { x: 54, y: 16 }, to: { x: 74, y: 28 } },
    { from: { x: 16, y: 38 }, to: { x: 16, y: 62 } },
    { from: { x: 42, y: 24 }, to: { x: 42, y: 72 } },
    { from: { x: 80, y: 38 }, to: { x: 80, y: 62 } },
    { from: { x: 22, y: 70 }, to: { x: 42, y: 76 } },
    { from: { x: 54, y: 76 }, to: { x: 74, y: 70 } },
  ];

  return (
    <div className="relative w-full h-full select-none" aria-hidden>
      {/* SVG edges */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsla(259,95%,65%,0)" />
            <stop offset="50%" stopColor="hsla(259,95%,65%,0.6)" />
            <stop offset="100%" stopColor="hsla(311,95%,76%,0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {edges.map((e, i) => (
          <line
            key={i}
            x1={`${e.from.x}%`} y1={`${e.from.y}%`}
            x2={`${e.to.x}%`}   y2={`${e.to.y}%`}
            stroke="url(#edgeGrad)"
            strokeWidth="0.4"
            filter="url(#glow)"
            className="hero-edge"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((n) => {
        const Icon = n.icon;
        return (
          <div
            key={n.id}
            className="absolute hero-node"
            style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${n.delay}s` }}
          >
            <div className="relative flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border border-primary/30 bg-card/80 backdrop-blur-sm shadow-[0_0_20px_hsla(259,95%,65%,0.25)] ${Icon ? "ring-1 ring-primary/20" : ""}`}>
                {Icon
                  ? <Icon size={18} className="text-primary" />
                  : <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" />
                }
              </div>
              <span className="text-[9px] md:text-[10px] font-mono-data text-muted-foreground whitespace-nowrap">{n.label}</span>
            </div>
          </div>
        );
      })}

      {/* Floating data packets */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary hero-packet"
          style={{ animationDelay: `${i * 1.2}s` }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const tickerItems = [
    "AI Workflow Automation",
    "Meta Ads",
    "LinkedIn Growth",
    "CRM Integration",
    "Content at Scale",
    "Lead Nurturing",
    "ROAS Optimization",
    "AI Chatbots",
  ];

  return (
    <section className="relative min-h-[100svh] md:min-h-[115vh] lg:min-h-[95vh] pt-24 pb-16 md:pt-40 md:pb-32 lg:pt-44 lg:pb-28 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {reduceMotion ? heroPillarFallback : (
          <Suspense fallback={heroPillarFallback}>
            <LightPillar
              topColor="#5227FF"
              bottomColor="#FF9FFC"
              intensity={1}
              rotationSpeed={0.3}
              glowAmount={0.002}
              pillarWidth={3}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={25}
              interactive={false}
              mixBlendMode="screen"
              quality="low"
            />
          </Suspense>
        )}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-overlay" aria-hidden />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Badge */}
        <div className="animate-slide-up mb-5 md:mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono-data text-primary tracking-widest uppercase">AI-Powered Marketing Agency</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl lg:max-w-[42rem]">
            <Suspense fallback={
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-display font-bold text-foreground leading-[1.05] text-balance mb-5 md:mb-6">
                We Automate Your Growth with AI.
              </h1>
            }>
              <SplitText
                tag="h1"
                text="We Automate Your Growth with AI."
                className="text-3xl sm:text-4xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-display font-bold text-foreground leading-[1.05] text-balance mb-5 md:mb-6"
                delay={50}
                duration={1.1}
                splitType="chars"
                rootMargin="-120px"
                threshold={0.08}
                textAlign="left"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
              />
            </Suspense>

            <p className="animate-slide-up-delay text-sm sm:text-base md:text-lg text-muted-foreground text-pretty mb-6 md:mb-8 max-w-lg leading-relaxed">
              We embed AI into your marketing systems — automating lead generation, ad campaigns, content, and CRM — so your business scales without scaling headcount.
            </p>

            <div className="animate-slide-up-delay-2 flex flex-col xs:flex-row gap-3 mb-8 md:mb-10">
              <HoverBorderGradient
                as="a"
                href="#cta"
                containerClassName="rounded-lg w-full xs:w-auto"
                innerClassName="inline-flex w-full xs:w-auto items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm md:text-base font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_30px_hsla(259,95%,65%,0.4)] active:scale-[0.98]"
              >
                Book a Free AI Audit
                <ArrowRight size={16} />
              </HoverBorderGradient>
              <HoverBorderGradient
                as="a"
                href="#services"
                containerClassName="rounded-lg w-full xs:w-auto"
                innerClassName="inline-flex w-full xs:w-auto items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-foreground/8 text-foreground text-sm md:text-base font-medium border border-border/60 transition-all duration-200 hover:bg-foreground/15 hover:border-primary/40"
              >
                Explore Services
              </HoverBorderGradient>
            </div>

            {/* Ticker */}
            <div className="animate-slide-up-delay-2 flex items-center gap-2 sm:gap-3 overflow-hidden">
              <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0 font-mono-data">WE DO →</span>
              <div ref={tickerRef} className="flex gap-2 sm:gap-3 hero-ticker overflow-hidden">
                {[...tickerItems, ...tickerItems].map((item, i) => (
                  <span key={i} className="shrink-0 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full border border-border/50 bg-card/40 text-muted-foreground font-mono-data whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI Workflow Visual */}
          <div className="animate-fade-in mt-8 lg:mt-0 relative">
            <div className="relative bg-card/40 backdrop-blur-md rounded-2xl border border-border/60 shadow-[0_0_60px_hsla(259,95%,65%,0.12)] overflow-hidden" style={{ minHeight: "300px" }}>
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border/40 bg-card/60">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary/40" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary/70" />
                <span className="ml-auto text-[10px] sm:text-xs text-muted-foreground font-mono-data">ai-automation.engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Workflow canvas */}
              <div className="relative p-3 sm:p-4" style={{ height: "260px" }}>
                <AIWorkflowVisual />
              </div>

              {/* Live status bar */}
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-t border-border/30 bg-card/60 flex items-center gap-2 sm:gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-mono-data text-muted-foreground truncate">
                  3 automations running · 12 leads processed · ROAS 4.1x
                </span>
              </div>
            </div>

            {/* Floating stat chips */}
            <div className="absolute -top-3 -right-2 sm:-right-3 px-2.5 sm:px-3 py-1.5 rounded-xl bg-primary/20 border border-primary/40 backdrop-blur-sm shadow-lg">
              <p className="text-[10px] sm:text-xs font-mono-data text-primary font-medium">↑ 4.1x ROAS</p>
            </div>
            <div className="absolute -bottom-3 -left-2 sm:-left-3 px-2.5 sm:px-3 py-1.5 rounded-xl bg-card border border-border/60 backdrop-blur-sm shadow-lg">
              <p className="text-[10px] sm:text-xs font-mono-data text-muted-foreground">30+ brands automated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
