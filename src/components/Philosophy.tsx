import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "AI Audit",
    desc: "We map every manual touchpoint in your marketing — ads, follow-ups, reporting, content — and identify exactly where AI can replace human effort.",
  },
  {
    step: "02",
    title: "System Design",
    desc: "We architect your custom AI stack: which tools, which automations, which integrations. A blueprint built for your business, not a template.",
  },
  {
    step: "03",
    title: "Build & Integrate",
    desc: "We build and deploy the automations — connecting your CRM, ad platforms, content tools, and communication channels into one intelligent system.",
  },
  {
    step: "04",
    title: "Scale & Optimize",
    desc: "Once live, we run your paid campaigns on top of the AI foundation — continuously optimizing with real-time data, not gut feel.",
  },
];

const Philosophy = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  return (
    <section className="py-14 md:py-28 lg:py-32 bg-card relative overflow-hidden" id="philosophy">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 philosophy-grid opacity-30" aria-hidden />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left */}
          <div ref={leftRef}>
            <motion.p
              className="text-xs font-mono-data tracking-widest text-primary uppercase mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              How We Work
            </motion.p>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-5 sm:mb-6 text-balance leading-[1.1]"
              initial={{ opacity: 0, y: 24 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We don't run campaigns.<br />
              <span className="text-primary">We build machines.</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Most agencies hand you a report. We hand you a system — one that generates leads, nurtures them, and converts them while you sleep.
            </motion.p>
            <motion.p
              className="text-muted-foreground leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              We work with brands that are serious about growth. Not brands looking for someone to "manage their socials." If you want AI embedded into your business infrastructure, you're in the right place.
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
                innerClassName="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_30px_hsla(259,95%,65%,0.4)] active:scale-[0.98]"
              >
                Get Your AI Audit
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
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
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
                      className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={stepsInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.12 + 0.1, type: "spring", stiffness: 200 }}
                    >
                      <span className="text-xs font-mono-data text-primary font-semibold">{item.step}</span>
                    </motion.div>
                    {i < steps.length - 1 && (
                      <motion.div
                        className="w-px my-2 bg-gradient-to-b from-primary/40 to-transparent min-h-[2rem]"
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={stepsInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.12 + 0.25 }}
                        style={{ transformOrigin: "top" }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                    <h4 className="font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
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
