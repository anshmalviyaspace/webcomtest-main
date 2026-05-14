import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const toolMap: Record<string, { title: string; url: string }> = {
  "ads-campaign": {
    title: "Ads Campaign Strategy Generator",
    url: "https://adscampaign.lovable.app/",
  },
  "roas-calculator": {
    title: "ROAS Calculator AI",
    url: "https://roascal.lovable.app/",
  },
  "ads-doctor": {
    title: "Ads Doctor AI",
    url: "https://adsanalyser.lovable.app/",
  },
};

const ToolEmbed = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? toolMap[slug] : undefined;

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-foreground">
        <p className="text-lg">Tool not found.</p>
        <Link
          to="/#tools"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Back to Tools
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Minimal top bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-background shrink-0">
        <Link to="/#tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
        <span className="text-sm font-medium text-foreground truncate max-w-[60%] text-center">
          {tool.title}
        </span>
        <Link to="/" className="shrink-0">
          <img src={logoWhite} alt="Webcom Media" className="h-6 w-auto" />
        </Link>
      </header>

      {/* Full-height iframe */}
      <iframe
        src={tool.url}
        title={tool.title}
        className="flex-1 w-full border-0"
        allow="clipboard-write; clipboard-read"
        loading="lazy"
      />
    </div>
  );
};

export default ToolEmbed;
