import { ArrowRight, CheckCircle } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShineBorder } from "@/registry/magicui/shine-border";

const benefits = [
  "New quality & professional funnel system with a high-converting landing page",
  "Understand your increased revenue potential with Google & Facebook advertising",
  "Get a reliable agency that makes your company a priority",
  "Maximize your conversion rates & average order values",
];

const CTA = () => {
  return (
    <section id="cta" className="py-10 md:py-28 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest text-primary uppercase mb-4">
              Schedule Your Call
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 text-balance">
              Free 15-Minute Strategy Call
            </h2>
            <p className="text-muted-foreground text-pretty mb-8 leading-relaxed">
              By the end of this short call, you will have a clear understanding of the next steps you can take for your business to start generating consistent and reliable results online.
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 sm:items-center">
              <HoverBorderGradient
                as="a"
                href="mailto:webcommedia1@gmail.com"
                containerClassName="rounded-lg"
                innerClassName="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98]"
              >
                Speak To Our Team
                <ArrowRight size={16} />
              </HoverBorderGradient>
              <span className="text-sm text-muted-foreground">
                Or email:{" "}
                <a href="mailto:webcommedia1@gmail.com" className="text-primary hover:underline">
                  webcommedia1@gmail.com
                </a>
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-background/90 via-background/75 to-background/60 rounded-2xl p-6 md:p-8 lg:p-10">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1}
              duration={14}
              className="z-0"
            />
            <div className="relative z-10">
              <h3 className="text-xl font-display font-bold text-foreground mb-6">
                This audit call is perfect for:
              </h3>
              <div className="space-y-4">
                {[
                  "Businesses looking to take their offline business online",
                  "Brands ready to scale with paid advertising",
                  "Companies seeking a data-driven growth partner",
                  "Teams looking to maximize their ROAS",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-sm font-mono-data text-primary font-medium mt-0.5">0{i + 1}</span>
                    <p className="text-sm text-muted-foreground">{item}</p>
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

export default CTA;
