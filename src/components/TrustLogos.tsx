import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { useVisibilityPause } from "@/hooks/useVisibilityPause";
import logoConcepz from "@/assets/trust/logo-concepz.png";
import logoMg from "@/assets/trust/logo-mg.png";
import logoKravic from "@/assets/trust/logo-kravic.png";
import logoElectronics from "@/assets/trust/logo-electronics.png";
import logoPrabhat from "@/assets/trust/logo-prabhat.png";

const trustBrands: {
  src: string;
  alt: string;
  name: string;
  imgClass?: string;
}[] = [
  { src: logoConcepz, alt: "CONCEPZ", name: "CONCEPZ" },
  { src: logoMg, alt: "MG", name: "MG" },
  { src: logoKravic, alt: "KRAVIC", name: "KRAVIC", imgClass: "opacity-95" },
  { src: logoElectronics, alt: "Electronics", name: "Electronics" },
  { src: logoPrabhat, alt: "Prabhat Digital Signage", name: "Prabhat Digital Signage" },
];

const loopLogos: LogoItem[] = trustBrands.map((b) => ({
  src: b.src,
  alt: b.alt,
  title: b.name,
}));

const TrustLogos = () => {
  const { isMobile } = usePerformanceProfile();
  const { ref, isActive } = useVisibilityPause<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-20 overflow-hidden border-y border-border/40"
      aria-labelledby="trust-logos-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -20%, hsl(0 0% 100% / 0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 30%, hsl(0 0% 100% / 0.1), transparent 60%)",
        }}
      />
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
            Trusted by growing brands
          </p>
          <h2
            id="trust-logos-heading"
            className="text-3xl md:text-4xl font-display font-bold text-foreground text-balance"
          >
            Companies That Trust Us
          </h2>
        </div>

        <div className="py-6 md:py-8 overflow-hidden">
          <LogoLoop
            logos={loopLogos}
            speed={isMobile ? 28 : 42}
            paused={!isActive}
            direction="left"
            logoHeight={44}
            gap={20}
            hoverSpeed={0}
            scaleOnHover={false}
            fadeOut
            fadeOutColor="hsl(0 0% 4%)"
            ariaLabel="Companies that trust WebCom Media"
            className="w-full"
            renderItem={(item) => {
              if (!("src" in item)) return null;
              const meta = trustBrands.find((b) => b.src === item.src);
              return (
                <div
                  className="
                    group/card relative flex h-[92px] w-[132px] shrink-0 items-center justify-center rounded-2xl
                    border border-transparent bg-gradient-to-b from-card/95 to-card/60 px-3 py-4
                    shadow-[inset_0_1px_0_hsl(0_0%_100%_/_0.04),0_14px_32px_rgba(0,0,0,0.3)]
                    transition-all duration-300
                    hover:border-primary/20
                    hover:shadow-[inset_0_1px_0_hsl(0_0%_100%_/_0.06),0_18px_40px_hsl(0 0% 100% /0.08)]
                  "
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 transition-opacity group-hover/card:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 85% 70% at 50% 0%, hsl(0 0% 100% / 0.14), transparent 65%)",
                    }}
                    aria-hidden
                  />
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    title={item.title}
                    className={`relative z-10 h-9 w-auto max-w-[6.5rem] object-contain object-center drop-shadow-[0_0_16px_hsl(0 0% 100% /0.12)] sm:h-10 ${meta?.imgClass ?? ""}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
