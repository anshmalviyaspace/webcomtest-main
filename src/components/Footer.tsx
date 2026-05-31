import logoWhite from "@/assets/logo-white.png";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { consultingCopy, mailtoHref } from "@/content/consultingCopy";
import { openEmailClient, scrollToHash } from "@/lib/navActions";

const footerLinks = [
  { label: "Consulting Areas", href: "#services" },
  { label: "How We Consult", href: "#philosophy" },
  { label: "Free Assessments", href: "#tools" },
  { label: "Client Stories", href: "#clients" },
  { label: "Principles", href: "#values" },
  { label: "Book a Call", href: "#cta" },
];

const Footer = () => {
  return (
    <footer
      id="footer-contact"
      className="border-t border-gold/20 bg-card/40 relative overflow-hidden scroll-mt-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(38 62% 55% / 0.1), transparent 60%), radial-gradient(ellipse 40% 30% at 90% 80%, hsl(38 80% 50% / 0.06), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        aria-hidden
        style={{ background: "linear-gradient(90deg, transparent, hsl(38 62% 55% / 0.65), transparent)" }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-foreground mb-3">
              <img src={logoWhite} alt="WebCom Media" className="h-8 w-auto" />
              <span>WebCom Media</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              AI consulting for growing businesses. Discovery calls, system audits, and roadmaps — with selective build
              support when scope fits.
            </p>
            <a
              href={consultingCopy.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold-light hover:text-gold transition-colors"
            >
              <Linkedin size={16} className="shrink-0" />
              linkedin.com/company/webcommedia
            </a>
          </div>

          <div>
            <p className="section-eyebrow mb-4">Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToHash(l.href);
                      }
                    }}
                    className="text-sm text-muted-foreground hover:text-gold-light transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-background/50 p-5 sm:p-6">
            <p className="section-eyebrow mb-3">Get Started</p>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Ready to map AI across your business? Book a free discovery call or email us directly.
            </p>
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#cta");
              }}
              className="btn-cta gap-2 px-5 py-2.5 rounded-lg text-sm w-full sm:w-auto mb-4"
            >
              {consultingCopy.ctaPrimary}
              <ArrowRight size={14} />
            </a>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={mailtoHref()}
                onClick={(e) => {
                  e.preventDefault();
                  openEmailClient();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gold/30 text-gold-light text-sm font-medium hover:bg-gold-subtle hover:border-gold/50 transition-colors"
              >
                <Mail size={15} />
                Email us
              </a>
              <a
                href={consultingCopy.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-gold-light hover:border-gold/30 transition-colors"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </div>
            <p className="mt-4 text-sm">
              <a
                href={mailtoHref()}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = mailtoHref();
                }}
                className="text-gold-light hover:underline font-mono-data break-all"
              >
                {consultingCopy.contactEmail}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WebCom Media. All rights reserved.
          </p>
          <p className="text-xs text-gold-muted font-mono-data">
            AI Consulting · Strategy · Audits · Advisory
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
