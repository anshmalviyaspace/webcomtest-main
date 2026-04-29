import { BarChart3, PenTool, Bot, Globe, Search, Share2 } from "lucide-react";
import { HoverEffect } from "@/components/HoverEffect";

const services = [
  {
    icon: BarChart3,
    title: "Paid Advertising",
    description: "Meta Ads, Google Ads & Shopping campaigns built for maximum ROAS",
    link: "#cta",
  },
  {
    icon: PenTool,
    title: "Content Marketing",
    description: "Strategic content creation and distribution to drive engagement and authority",
    link: "#cta",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Proprietary AI tools that give your brand an unfair edge",
    link: "#cta",
  },
  {
    icon: Globe,
    title: "Website Creation",
    description: "High-converting landing pages and storefronts",
    link: "#cta",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Long-term organic growth through data-driven SEO",
    link: "#cta",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Content strategy and management across all platforms",
    link: "#cta",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-10 md:py-28 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mb-8 md:mb-10">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-balance">
            End-to-end digital growth systems for serious brands.
          </h2>
        </div>

        <HoverEffect items={services} />
      </div>
    </section>
  );
};

export default Services;
