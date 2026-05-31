import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { consultingCopy } from "@/content/consultingCopy";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { shineColors } from "@/theme/consulting-palette";

const steps = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "A focused 15–30 minute conversation to understand your goals, current stack, team structure, and bottlenecks — so we know where to look first.",
  },
  {
    step: "02",
    title: "Systems & Workflow Audit",
    desc: "We map manual work across operations, sales, marketing, HR, and data — identifying friction, duplication, and high-impact AI opportunities.",
  },
  {
    step: "03",
    title: "AI Opportunity Roadmap",
    desc: "You receive a prioritized plan: quick wins, recommended tools, integrations, and ROI logic — built for your business, not a generic template.",
  },
  {
    step: "04",
    title: "Advisory & Optional Build",
    desc: "Ongoing consults and on-demand reviews as you implement. Selective hands-on build support when scope and capacity fit — not full-service agency retainers.",
  },
];

const Philosophy = () => {
  const { enableHeavyEffects } = usePerformanceProfile();
  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  return (
    <section className="py-14 md:py-28 lg:py-32 bg-card relative overflow-hidden" id="philosophy">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 philosophy-grid opacity-30" aria-hidden />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div ref={leftRef}>
            <motion.p
              className="section-eyebrow mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              How We Consult
            </motion.p>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-5 sm:mb-6 text-balance leading-[1.1]"
              initial={{ opacity: 0, y: 24 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We don&apos;t run your business.<br />
              <span className="text-foreground">We show you where AI should.</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Most vendors sell you hours of execution. We give you clarity — where AI belongs in your business, what to prioritize, and how to move forward without guessing.
            </motion.p>
            <motion.p
              className="text-muted-foreground leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              We work with leaders who want strategic direction, not another agency retainer. If you are ready to assess AI across your whole operation — on a call, in a session, or on demand — you are in the right place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              <HoverBorderGradient
                as="a"
                href="#cta"
                containerClassName="rounded-lg"
                innerClassName="btn-cta gap-2 px-6 py-3 rounded-lg font-medium"
              >
                {consultingCopy.ctaPrimary}
                <ArrowRight size={16} />
              </HoverBorderGradient>
            </motion.div>
          </div>

          {/* Right: Animated Steps */}
          <div
            ref={stepsRef}
            className="relative overflow-hidden bg-background/60 rounded-2xl p-6 md:p-8 lg:p-10 border border-white/5"
          >
            <ShineBorder
              enabled={enableHeavyEffects}
              shineColor={shineColors}
              borderWidth={1}
              duration={14}
              className="z-0"
            />
            <div className="relative z-10 space-y-0">
              {steps.map((item, i) => (
                <motion.div
                  key={item.step}
                  className="flex gap-5 group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-9 h-9 rounded-xl bg-gold-subtle border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold/15 group-hover:border-gold/50 transition-all duration-300"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={stepsInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.12 + 0.1, type: "spring", stiffness: 200 }}
                    >
                      <span className="text-xs font-mono-data text-gold-light font-semibold">{item.step}</span>
                    </motion.div>
                    {i < steps.length - 1 && (
                      <motion.div
                        className="w-px my-2 bg-gradient-to-b from-gold/50 to-transparent min-h-[2rem]"
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={stepsInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.12 + 0.25 }}
                        style={{ transformOrigin: "top" }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                    <h4 className="font-display font-semibold text-foreground mb-1.5 group-hover:text-gold-light transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
