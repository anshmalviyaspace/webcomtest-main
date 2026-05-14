import { Bot, BarChart3, PenTool, Workflow, MessageSquareCode, Globe } from "lucide-react";
import { ShineBorder } from "@/registry/magicui/shine-border";

const aiServices = [
  {
    icon: Bot,
    tag: "Core AI",
    title: "AI Workflow Automation",
    description: "We map your entire marketing funnel and replace manual steps with intelligent AI agents — from lead capture to follow-up to reporting.",
    accent: "hsla(259,95%,65%,0.15)",
  },
  {
    icon: MessageSquareCode,
    tag: "Core AI",
    title: "AI Chatbots & Agents",
    description: "Custom-trained AI assistants that qualify leads, answer queries, and book calls 24/7 — embedded directly into your website or WhatsApp.",
    accent: "hsla(311,95%,76%,0.12)",
  },
  {
    icon: Workflow,
    tag: "Core AI",
    title: "CRM & Systems Integration",
    description: "Connect your ads, CRM, email, and analytics into one automated pipeline. No more manual data entry. No more missed follow-ups.",
    accent: "hsla(259,95%,65%,0.12)",
  },
];

const marketingServices = [
  {
    icon: BarChart3,
    tag: "Paid Media",
    title: "Meta, google & linkedin ads",
    description: "AI-optimized ad campaigns on Meta, LinkedIn, and google — precision targeting, dynamic creatives, and real-time ROAS tracking.",
    accent: "hsla(259,95%,65%,0.1)",
  },
  {
    icon: PenTool,
    tag: "Content",
    title: "AI Content at Scale",
    description: "Strategy, copy, and creative produced at 10x speed using AI — without losing your brand voice. Blogs, ads, reels, emails.",
    accent: "hsla(311,95%,76%,0.1)",
  },
  {
    icon: Globe,
    tag: "Web",
    title: "Website Creation",
    description: "High-converting landing pages and storefronts built for performance — fast, beautiful, and optimised to turn visitors into leads.",
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
}) => (
  <div
    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-5 sm:p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_hsla(259,95%,65%,0.08)]"
    style={{ animationDelay: `${index * 0.08}s` }}
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
      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 shrink-0">
          <Icon size={18} className="text-primary" />
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono-data tracking-widest text-muted-foreground uppercase border border-border/60 rounded-full px-2 sm:px-2.5 py-1 bg-card/80 ml-2">
          {tag}
        </span>
      </div>
      <h3 className="font-display font-semibold text-foreground text-base sm:text-lg mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const Services = () => {
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
        <div className="max-w-2xl mb-10 sm:mb-14 md:mb-20">
          <p className="text-xs font-mono-data tracking-widest text-primary uppercase mb-3 sm:mb-4">
            What We Build
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance mb-4 sm:mb-5 leading-[1.1]">
            AI-first systems that run your marketing on autopilot.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Two layers. One outcome: growth without the grind.
          </p>
        </div>

        {/* AI Core */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono-data text-primary tracking-widest uppercase">Layer 01 — AI Core</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {aiServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* Marketing Execution */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-card/80 border border-border/60 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              <span className="text-[10px] sm:text-xs font-mono-data text-muted-foreground tracking-widest uppercase">Layer 02 — Marketing Execution</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
          </div>
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
