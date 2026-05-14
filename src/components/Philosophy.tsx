import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { ArrowRight } from "lucide-react";

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
  return (
    <section className="py-14 md:py-28 lg:py-32 bg-card relative overflow-hidden" id="philosophy">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 philosophy-grid opacity-30" aria-hidden />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-mono-data tracking-widest text-primary uppercase mb-4">
              How We Work
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-5 sm:mb-6 text-balance leading-[1.1]">
              We don't run campaigns.<br />
              <span className="text-primary">We build machines.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg">
              Most agencies hand you a report. We hand you a system — one that generates leads, nurtures them, and converts them while you sleep.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
              We work with brands that are serious about growth. Not brands looking for someone to "manage their socials." If you want AI embedded into your business infrastructure, you're in the right place.
            </p>
            <HoverBorderGradient
              as="a"
              href="#cta"
              containerClassName="rounded-lg"
              innerClassName="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_30px_hsla(259,95%,65%,0.4)] active:scale-[0.98]"
            >
              Get Your AI Audit
              <ArrowRight size={16} />
            </HoverBorderGradient>
          </div>

          {/* Right: Steps */}
          <div className="relative overflow-hidden bg-background/60 rounded-2xl p-6 md:p-8 lg:p-10 border border-border/40">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1}
              duration={14}
              className="z-0"
            />
            <div className="relative z-10 space-y-0">
              {steps.map((item, i) => (
                <div key={item.step} className="flex gap-5 group">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                      <span className="text-xs font-mono-data text-primary font-semibold">{item.step}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 my-2 bg-gradient-to-b from-primary/30 to-transparent min-h-[2rem]" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                    <h4 className="font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
