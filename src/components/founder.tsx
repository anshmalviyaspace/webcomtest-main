import { Linkedin, Mail, ArrowRight } from "lucide-react";

const stats = [
  { value: "30+", label: "Brands Scaled" },
  { value: "₹50L+", label: "Ad Spend Managed" },
  { value: "4.1x", label: "Avg. ROAS" },
];

const Founder = () => {
  return (
    <section className="relative py-16 md:py-28 overflow-hidden">
      {/* Atmospheric background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 50%, hsla(259,95%,65%,0.1) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 20% 50%, hsla(311,95%,76%,0.06), transparent 60%)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section label */}
        <p className="text-xs font-mono-data tracking-widest text-primary uppercase mb-10 md:mb-14">
          The Person Behind It
        </p>

        {/* Main card — full width, cinematic */}
        <div className="relative rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">

          {/* Inner glow top edge */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-px"
            aria-hidden
            style={{ background: "linear-gradient(90deg, transparent, hsla(259,95%,65%,0.4), transparent)" }}
          />

          <div className="grid lg:grid-cols-[1fr_420px] gap-0">

            {/* Left: content */}
            <div className="p-7 sm:p-10 md:p-14 flex flex-col justify-between gap-10">

              {/* Top: name + bio */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  {/* Avatar — mobile only, inline */}
                  <div className="lg:hidden relative w-14 h-14 rounded-2xl overflow-hidden border border-primary/30 shrink-0 shadow-[0_0_20px_hsla(259,95%,65%,0.2)]">
                    <img
                      src="/founder-ansh-malviya.png"
                      alt="Ansh Malviya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground leading-tight">
                      Ansh Malviya
                    </h2>
                    <p className="text-xs font-mono-data text-primary mt-0.5">Founder, WebCom Media</p>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground text-balance leading-[1.15] mb-6">
                  Built by someone who's obsessed with{" "}
                  <span className="text-primary">making your money work harder.</span>
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base max-w-xl">
                  WebCom Media started with one belief: most agencies are selling you activity, not results. Dashboards full of impressions. Reports full of excuses. I built this agency to be different — every decision we make is tied directly to your revenue.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-xl">
                  I stay personally close to every client account. Not because I have to — because I want to. When your ROAS goes up, I feel it. When it dips, I'm already on it before you notice.
                </p>
              </div>

              {/* Quote block */}
              <div className="relative pl-5 border-l-2 border-primary/50">
                <div
                  className="pointer-events-none absolute -left-px top-0 bottom-0 w-px"
                  style={{ background: "linear-gradient(180deg, transparent, hsla(259,95%,65%,0.8), transparent)" }}
                  aria-hidden
                />
                <p className="text-base sm:text-lg text-foreground font-display italic leading-relaxed">
                  "My job is simple — make your ad spend feel like an investment, not an expense. Clear communication, aggressive testing, and zero hiding behind complicated dashboards."
                </p>
                <p className="text-xs font-mono-data text-muted-foreground mt-3">— Ansh Malviya</p>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 min-w-[90px] rounded-2xl border border-border/50 bg-background/60 px-4 py-3 text-center"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-primary font-mono-data">{s.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:anshmalviya010@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_25px_hsla(259,95%,65%,0.5)] active:scale-[0.98]"
                >
                  <Mail size={15} />
                  Book a Call with Me
                  <ArrowRight size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/imanshmalviya/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-card/60 text-sm text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-card hover:-translate-y-px"
                >
                  <Linkedin size={15} className="text-primary" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right: large photo — desktop only */}
            <div className="hidden lg:block relative overflow-hidden">
              {/* Photo */}
              <img
                src="/founder-ansh-malviya.png"
                alt="Ansh Malviya — Founder, WebCom Media"
                className="w-full h-full object-cover object-top"
                style={{ minHeight: "500px" }}
              />
              {/* Gradient fade left edge */}
              <div
                className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                style={{ background: "linear-gradient(90deg, hsl(256,36%,12%), transparent)" }}
                aria-hidden
              />
              {/* Gradient fade bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent, hsl(256,36%,12%))" }}
                aria-hidden
              />
              {/* Glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsla(259,95%,65%,0.08), transparent 70%)",
                }}
                aria-hidden
              />
              {/* Floating badge */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-lg whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono-data text-muted-foreground">Available for clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
