import MagicBento from "@/components/MagicBento";
import type { BentoCardProps } from "@/components/MagicBento";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const tools = [
  {
    title: "Ads Campaign Strategy Generator",
    description: "Generate a full campaign strategy in 60 seconds using AI",
    status: "live" as const,
    url: "/tools/ads-campaign",
  },
  {
    title: "ROAS Calculator AI",
    description: "Get instant insights on ad spend and maximizing ROAS recommendations",
    status: "live" as const,
    url: "/tools/roas-calculator",
  },
  {
    title: "Ads Doctor AI",
    description: "Upload Your Ads dashboard Screenshot. Get Exact Actions in Seconds.",
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
            Free Tools
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Agency-Built AI Tools. Free to Use.
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We build internal AI tools and share them with the world. A taste of what we deploy for clients.
          </motion.p>
        </div>

        <MagicBento
          items={toolBentoItems}
          layout="even"
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
        />
      </div>
    </section>
  );
};

export default Tools;
