import CountUp from "@/components/CountUp";

const metrics = [
  {
    from: 0,
    to: 50,
    prefix: "₹",
    suffix: "L+",
    label: "Ad Spend Managed",
    sub: "across Meta & Google",
  },
  {
    from: 0,
    to: 30,
    prefix: "",
    suffix: "+",
    label: "Brands Automated",
    sub: "AI systems deployed",
  },
  {
    from: 0,
    to: 4,
    prefix: "",
    suffix: ".1x",
    label: "Average ROAS",
    sub: "across all clients",
  },
  {
    from: 0,
    to: 10,
    prefix: "",
    suffix: "x",
    label: "Faster Execution",
    sub: "vs. traditional agencies",
  },
];

const MetricBar = () => {
  return (
    <section id="metrics" className="py-10 md:py-16 bg-card border-y border-border/60 relative overflow-hidden">
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsla(259,95%,65%,0.06), transparent 70%)",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="group text-center space-y-1 p-3 sm:p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary inline-flex flex-wrap items-baseline justify-center gap-0.5">
                {metric.prefix ? <span>{metric.prefix}</span> : null}
                <CountUp
                  from={metric.from}
                  to={metric.to}
                  separator=""
                  direction="up"
                  duration={2.5}
                  delay={0.1}
                  className="tabular-nums"
                  startWhen
                />
                {metric.suffix ? <span>{metric.suffix}</span> : null}
              </p>
              <p className="text-xs sm:text-sm font-medium text-foreground">{metric.label}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-mono-data">{metric.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricBar;
