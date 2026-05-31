import { Mail, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CountUp from "@/components/CountUp";
import { consultingCopy } from "@/content/consultingCopy";
const stats = [
  { value: 30, suffix: "+", label: "Businesses Advised" },
  { value: 50, suffix: "+", label: "Opportunities Mapped" },
  { value: 6, suffix: "", label: "Domains Reviewed" },
];

const Founder = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <section id="founder" className="relative py-16 md:py-28 overflow-hidden">
      {/* Atmospheric background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 50%, hsl(0 0% 100% /0.1) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 20% 50%, hsl(0 0% 100% /0.06), transparent 60%)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section label */}
        <motion.p
          className="section-eyebrow mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          The Person Behind It
        </motion.p>

        {/* Main card */}
        <motion.div
          ref={cardRef}
          className="relative rounded-3xl border border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Inner glow top edge */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-px"
            aria-hidden
            style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% /0.4), transparent)" }}
          />

          <div className="grid lg:grid-cols-[1fr_420px] gap-0">

            {/* Left: content */}
            <div className="p-7 sm:p-10 md:p-14 flex flex-col justify-between gap-10">

              {/* Top: name + bio */}
              <div>
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -16 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  {/* Avatar — mobile only */}
                  <div className="lg:hidden relative w-14 h-14 rounded-2xl overflow-hidden border border-primary/30 shrink-0 shadow-[0_0_20px_hsl(0 0% 100% /0.2)]">
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
                    <p className="text-xs font-mono-data text-primary mt-0.5">Founder & AI Consultant</p>
                  </div>
                </motion.div>

                <motion.h3
                  className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground text-balance leading-[1.15] mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Built by someone who helps you{" "}
                  <span className="text-primary">find AI leverage — not sell you hours.</span>
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.28 }}
                >
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base max-w-xl">
                    WebCom Media is a solo AI consulting practice. I started it after seeing too many businesses buy tools they never use — or hire agencies that run activity without strategic direction.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-xl">
                    Today I work with leaders on discovery calls, audit sessions, and on-demand advice — mapping where AI fits across operations, sales, marketing, and teams. When build support makes sense and capacity allows, I help selectively. I do not take on full agency retainers.
                  </p>
                </motion.div>
              </div>

              {/* Quote block */}
              <motion.div
                className="relative pl-5 border-l-2 border-primary/50"
                initial={{ opacity: 0, x: -16 }}
                animate={cardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <div
                  className="pointer-events-none absolute -left-px top-0 bottom-0 w-px"
                  style={{ background: "linear-gradient(180deg, transparent, hsl(0 0% 100% /0.8), transparent)" }}
                  aria-hidden
                />
                <p className="text-base sm:text-lg text-foreground font-display italic leading-relaxed">
                  "My job is simple — help you see where AI belongs in your business, in plain language, with a roadmap you can actually follow. No vanity metrics. No overselling execution you do not need."
                </p>
                <p className="text-xs font-mono-data text-muted-foreground mt-3">— Ansh Malviya</p>
              </motion.div>

              {/* Stats row — CountUp */}
              <motion.div
                className="flex flex-wrap gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.42 }}
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 min-w-[90px] rounded-2xl border border-white/5 bg-background/60 px-4 py-3 text-center"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-gold-light font-mono-data">
                      <CountUp
                        from={0}
                        to={s.value}
                        duration={2}
                        delay={0.5}
                        className="tabular-nums"
                      />
                      {s.suffix}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.48 }}
              >
                <a
                  href="#cta"
                  className="btn-cta gap-2 px-5 py-3 rounded-lg text-sm"
                >
                  {consultingCopy.ctaPrimary}
                  <ArrowRight size={14} />
                </a>
                <a
                  href={`mailto:${consultingCopy.contactEmail}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gold/25 bg-card/60 text-sm text-foreground transition-all duration-200 hover:border-gold/45 hover:bg-card hover:-translate-y-px"
                >
                  <Mail size={15} />
                  Email
                </a>
                <a
                  href={consultingCopy.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/5 bg-card/60 text-sm text-foreground transition-all duration-200 hover:border-gold/35 hover:bg-card hover:-translate-y-px"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              </motion.div>
            </div>

            {/* Right: large photo — desktop only */}
            <div className="hidden lg:block relative overflow-hidden">
              <img
                src="/founder-ansh-malviya.png"
                alt="Ansh Malviya — Founder and AI Consultant, WebCom Media"
                className="w-full h-full object-cover object-top"
                style={{ minHeight: "500px" }}
              />
              {/* Gradient fade left edge */}
              <div
                className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                style={{ background: "linear-gradient(90deg, hsl(0 0% 7%), transparent)" }}
                aria-hidden
              />
              {/* Gradient fade bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent, hsl(0 0% 7%))" }}
                aria-hidden
              />
              {/* Glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(0 0% 100% /0.08), transparent 70%)",
                }}
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;
