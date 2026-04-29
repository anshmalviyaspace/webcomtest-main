import CountUp from "@/components/CountUp";

const metrics = [
  {
    from: 0,
    to: 50,
    prefix: "₹",
    suffix: "L+",
    label: "Ad Spend Managed",
  },
  {
    from: 0,
    to: 30,
    prefix: "",
    suffix: "+",
    label: "Brands Scaled",
  },
  {
    from: 0,
    to: 3,
    prefix: "",
    suffix: "X",
    label: "Average ROAS",
  },
];

const MetricBar = () => {
  return (
    <section className="py-8 md:py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="text-xl sm:text-3xl md:text-4xl font-bold text-primary inline-flex flex-wrap items-baseline justify-center gap-0.5">
                {metric.prefix ? <span>{metric.prefix}</span> : null}
                <CountUp
                  from={metric.from}
                  to={metric.to}
                  separator=""
                  direction="up"
                  duration={2.75}
                  delay={0.08}
                  className="tabular-nums"
                  startWhen
                />
                {metric.suffix ? <span>{metric.suffix}</span> : null}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricBar;
