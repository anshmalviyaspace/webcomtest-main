import { Bot, BarChart3, PenTool, Workflow, MessageSquareCode, Globe } from "lucide-react";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

/* ─── Mini visual graphics per card ─── */

/** Animated flow: three nodes connected by pulsing lines */
const FlowGraphic = () => (
  <div className="relative h-14 w-full flex items-center justify-center gap-3 mb-4" aria-hidden>
    {["Lead", "AI", "Action"].map((label, i) => (
      <div key={label} className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center"
            style={{ boxShadow: "0 0 10px hsla(259,95%,65%,0.2)" }}
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
      { text: "Qualify this lead →", align: "left", delay: 0 },
      { text: "Done. Booked for 3 PM ✓", align: "right", delay: 0.4 },
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
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
          style={{ maxWidth: 14 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [h * 0.6, h, h * 0.8, h] }}
          transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          style={{ height: `${h * 100}%`, transformOrigin: "bottom", maxWidth: 14 }}
        />
      ))}
      {/* ROAS label */}
      <div className="absolute top-0 right-4 text-[9px] font-mono-data text-primary">4.1x ↑</div>
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
        style={{ boxShadow: "0 0 16px hsla(259,95%,65%,0.2)" }}
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

const aiServices = [
  {
    icon: Bot,
    tag: "Core AI",
    title: "AI Workflow Automation",
    description: "Replace manual steps with intelligent AI agents.",
    accent: "hsla(259,95%,65%,0.15)",
  },
  {
    icon: MessageSquareCode,
    tag: "Core AI",
    title: "AI Chatbots & Agents",
    description: "Qualify leads, answer queries, book calls 24/7.",
    accent: "hsla(311,95%,76%,0.12)",
  },
  {
    icon: Workflow,
    tag: "Core AI",
    title: "CRM & Systems Integration",
    description: "One automated pipeline. No missed follow-ups.",
    accent: "hsla(259,95%,65%,0.12)",
  },
];

const marketingServices = [
  {
    icon: BarChart3,
    tag: "Paid Media",
    title: "Meta, Google & LinkedIn Ads",
    description: "AI-optimized campaigns with real-time ROAS tracking.",
    accent: "hsla(259,95%,65%,0.1)",
  },
  {
    icon: PenTool,
    tag: "Content",
    title: "AI Content at Scale",
    description: "10x speed content without losing your brand voice.",
    accent: "hsla(311,95%,76%,0.1)",
  },
  {
    icon: Globe,
    tag: "Web",
    title: "Website Creation",
    description: "High-converting pages built to turn visitors into leads.",
    accent: "hsla(259,95%,65%,0.1)",
  },
];

const ServiceCard = ({
  icon: Icon,
  tag,
  title,
  description,
  accent,
  index,
}: {
  icon: React.ElementType;
  tag: string;
  title: string;
  description: string;
  accent: string;
  index: number;
}) => {
  const Graphic = GRAPHICS[index];
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/60 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_hsla(259,95%,65%,0.08)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <ShineBorder
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
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
        <Graphic />

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-14 md:py-28 lg:py-32 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, hsla(259,95%,65%,0.08), transparent 70%)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className="max-w-2xl mb-10 sm:mb-14 md:mb-20">
          <motion.p
            className="text-xs font-mono-data tracking-widest text-primary uppercase mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What We Build
          </motion.p>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance mb-4 sm:mb-5 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI-first systems that run your marketing on autopilot.
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Two layers. One outcome: growth without the grind.
          </motion.p>
        </div>

        {/* AI Core */}
        <div className="mb-10 sm:mb-14">
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono-data text-primary tracking-widest uppercase">Layer 01 — AI Core</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {aiServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* Marketing Execution */}
        <div>
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-card/80 border border-white/5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              <span className="text-[10px] sm:text-xs font-mono-data text-muted-foreground tracking-widest uppercase">Layer 02 — Marketing Execution</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {marketingServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
