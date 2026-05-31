import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Phone, Search, Map, MessageCircle } from "lucide-react";
import ConsultingStepVisual, { type ConsultingStepId } from "@/components/illustrations/ConsultingStepVisual";
import { consultingCopy } from "@/content/consultingCopy";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { useVisibilityPause } from "@/hooks/useVisibilityPause";

const STEPS: {
  id: ConsultingStepId;
  step: string;
  title: string;
  desc: string;
  icon: typeof Phone;
}[] = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery Call",
    desc: "15–30 min to align on goals, stack, and where to look first.",
    icon: Phone,
  },
  {
    id: "audit",
    step: "02",
    title: "Systems Audit",
    desc: "We map friction across ops, sales, marketing, HR, and data.",
    icon: Search,
  },
  {
    id: "roadmap",
    step: "03",
    title: "AI Roadmap",
    desc: "Prioritized quick wins, tools, integrations, and ROI logic.",
    icon: Map,
  },
  {
    id: "advisory",
    step: "04",
    title: "Advisory & Build",
    desc: "On-demand guidance; selective implementation when it fits.",
    icon: MessageCircle,
  },
];

const HowWeWorkShowcase = () => {
  const [active, setActive] = useState<ConsultingStepId>("discovery");
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const profile = usePerformanceProfile();
  const { ref: sectionRef, isActive: sectionActive } = useVisibilityPause<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-24 lg:py-28 overflow-hidden"
      aria-labelledby="how-we-work-heading"
    >
      <div className="pointer-events-none absolute inset-0 ai-constellation opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,600px)] h-[400px]"
        style={{
          background: "radial-gradient(ellipse, hsl(0 0% 100% /0.12), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <motion.p
            className="section-eyebrow mb-3"
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
          >
            Visual walkthrough
          </motion.p>
          <motion.h2
            id="how-we-work-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground text-balance mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
          >
            See how AI consulting{" "}
            <span className="text-primary">actually works</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
          >
            Tap a step below — each phase has a clear outcome. No black-box agency retainers.
          </motion.p>
        </div>

        {/* Mobile: illustration first */}
        <div className="lg:hidden mb-6">
          <ConsultingStepVisual step={active} animate={profile.enableHeavyEffects && sectionActive} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Step selector */}
          <div className="flex flex-col gap-2 sm:gap-3 order-2 lg:order-1">
            {STEPS.map((s) => {
              const isActive = active === s.id;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={`group text-left w-full rounded-xl border p-4 sm:p-5 transition-all duration-300 ${
                    isActive
                      ? "border-primary/50 bg-primary/10 shadow-[0_0_30px_hsl(0 0% 100% /0.15)]"
                      : "border-white/5 bg-card/40 hover:border-primary/25 hover:bg-card/60"
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-primary/25 text-primary" : "bg-muted/50 text-muted-foreground group-hover:text-primary"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono-data text-primary">{s.step}</span>
                        <h3 className={`font-display font-semibold text-sm sm:text-base ${isActive ? "text-primary" : "text-foreground"}`}>
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
            <a
              href="#cta"
              className="btn-cta mt-2 gap-2 px-5 py-3 rounded-lg text-sm"
            >
              {consultingCopy.ctaPrimary}
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Desktop illustration */}
          <div className="hidden lg:block order-2 sticky top-28">
            <ConsultingStepVisual
              step={active}
              className="max-h-none"
              animate={profile.enableHeavyEffects && sectionActive}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkShowcase;
