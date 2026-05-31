import { useEffect, useRef } from "react";
import { useVisibilityPause } from "@/hooks/useVisibilityPause";
import { Brain, BarChart3, Bot, Workflow, TrendingUp, Users, Headphones, ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion, useInView } from "motion/react";

/* ─── Deep-space particle canvas (pauses off-screen, throttled on mobile) ─── */
const SpaceCanvas = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let lastFrame = 0;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const targetFps = isMobile ? 24 : 40;
    const frameInterval = 1000 / targetFps;
    const drawConnections = !isMobile;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const particles: Particle[] = [];

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = () => {
      particles.length = 0;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.min(isMobile ? 35 : 55, Math.floor((w * h) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.4 + 0.08,
        });
      }
    };
    spawn();

    const CONNECT_DIST = 100;

    const draw = (time: number) => {
      if (!active) {
        animId = window.setTimeout(() => {
          animId = requestAnimationFrame(draw);
        }, 250) as unknown as number;
        return;
      }

      animId = requestAnimationFrame(draw);

      const elapsed = time - lastFrame;
      if (elapsed < frameInterval) return;
      lastFrame = time - (elapsed % frameInterval);

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      if (drawConnections) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = dx * dx + dy * dy;
            if (d < CONNECT_DIST * CONNECT_DIST) {
              const dist = Math.sqrt(d);
              const opacity = 0.08 * (1 - dist / CONNECT_DIST);
              ctx.beginPath();
              ctx.strokeStyle = `hsl(0 0% 100% /${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(0 0% 100% /${p.alpha})`;
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(animId as unknown as number);
      ro.disconnect();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
};

/* ─── Central glowing orb with pulsing rings ─── */
const DeepOrb = () => (
  <div className="relative flex items-center justify-center select-none" style={{ width: 320, height: 320 }}>
    {/* Outermost atmospheric haze */}
    <div
      className="absolute rounded-full"
      style={{
        width: 320, height: 320,
        background: "radial-gradient(circle, hsl(0 0% 100% /0.06) 0%, transparent 70%)",
        filter: "blur(30px)",
      }}
    />
    {/* Mid glow */}
    <div
      className="absolute rounded-full"
      style={{
        width: 220, height: 220,
        background: "radial-gradient(circle, hsl(0 0% 100% /0.14) 0%, hsl(0 0% 100% /0.06) 50%, transparent 70%)",
        filter: "blur(18px)",
      }}
    />
    {/* Rotating dashed ring */}
    <div
      className="absolute rounded-full orb-ring-dash"
      style={{
        width: 200, height: 200,
        border: "1px dashed hsl(0 0% 100% /0.2)",
      }}
    />
    {/* Solid ring */}
    <div
      className="absolute rounded-full orb-ring-solid"
      style={{
        width: 160, height: 160,
        border: "1px solid hsl(0 0% 100% /0.15)",
      }}
    />
    {/* Inner ring */}
    <div
      className="absolute rounded-full"
      style={{
        width: 110, height: 110,
        border: "1px solid hsl(0 0% 100% /0.25)",
        boxShadow: "0 0 20px hsl(0 0% 100% /0.1) inset",
      }}
    />
    {/* Core orb */}
    <div
      className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center orb-core-pulse"
      style={{
        background: "radial-gradient(circle at 38% 32%, hsl(40 75% 78%), hsl(38 62% 55%) 55%, hsl(36 45% 32%) 100%)",
        boxShadow:
          "0 0 0 1px hsl(40 72% 72% / 0.5), 0 0 30px hsl(38 80% 50% / 0.45), 0 0 70px hsl(38 62% 55% / 0.25), 0 0 120px hsl(38 62% 55% / 0.1)",
      }}
    >
      <Brain size={30} className="text-white drop-shadow-lg" />
    </div>

    {/* Orbiting dot 1 */}
    <div className="absolute orb-dot-orbit-1" style={{ width: 200, height: 200 }}>
      <div
        className="absolute w-2.5 h-2.5 rounded-full bg-primary top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: "0 0 10px hsl(0 0% 100% /0.9)" }}
      />
    </div>
    {/* Orbiting dot 2 */}
    <div className="absolute orb-dot-orbit-2" style={{ width: 160, height: 160 }}>
      <div
        className="absolute w-2 h-2 rounded-full bg-metric bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        style={{ boxShadow: "0 0 8px hsl(0 0% 100% /0.9)" }}
      />
    </div>
  </div>
);

/* ─── Feature row items ─── */
const features = [
  { icon: Workflow,   title: "Operations",          desc: "We review how work flows today — SOPs, handoffs, and tools — to spot automation and AI leverage." },
  { icon: TrendingUp, title: "Sales Pipeline",      desc: "Pipeline stages, follow-ups, and CRM usage — where AI can support revenue without adding headcount." },
  { icon: BarChart3,  title: "Marketing Funnel",    desc: "Acquisition, content, and conversion paths — advisory on AI that fits your funnel, not generic playbooks." },
  { icon: Users,      title: "Team Productivity",   desc: "How your people work — onboarding, training, and safe internal use of AI tools." },
  { icon: Headphones, title: "Customer Support",    desc: "Support volume, response times, and ticketing — where bots and AI assist without hurting experience." },
  { icon: Brain,      title: "Data & Insights",     desc: "What you measure and how decisions get made — the foundation before any AI rollout." },
];

const OrbSection = () => {
  const { ref: sectionRef, isActive: sectionActive } = useVisibilityPause<HTMLElement>();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-60px" });
  const rightRef = useRef<HTMLDivElement>(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-60px" });
  const bottomCtaRef = useRef<HTMLDivElement>(null);
  const bottomCtaInView = useInView(bottomCtaRef, { once: true, margin: "-40px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card py-16 md:py-28 lg:py-36">
      {/* Full-section particle canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <SpaceCanvas active={sectionActive} />
      </div>

      {/* Large atmospheric background glow */}
      <div
        className="pointer-events-none absolute"
        aria-hidden
        style={{
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "55%",
          height: "80%",
          background:
            "radial-gradient(ellipse 70% 70% at 60% 50%, hsl(0 0% 100% /0.18) 0%, hsl(0 0% 100% /0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        aria-hidden
        style={{
          left: "-5%",
          top: "20%",
          width: "30%",
          height: "40%",
          background: "radial-gradient(ellipse 80% 80% at 30% 50%, hsl(0 0% 100% /0.08), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.p
            className="section-eyebrow mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Where We Look for AI
          </motion.p>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance leading-[1.1] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your business,<br className="hidden sm:block" />
            <span className="text-gold-light"> mapped end to end.</span>
          </motion.h2>
        </div>

        {/* Main layout: features left | orb center | features right */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Left features */}
          <div ref={leftRef} className="flex-1 space-y-6 lg:space-y-8 lg:pr-8">
            {features.slice(0, 3).map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-start gap-4 group"
                initial={{ opacity: 0, x: -24 }}
                animate={leftInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(0 0% 100% /0.2)] transition-all duration-300">
                  <f.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors duration-300">
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center orb — hidden on mobile, shown md+ */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 px-4 lg:px-8">
            <DeepOrb />
            <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-card/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono-data text-muted-foreground">Consulting ready · holistic review</span>
            </div>
          </div>

          {/* Right features */}
          <div ref={rightRef} className="flex-1 space-y-6 lg:space-y-8 lg:pl-8">
            {features.slice(3).map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-start gap-4 group"
                initial={{ opacity: 0, x: 24 }}
                animate={rightInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(0 0% 100% /0.2)] transition-all duration-300">
                  <f.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors duration-300">
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile orb */}
        <div className="flex md:hidden flex-col items-center mt-10">
          <DeepOrb />
          <div className="mt-5 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-card/80 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono-data text-muted-foreground">Consulting ready · holistic review</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          ref={bottomCtaRef}
          className="mt-14 md:mt-20 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={bottomCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <HoverBorderGradient
            as="a"
            href="#cta"
            containerClassName="rounded-lg inline-flex"
            innerClassName="btn-cta gap-2 px-6 py-3 rounded-lg font-medium text-sm"
          >
            Book a Discovery Call
            <ArrowRight size={16} />
          </HoverBorderGradient>
        </motion.div>
      </div>
    </section>
  );
};

export default OrbSection;
