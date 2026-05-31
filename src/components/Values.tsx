import { Cpu, FileText, Scale, Target } from "lucide-react";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { shineColors } from "@/theme/consulting-palette";

const values = [
  {
    icon: Cpu,
    title: "AI-First Thinking",
    desc: "We start with where AI should sit in your business — not which shiny tool to buy first.",
    gradient: "from-primary/20 to-transparent",
    num: "01",
  },
  {
    icon: FileText,
    title: "Clarity Over Complexity",
    desc: "Actionable roadmaps and plain language — not hundred-page decks you will never implement.",
    gradient: "from-metric/20 to-transparent",
    num: "02",
  },
  {
    icon: Scale,
    title: "Honest Scope",
    desc: "A solo consulting practice — we advise with integrity and do not over-promise full agency delivery.",
    gradient: "from-primary/15 to-transparent",
    num: "03",
  },
  {
    icon: Target,
    title: "Your Outcomes First",
    desc: "Recommendations tied to your KPIs and constraints — not billable hours for their own sake.",
    gradient: "from-metric/15 to-transparent",
    num: "04",
  },
];

const Values = () => {
  const { enableHeavyEffects } = usePerformanceProfile();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section id="values" className="py-16 md:py-32 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(0 0% 100% /0.07), transparent 65%)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="max-w-2xl mb-16">
          <motion.p
            className="section-eyebrow mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Principles
          </motion.p>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance leading-[1.1]"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The beliefs that shape every engagement.
          </motion.h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="group relative overflow-hidden bg-card/60 rounded-2xl p-6 md:p-7 border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              initial={{ opacity: 0, y: 32 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ShineBorder
                enabled={enableHeavyEffects}
                shineColor={shineColors}
                borderWidth={1}
                duration={16}
                className="z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Faded background number */}
              <div
                className="pointer-events-none absolute -bottom-3 -right-2 font-display font-bold text-[5rem] leading-none select-none"
                style={{ color: "hsl(0 0% 100% /0.06)" }}
                aria-hidden
              >
                {v.num}
              </div>

              {/* Gradient accent on hover */}
              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                aria-hidden
              />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
