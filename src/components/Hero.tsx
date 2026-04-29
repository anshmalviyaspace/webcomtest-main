import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const LightPillar = lazy(() => import("./LightPillar"));
const SplitText = lazy(() => import("@/components/SplitText"));

const heroPillarFallback = (
  <div
    className="absolute inset-0 w-full h-full bg-background"
    style={{
      zIndex: 0,
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 50% -15%, hsla(259, 95%, 65%, 0.32), transparent 55%),
        radial-gradient(ellipse 55% 45% at 85% 12%, hsla(311, 95%, 76%, 0.18), transparent 58%)
      `,
    }}
    aria-hidden
  />
);

const Hero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative min-h-[100vh] md:min-h-[115vh] lg:min-h-[90vh] pt-28 pb-20 md:pt-40 md:pb-32 lg:pt-44 lg:pb-28 overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {reduceMotion ? (
          heroPillarFallback
        ) : (
          <Suspense fallback={heroPillarFallback}>
            <LightPillar
              topColor="#5227FF"
              bottomColor="#FF9FFC"
              intensity={1}
              rotationSpeed={0.3}
              glowAmount={0.002}
              pillarWidth={3}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={25}
              interactive={false}
              mixBlendMode="screen"
              quality="low"
            />
          </Suspense>
        )}
      </div>
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Copy */}
          <div className="max-w-2xl lg:max-w-[42rem]">
            <Suspense
              fallback={
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[4rem] xl:text-[4.35rem] font-display font-bold text-foreground leading-[1.08] text-balance mb-4 md:mb-6">
                  Performance marketing for the enterprise.
                </h1>
              }
            >
              <SplitText
                tag="h1"
                text="Performance marketing for the enterprise."
                className="text-3xl sm:text-4xl md:text-6xl lg:text-[4rem] xl:text-[4.35rem] font-display font-bold text-foreground leading-[1.08] text-balance mb-4 md:mb-6"
                delay={60}
                duration={1.1}
                splitType="chars"
                rootMargin="-120px"
                threshold={0.08}
                textAlign="left"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
              />
            </Suspense>

            <p className="animate-slide-up-delay text-sm md:text-lg text-muted-foreground text-pretty mb-5 md:mb-8 max-w-md">
              We scale revenue through precision PPC, data-driven creative & AI-powered strategies. No fluff, just growth.
            </p>

            <div className="animate-slide-up-delay-2 flex flex-col sm:flex-row gap-3">
              <HoverBorderGradient
                as="a"
                href="#cta"
                containerClassName="rounded-lg"
                innerClassName="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg bg-primary text-primary-foreground text-sm md:text-base font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98]"
              >
                Book a Free Strategy Call
                <ArrowRight size={16} />
              </HoverBorderGradient>
              <HoverBorderGradient
                as="a"
                href="#clients"
                containerClassName="rounded-lg"
                innerClassName="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg bg-foreground/10 text-foreground text-sm md:text-base font-medium transition-all duration-200 hover:bg-foreground/20"
              >
                See Our Results
              </HoverBorderGradient>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="animate-fade-in lg:mt-0 lg:block mt-6 lg:mt-0">
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="ml-auto text-xs text-muted-foreground font-mono-data">Campaign Analytics</span>
              </div>

              {/* Chart bars */}
              <div className="flex items-end gap-3 h-32 mb-6 px-2">
                {[60, 80, 45, 90, 70, 95, 55, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-md bg-primary/80"
                    style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}
                  />
                ))}
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Impressions", value: "1.2M" },
                  { label: "CTR", value: "4.8%" },
                  { label: "Conversions", value: "245" },
                  { label: "ROAS", value: "3.2x" },
                ].map((m) => (
                  <div key={m.label} className="bg-muted rounded-xl p-3.5">
                    <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                    <p className="text-lg font-mono-data font-medium text-primary">{m.value}</p>
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

export default Hero;
