import { Target, BarChart, Handshake } from "lucide-react";
import { ShineBorder } from "@/registry/magicui/shine-border";

const values = [
  { icon: Target, title: "No Fluff", desc: "Execution over excuses" },
  { icon: BarChart, title: "Data First", desc: "Every decision is backed by numbers" },
  { icon: Handshake, title: "Client Growth = Our Growth", desc: "We win when you win" },
];

const Values = () => {
  return (
    <section id="values" className="py-10 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mb-12">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Our Values
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-balance">
            The principles that guide every decision we make
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="relative overflow-hidden bg-card rounded-2xl p-6 md:p-8 text-center"
            >
              <ShineBorder
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={1}
                duration={14}
                className="z-0"
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
