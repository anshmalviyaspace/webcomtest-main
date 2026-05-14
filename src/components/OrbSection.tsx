import { useEffect, useRef } from "react";
import { Brain, Zap, BarChart3, Bot, Workflow, TrendingUp, ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/* ─── Deep-space particle + connection canvas ─── */
const SpaceCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 8000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.45 + 0.08,
      });
    }

    const CONNECT_DIST = 110;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const opacity = 0.1 * (1 - d / CONNECT_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `hsla(259,95%,65%,${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(259,95%,65%,${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

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
        background: "radial-gradient(circle, hsla(259,95%,65%,0.06) 0%, transparent 70%)",
        filter: "blur(30px)",
      }}
    />
    {/* Mid glow */}
    <div
      className="absolute rounded-full"
      style={{
        width: 220, height: 220,
        background: "radial-gradient(circle, hsla(259,95%,65%,0.14) 0%, hsla(311,95%,76%,0.06) 50%, transparent 70%)",
        filter: "blur(18px)",
      }}
    />
    {/* Rotating dashed ring */}
    <div
      className="absolute rounded-full orb-ring-dash"
      style={{
        width: 200, height: 200,
        border: "1px dashed hsla(259,95%,65%,0.2)",
      }}
    />
    {/* Solid ring */}
    <div
      className="absolute rounded-full orb-ring-solid"
      style={{
        width: 160, height: 160,
        border: "1px solid hsla(259,95%,65%,0.15)",
      }}
    />
    {/* Inner ring */}
    <div
      className="absolute rounded-full"
      style={{
        width: 110, height: 110,
        border: "1px solid hsla(259,95%,65%,0.25)",
        boxShadow: "0 0 20px hsla(259,95%,65%,0.1) inset",
      }}
    />
    {/* Core orb */}
    <div
      className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center orb-core-pulse"
      style={{
        background: "radial-gradient(circle at 38% 32%, hsla(259,95%,80%,1), hsla(259,95%,50%,0.9) 60%, hsla(311,95%,60%,0.7))",
        boxShadow:
          "0 0 0 1px hsla(259,95%,65%,0.4), 0 0 30px hsla(259,95%,65%,0.7), 0 0 70px hsla(259,95%,65%,0.35), 0 0 120px hsla(259,95%,65%,0.15)",
      }}
    >
      <Brain size={30} className="text-white drop-shadow-lg" />
    </div>

    {/* Orbiting dot 1 */}
    <div className="absolute orb-dot-orbit-1" style={{ width: 200, height: 200 }}>
      <div
        className="absolute w-2.5 h-2.5 rounded-full bg-primary top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: "0 0 10px hsla(259,95%,65%,0.9)" }}
      />
    </div>
    {/* Orbiting dot 2 */}
    <div className="absolute orb-dot-orbit-2" style={{ width: 160, height: 160 }}>
      <div
        className="absolute w-2 h-2 rounded-full bg-metric bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        style={{ boxShadow: "0 0 8px hsla(311,95%,76%,0.9)" }}
      />
    </div>
  </div>
);

/* ─── Feature row items ─── */
const features = [
  { icon: Brain,      title: "AI Engine",           desc: "Central intelligence processing all your marketing signals in real time." },
  { icon: Zap,        title: "Instant Execution",   desc: "Automations fire in under 2 seconds — no human bottleneck." },
  { icon: BarChart3,  title: "Live ROAS Tracking",  desc: "Every rupee tracked, attributed, and optimised continuously." },
  { icon: Bot,        title: "24/7 AI Agents",      desc: "Lead qualification, follow-up, and booking — while you sleep." },
  { icon: Workflow,   title: "CRM Sync",            desc: "Every lead, every touchpoint, automatically logged and routed." },
  { icon: TrendingUp, title: "Compounding Growth",  desc: "Systems that learn and improve — your ROAS grows month over month." },
];

const OrbSection = () => {
  return (
    <section className="relative overflow-hidden bg-card py-16 md:py-28 lg:py-36">
      {/* Full-section particle canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <SpaceCanvas />
      </div>

      {/* Large atmospheric background glow — the signature look */}
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
            "radial-gradient(ellipse 70% 70% at 60% 50%, hsla(259,95%,65%,0.18) 0%, hsla(311,95%,76%,0.08) 40%, transparent 70%)",
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
          background: "radial-gradient(ellipse 80% 80% at 30% 50%, hsla(259,95%,65%,0.08), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-mono-data tracking-widest text-primary uppercase mb-4">
            The Intelligence Layer
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance leading-[1.1] max-w-3xl mx-auto">
            One AI brain running<br className="hidden sm:block" />
            <span className="text-primary"> every channel at once.</span>
          </h2>
        </div>

        {/* Main layout: features left | orb center | features right */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Left features */}
          <div className="flex-1 space-y-6 lg:space-y-8 lg:pr-8">
            {features.slice(0, 3).map((f) => (
              <div key={f.title} className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsla(259,95%,65%,0.2)] transition-all duration-300">
                  <f.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors duration-300">
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center orb — hidden on mobile, shown md+ */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 px-4 lg:px-8">
            <DeepOrb />
            {/* Live status pill below orb */}
            <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-card/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono-data text-muted-foreground">System online · 3 automations active</span>
            </div>
          </div>

          {/* Right features */}
          <div className="flex-1 space-y-6 lg:space-y-8 lg:pl-8">
            {features.slice(3).map((f) => (
              <div key={f.title} className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsla(259,95%,65%,0.2)] transition-all duration-300">
                  <f.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors duration-300">
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile orb — shown only on small screens */}
        <div className="flex md:hidden flex-col items-center mt-10">
          <DeepOrb />
          <div className="mt-5 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-card/80 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono-data text-muted-foreground">System online · 3 automations active</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 md:mt-20 text-center">
          <HoverBorderGradient
            as="a"
            href="#cta"
            containerClassName="rounded-lg inline-flex"
            innerClassName="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_30px_hsla(259,95%,65%,0.5)] active:scale-[0.98]"
          >
            Get Your AI System Built
            <ArrowRight size={16} />
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  );
};

export default OrbSection;
