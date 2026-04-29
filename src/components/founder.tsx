import { Quote, Linkedin, Mail } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShineBorder } from "@/registry/magicui/shine-border";

const Founder = () => {
  return (
    <section className="py-10 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/50 bg-card/20 p-5 sm:p-6 lg:border-0 lg:bg-transparent lg:p-0">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-8 lg:items-start">
            {/* Intro — mobile first; desktop col 1 row 1 */}
            <div className="space-y-4 lg:col-start-1 lg:row-start-1">
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Founder
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-balance">
                Behind WebCom&nbsp;Media.
              </h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                WebCom Media was started with a simple belief: performance marketing should feel
                honest, transparent, and ROI‑driven. No vanity metrics, no confusing reports –
                just clear revenue impact.
              </p>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                I personally stay close to every client account, from strategy to execution,
                ensuring we&apos;re not just spending more, but growing profitably month over month.
              </p>
            </div>

            {/* Profile card — desktop col 2 row 1 */}
            <div className="relative overflow-hidden bg-card/80 rounded-2xl p-5 md:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.55)] lg:col-start-2 lg:row-start-1">
              <ShineBorder
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={1}
                duration={14}
                className="z-0"
              />
              <div className="relative z-10 flex gap-4 items-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-border/60 shrink-0 bg-gradient-to-br from-primary/60 via-metric/60 to-accent/60">
                  <img
                    src="/founder-ansh-malviya.png"
                    alt="Ansh Malviya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground">Ansh Malviya</p>
                  <p className="text-xs text-muted-foreground mb-2">Founder, WebCom Media</p>
                  <p className="text-xs text-muted-foreground">
                    Based in India, focused on building performance‑driven systems for brands that
                    take growth seriously.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy — desktop col 2 row 2 */}
            <div className="relative overflow-hidden bg-card/70 rounded-2xl p-6 md:p-8 shadow-[0_18px_45px_rgba(0,0,0,0.55)] lg:col-start-2 lg:row-start-2">
              <ShineBorder
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={1}
                duration={14}
                className="z-0"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Quote size={16} />
                  </div>
                  <p className="text-xs font-mono-data text-muted-foreground uppercase tracking-[0.18em]">
                    Philosophy
                  </p>
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
                  &quot;My job is simple – make your ad spend feel like an investment, not an
                  expense. That means clear communication, aggressive testing, and never hiding
                  behind complicated dashboards.&quot;
                </p>
                <p className="text-xs text-muted-foreground">
                  If you&apos;re looking for a long‑term growth partner who sweats the numbers as
                  much as you do, you&apos;ll feel at home with WebCom Media.
                </p>
              </div>
            </div>

            {/* Actions — after story on mobile; desktop col 1 row 2 */}
            <div className="space-y-4 pt-2 border-t border-border/40 lg:border-t-0 lg:pt-0 lg:col-start-1 lg:row-start-2 flex flex-col items-center lg:items-start">
              <div className="flex flex-col gap-3 w-full max-w-md mx-auto lg:mx-0">
                <HoverBorderGradient
                  as="a"
                  href="mailto:anshmalviya010@gmail.com"
                  containerClassName="rounded-lg w-full"
                  innerClassName="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border/60 bg-card/60 text-sm font-medium text-foreground hover:border-primary/60 hover:bg-card transition-colors"
                >
                  <Mail size={16} className="shrink-0 text-primary" aria-hidden />
                  Book a call with me
                </HoverBorderGradient>
                <HoverBorderGradient
                  as="a"
                  href="https://www.linkedin.com/in/ansh-malviya-0614523bb/"
                  target="_blank"
                  rel="noreferrer"
                  containerClassName="rounded-lg w-full"
                  innerClassName="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border/40 bg-card/40 text-sm text-foreground hover:border-primary/50 hover:bg-card/60 transition-colors"
                >
                  <Linkedin size={18} className="shrink-0 text-primary" aria-hidden />
                  View on LinkedIn
                </HoverBorderGradient>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
