import MagicBento from "@/components/MagicBento";
import type { BentoCardProps } from "@/components/MagicBento";

const tools = [
  {
    title: "Ads Campaign Strategy Generator",
    description: "Generate a full campaign strategy in 60 seconds using AI",
    status: "live" as const,
    url: "https://adscampaign.lovable.app/",
  },
  {
    title: "ROAS Calculator AI",
    description: "Get instant insights on ad spend and maximizing ROAS recommendations",
    status: "live" as const,
    url: "https://roascal.lovable.app/",
  },
  {
    title: "Ads Doctor AI",
    description: "Upload Your Ads dashboard Screenshot. Get Exact Actions in Seconds.",
    status: "live" as const,
    url: "https://adsanalyser.lovable.app/",
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
  return (
    <section id="tools" className="py-10 md:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mb-12">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Free Tools
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-balance">
            Agency-Built Tools. Free to Use.
          </h2>
          <p className="text-muted-foreground">
            We build internal tools and share them with the world.
          </p>
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
