import { FileText, Layers, Wrench } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const deliverables = [
  {
    icon: FileText,
    title: "Opportunity Map",
    desc: "Every manual touchpoint scored by impact and effort — so you know what to tackle first.",
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-16 opacity-80" aria-hidden>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="12" y={14 + i * 22} width={90 - i * 15} height="14" rx="4" fill={`hsl(0 0% 100% / ${0.08 + i * 0.03})`} stroke="hsl(0 0% 100% / 0.2)" />
        ))}
      </svg>
    ),
  },
  {
    icon: Layers,
    title: "Prioritized Roadmap",
    desc: "Phased plan with tools, integrations, and ROI logic — built for your stack, not a template.",
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-16 opacity-80" aria-hidden>
        <rect x="20" y="50" width="80" height="12" rx="3" fill="hsl(0 0% 100% /0.2)" stroke="hsl(0 0% 100% /0.4)" />
        <rect x="28" y="34" width="64" height="12" rx="3" fill="hsl(0 0% 100% /0.2)" stroke="hsl(0 0% 100% /0.45)" />
        <rect x="36" y="18" width="48" height="12" rx="3" fill="hsl(0 0% 100% /0.35)" stroke="hsl(0 0% 100% /0.6)" />
      </svg>
    ),
  },
  {
    icon: Wrench,
    title: "Tool & Stack Guide",
    desc: "What to buy, what to skip, and how your team should adopt — you stay in control.",
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-16 opacity-80" aria-hidden>
        <circle cx="40" cy="40" r="14" fill="hsl(0 0% 100% /0.2)" stroke="hsl(0 0% 100% /0.5)" />
        <circle cx="80" cy="32" r="10" fill="hsl(0 0% 100% /0.15)" stroke="hsl(0 0% 100% /0.4)" />
        <line x1="52" y1="38" x2="72" y2="34" stroke="hsl(0 0% 100% /0.5)" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
    ),
  },
];

const DeliverablesShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-12 md:py-20 relative overflow-hidden" aria-labelledby="deliverables-heading">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-xl mx-auto mb-8 md:mb-12">
          <p className="section-eyebrow mb-3">What you walk away with</p>
          <h2 id="deliverables-heading" className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground text-balance">
            Tangible outputs — not vague &ldquo;strategy decks&rdquo;
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {deliverables.map((d, i) => (
            <motion.article
              key={d.title}
              className="group relative rounded-2xl border border-white/5 bg-card/50 p-5 sm:p-6 overflow-hidden hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute inset-0 ai-panel-grid opacity-30 pointer-events-none" aria-hidden />
              <div className="relative z-10">
                {d.visual}
                <div className="flex items-center gap-2 mt-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gold-subtle border border-gold/20 flex items-center justify-center">
                    <d.icon size={16} className="text-gold-light" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm sm:text-base group-hover:text-gold-light transition-colors">
                    {d.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverablesShowcase;
