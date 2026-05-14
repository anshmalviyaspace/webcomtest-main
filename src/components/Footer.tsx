import logoWhite from "@/assets/logo-white.png";
import { ArrowRight } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#philosophy" },
  { label: "Tools", href: "#tools" },
  { label: "Results", href: "#clients" },
  { label: "About", href: "#values" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30 relative overflow-hidden">
      {/* Top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        aria-hidden
        style={{ background: "linear-gradient(90deg, transparent, hsla(259,95%,65%,0.4), transparent)" }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-foreground mb-3">
              <img src={logoWhite} alt="WebCom Media" className="h-7 w-auto" />
              <span>WebCom Media</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI automation marketing agency. We embed intelligence into your growth systems so you scale without scaling headcount.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-mono-data tracking-widest text-muted-foreground uppercase mb-4">Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="text-xs font-mono-data tracking-widest text-muted-foreground uppercase mb-4">Get Started</p>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Ready to automate your marketing? Book a free 15-minute AI audit.
            </p>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Book a Free AI Audit <ArrowRight size={14} />
            </a>
            <div className="mt-4">
              <a
                href="mailto:webcommedia1@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                webcommedia1@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WebCom Media. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono-data">
            AI Automation · Paid Media · Content · Social
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
