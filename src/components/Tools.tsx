import MagicBento from "@/components/MagicBento";
import type { BentoCardProps } from "@/components/MagicBento";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";

const tools = [
  {
    title: "Campaign Strategy Assessment",
    description: "Self-serve preview: stress-test your campaign thinking before a strategy call",
    status: "live" as const,
    url: "/tools/ads-campaign",
  },
  {
    title: "Spend & Efficiency Check",
    description: "Quick diagnostic on ad spend patterns — a taste of how we analyze funnels",
    status: "live" as const,
    url: "/tools/roas-calculator",
  },
  {
    title: "Ads Health Snapshot",
    description: "Upload a dashboard screenshot for instant improvement angles — free to try",
    status: "live" as const,
    url: "/tools/ads-doctor",
  },
];

const toolBentoItems: BentoCardProps[] = tools.map((tool) => ({
  color: "#060010",
  title: tool.title,
  description: tool.description,
  label: tool.status === "live" ? "Live" : "Coming Soon",
  href: tool.url,
}));

const Tools = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { enableHeavyEffects } = usePerformanceProfile();

  return (
    <section id="tools" className="py-10 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="max-w-lg mb-12">
          <motion.p
            className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Free Assessments
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Try Before You Book
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Self-serve tools that show how we think about AI in your stack — a preview of the clarity you get on a discovery call.
          </motion.p>
        </div>

        <MagicBento
          items={toolBentoItems}
          layout="even"
          textAutoHide={true}
          enableStars={enableHeavyEffects}
          enableSpotlight={enableHeavyEffects}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={enableHeavyEffects}
          spotlightRadius={280}
          particleCount={6}
        />
      </div>
    </section>
  );
};

export default Tools;
