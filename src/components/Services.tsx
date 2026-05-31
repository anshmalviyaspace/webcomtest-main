import {
  Bot,
  BarChart3,
  PenTool,
  Workflow,
  MessageSquareCode,
  Users,
  Phone,
  ClipboardList,
  MessagesSquare,
  Globe,
} from "lucide-react";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import EcosystemMapIllustration from "@/components/illustrations/EcosystemMapIllustration";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { useVisibilityPause } from "@/hooks/useVisibilityPause";
import { shineColors } from "@/theme/consulting-palette";

const StaticCardGraphic = () => (
  <div className="relative h-14 w-full flex items-center justify-center mb-4 px-4" aria-hidden>
    <div className="h-1.5 w-full max-w-[140px] rounded-full bg-gradient-to-r from-primary/5 via-primary/25 to-primary/5" />
  </div>
);

/* ─── Mini visual graphics per card ─── */

/** Animated flow: three nodes connected by pulsing lines */
const FlowGraphic = () => (
  <div className="relative h-14 w-full flex items-center justify-center gap-3 mb-4" aria-hidden>
    {["Ops", "Map", "Plan"].map((label, i) => (
      <div key={label} className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center"
            style={{ boxShadow: "0 0 10px hsl(0 0% 100% /0.2)" }}
          >
            <span className="text-[9px] font-mono-data text-primary font-bold">{label}</span>
          </div>
        </div>
        {i < 2 && (
          <div className="flex items-center gap-0.5">
            {[0, 1, 2].map((d) => (
              <motion.div
                key={d}
                className="w-1 h-1 rounded-full bg-primary/60"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.2, delay: d * 0.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

/** Animated chat bubbles */
const ChatGraphic = () => (
  <div className="relative h-14 w-full flex flex-col gap-1.5 mb-4 px-2" aria-hidden>
    {[
      { text: "Where can AI help? →", align: "left", delay: 0 },
      { text: "Roadmap ready ✓", align: "right", delay: 0.4 },
    ].map((msg) => (
      <motion.div
        key={msg.text}
        className={`flex ${msg.align === "right" ? "justify-end" : "justify-start"}`}
        initial={{ opacity: 0, x: msg.align === "right" ? 10 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: msg.delay, repeat: Infinity, repeatDelay: 3 }}
      >
        <div
          className={`px-2.5 py-1 rounded-xl text-[9px] font-mono-data whitespace-nowrap ${
            msg.align === "right"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-card border border-white/5 text-muted-foreground"
          }`}
        >
          {msg.text}
        </div>
      </motion.div>
    ))}
  </div>
);

/** Animated sync rings */
const SyncGraphic = () => (
  <div className="relative h-14 w-full flex items-center justify-center mb-4" aria-hidden>
    <div className="relative flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/30"
          style={{ width: 20 + i * 18, height: 20 + i * 18 }}
          animate={{ opacity: [0.6, 0.2, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="w-5 h-5 rounded-full bg-primary/30 border border-primary/60 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
      </div>
      {/* Orbiting dots */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/70"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "0 0",
          }}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/70"
            style={{ top: -28, left: -3 }}
          />
        </motion.div>
      ))}
    </div>
  </div>
);

/** Animated bar chart */
const ChartGraphic = () => {
  const bars = [0.4, 0.65, 0.5, 0.8, 0.6, 0.9, 0.75];
  return (
    <div className="relative h-14 w-full flex items-end justify-center gap-1 mb-4 px-4" aria-hidden>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-primary/40"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [h * 0.6, h, h * 0.8, h] }}
          transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          style={{ height: `${h * 100}%`, transformOrigin: "bottom", maxWidth: 14 }}
        />
      ))}
      <div className="absolute top-0 right-4 text-[9px] font-mono-data text-primary">insights ↑</div>
    </div>
  );
};

/** Animated writing lines */
const ContentGraphic = () => (
  <div className="relative h-14 w-full flex flex-col justify-center gap-1.5 mb-4 px-2" aria-hidden>
    {[1, 0.7, 0.85, 0.5].map((w, i) => (
      <motion.div
        key={i}
        className="h-1.5 rounded-full bg-primary/25"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: w }}
        transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, repeatDelay: 2.5, ease: "easeOut" }}
        style={{ transformOrigin: "left", width: "100%" }}
      />
    ))}
    <motion.div
      className="absolute right-3 top-1 text-[9px] font-mono-data text-primary/70"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
    >
      AI ✍
    </motion.div>
  </div>
);

/** Animated globe pulse */
const WebGraphic = () => (
  <div className="relative h-14 w-full flex items-center justify-center mb-4" aria-hidden>
    <div className="relative">
      {/* Outer rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/20"
          style={{ width: 44 + i * 16, height: 44 + i * 16, top: -(i * 8) - 4, left: -(i * 8) - 4 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
      <div
        className="w-11 h-11 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
        style={{ boxShadow: "0 0 16px hsl(0 0% 100% /0.2)" }}
      >
        <Globe size={18} className="text-primary" />
      </div>
      {/* Speed lines */}
      {[0, 60, 120].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-px bg-primary/40 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "left center",
            rotate: deg,
          }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
    </div>
  </div>
);

const GRAPHICS = [FlowGraphic, ChatGraphic, SyncGraphic, ChartGraphic, ContentGraphic, WebGraphic];

const consultingDomains = [
  {
    icon: Workflow,
    tag: "Operations",
    title: "Operations & Workflows",
    description: "Manual processes, SOPs, and internal tools — where automation saves the most time.",
    accent: "hsl(0 0% 100% /0.15)",
  },
  {
    icon: MessageSquareCode,
    tag: "Sales",
    title: "Sales & CRM",
    description: "Pipeline stages, follow-ups, and lead routing — advisory on AI that supports revenue.",
    accent: "hsl(0 0% 100% /0.12)",
  },
  {
    icon: PenTool,
    tag: "Marketing",
    title: "Marketing & Funnels",
    description: "Ads, content, and landing flows — we advise on AI use, not run campaigns for you.",
    accent: "hsl(0 0% 100% /0.12)",
  },
  {
    icon: Users,
    tag: "People",
    title: "Team & HR",
    description: "Onboarding, training, and internal AI adoption — how your people work with new tools.",
    accent: "hsl(0 0% 100% /0.1)",
  },
  {
    icon: BarChart3,
    tag: "Data",
    title: "Data & Reporting",
    description: "Dashboards, attribution, and decision data — what to measure before you automate.",
    accent: "hsl(0 0% 100% /0.1)",
  },
  {
    icon: Bot,
    tag: "CX",
    title: "Customer Experience",
    description: "Support bots, ticketing, and response automation — where AI improves client touchpoints.",
    accent: "hsl(0 0% 100% /0.1)",
  },
];

const engagementTypes = [
  {
    icon: Phone,
    tag: "Intro",
    title: "Free AI Discovery Call",
    description: "15-minute intro to understand fit, priorities, and sensible next steps.",
    accent: "hsl(0 0% 100% /0.15)",
  },
  {
    icon: ClipboardList,
    tag: "Deep dive",
    title: "AI Systems Audit Session",
    description: "Structured call or meeting with a documented opportunity map for your stack.",
    accent: "hsl(0 0% 100% /0.12)",
  },
  {
    icon: MessagesSquare,
    tag: "Flexible",
    title: "On-Demand Consulting",
    description: "Async or scheduled check-ins as you implement — clarity when you need it.",
    accent: "hsl(0 0% 100% /0.12)",
  },
];

const ServiceCard = ({
  icon: Icon,
  tag,
  title,
  description,
  accent,
  index,
  reveal,
  liveGraphics,
  shineEnabled,
}: {
  icon: React.ElementType;
  tag: string;
  title: string;
  description: string;
  accent: string;
  index: number;
  reveal: boolean;
  liveGraphics: boolean;
  shineEnabled: boolean;
}) => {
  const Graphic = GRAPHICS[index % GRAPHICS.length];
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/60 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_hsl(0 0% 100% /0.08)]"
      initial={{ opacity: 0, y: 24 }}
      animate={reveal ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <ShineBorder
        enabled={shineEnabled}
        shineColor={shineColors}
        borderWidth={1}
        duration={16}
        className="z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 80% 60% at 20% 0%, ${accent}, transparent 70%)` }}
        aria-hidden
      />
      <div className="relative z-10">
        {/* Mini visual */}
        {liveGraphics ? <Graphic /> : <StaticCardGraphic />}

        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 shrink-0">
            <Icon size={16} className="text-primary" />
          </div>
          <span className="text-[9px] font-mono-data tracking-widest text-muted-foreground uppercase border border-white/5 rounded-full px-2 py-1 bg-card/80 ml-2">
            {tag}
          </span>
        </div>
        <h3 className="font-display font-semibold text-foreground text-sm sm:text-base mb-1.5 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const { enableHeavyEffects } = usePerformanceProfile();
  const { ref: sectionRef, isActive: sectionActive } = useVisibilityPause<HTMLElement>();
  const liveGraphics = enableHeavyEffects && sectionActive;
  const cardProps = {
    reveal: gridInView,
    liveGraphics,
    shineEnabled: enableHeavyEffects,
  };

  return (
    <section ref={sectionRef} id="services" className="py-14 md:py-28 lg:py-32 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, hsl(0 0% 100% /0.08), transparent 70%)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header + ecosystem illustration */}
        <div ref={ref} className="grid lg:grid-cols-[1fr_min(42%,320px)] gap-10 lg:gap-14 items-center mb-10 sm:mb-14 md:mb-20">
          <div className="max-w-2xl">
            <motion.p
              className="section-eyebrow mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              What We Consult On
            </motion.p>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance mb-4 sm:mb-5 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Clarity before code. Strategy before spend.
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We analyze your business end to end — then show you where AI creates real leverage.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-[280px] sm:max-w-sm mx-auto lg:max-w-none"
          >
            <EcosystemMapIllustration />
          </motion.div>
        </div>

        {/* Consulting domains */}
        <div ref={gridRef} className="mb-10 sm:mb-14">
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, x: -16 }}
            animate={gridInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono-data text-primary tracking-widest uppercase">Layer 01 — Consulting Domains</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {consultingDomains.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} {...cardProps} />
            ))}
          </div>
        </div>

        {/* How we engage */}
        <div>
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, x: -16 }}
            animate={gridInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-card/80 border border-white/5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              <span className="text-[10px] sm:text-xs font-mono-data text-muted-foreground tracking-widest uppercase">Layer 02 — How We Engage</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {engagementTypes.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} {...cardProps} />
            ))}
          </div>
          <motion.p
            className="mt-8 text-sm text-muted-foreground text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Implementation and builds are offered selectively — not full-service agency retainers.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Services;
