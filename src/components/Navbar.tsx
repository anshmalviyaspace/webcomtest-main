import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#philosophy" },
  { label: "Tools", href: "#tools" },
  { label: "Results", href: "#clients" },
  { label: "About", href: "#values" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/30" : "bg-transparent"
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-20">
        <a href="#" className="flex items-center gap-2 font-display text-lg md:text-xl font-bold">
          <img
            src={logoWhite}
            alt="WebCom Media"
            className="h-8 md:h-11 w-auto transition-opacity duration-300"
          />
          <span className="text-foreground">WebCom Media</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <HoverBorderGradient
            as="a"
            href="#cta"
            containerClassName="rounded-lg"
            innerClassName="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_20px_hsla(259,95%,65%,0.4)] active:scale-[0.98]"
          >
            Book an AI Audit
          </HoverBorderGradient>
        </div>

        <HoverBorderGradient
          as="button"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          containerClassName="rounded-lg md:hidden w-fit"
          innerClassName="p-2 text-foreground bg-background/80 hover:bg-background"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </HoverBorderGradient>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/40">
          <nav className="container flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            ))}
            <HoverBorderGradient
              as="a"
              href="#cta"
              onClick={() => setMobileOpen(false)}
              containerClassName="rounded-lg mt-2"
              innerClassName="inline-flex w-full items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98]"
            >
              Book an AI Audit
            </HoverBorderGradient>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
