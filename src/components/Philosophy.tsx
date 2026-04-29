import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShineBorder } from "@/registry/magicui/shine-border";

const Philosophy = () => {
  return (
    <section className="py-10 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 text-balance">
              We Do Away With the Fluff
            </h2>
            <p className="text-muted-foreground text-pretty mb-6 leading-relaxed">
              At WebCom Media, we've worked with various industry businesses to produce thousands of dollars in return on ad spend. We eliminate inefficiencies and vanity metrics to deliver real results.
            </p>
            <p className="text-muted-foreground text-pretty mb-8 leading-relaxed">
              Our approach is data-first and execution-focused. We look for specific kinds of clients—brands ready to scale, not just brands looking for a quick fix.
            </p>
            <HoverBorderGradient
              as="a"
              href="#cta"
              containerClassName="rounded-lg"
              innerClassName="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98]"
            >
              Book Your Discovery Call
            </HoverBorderGradient>
          </div>

          <div className="relative overflow-hidden bg-card rounded-2xl p-6 md:p-8 lg:p-12">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1}
              duration={14}
              className="z-0"
            />
            <div className="relative z-10">
              <div className="space-y-6">
                {[
                  { step: "01", title: "Discovery", desc: "Deep-dive into your business, goals, and current performance." },
                  { step: "02", title: "Strategy", desc: "Data-backed plan with clear KPIs and growth milestones." },
                  { step: "03", title: "Execution", desc: "Launch campaigns with precision targeting and creative." },
                  { step: "04", title: "Optimization", desc: "Continuous iteration based on real-time performance data." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="text-sm font-mono-data text-primary font-medium mt-0.5">{item.step}</span>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
