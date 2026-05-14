import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

/* ── Nav data ── */
const NAV_ITEMS = [
  {
    label: "Services",
    bgColor: "#0e0a1a",
    links: [
      { label: "AI Workflow Automation", href: "#services" },
      { label: "AI Chatbots & Agents",   href: "#services" },
      { label: "CRM Integration",        href: "#services" },
      { label: "Meta & LinkedIn Ads",    href: "#services" },
      { label: "AI Content at Scale",    href: "#services" },
      { label: "Website Creation",       href: "#services" },
    ],
  },
  {
    label: "Company",
    bgColor: "#110d20",
    links: [
      { label: "How We Work", href: "#philosophy" },
      { label: "Our Values",  href: "#values"     },
      { label: "Founder",     href: "#founder"    },
      { label: "Free Tools",  href: "#tools"      },
    ],
  },
  {
    label: "Results",
    bgColor: "#0e0a1a",
    links: [
      { label: "Client Results", href: "#clients"  },
      { label: "Metrics",        href: "#metrics"  },
      { label: "Case Studies",   href: "#clients"  },
    ],
  },
  {
    label: "Contact",
    bgColor: "#110d20",
    links: [
      { label: "Book an AI Audit",  href: "#cta",                                          ariaLabel: "Book a free AI audit call" },
      { label: "Email Us",          href: "mailto:webcommedia1@gmail.com",                  ariaLabel: "Email WebCom Media" },
      { label: "LinkedIn",          href: "https://www.linkedin.com/in/ansh-malviya-0614523bb/", ariaLabel: "LinkedIn", external: true },
    ],
  },
];

const CardNav = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navRef   = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef    = useRef<gsap.core.Timeline | null>(null);

  /* scroll detection */
  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* build timeline */
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(nav, { height: "auto", duration: 0.45, ease: "power3.out" });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.07 },
      "-=0.2",
    );
    tlRef.current = tl;

    return () => { tl.kill(); };
  }, []);

  /* resize: rebuild if open */
  useLayoutEffect(() => {
    const handleResize = () => {
      const nav = navRef.current;
      if (!nav || !tlRef.current) return;
      tlRef.current.kill();
      gsap.set(nav, { height: isOpen ? "auto" : 60, overflow: "hidden" });
      gsap.set(cardsRef.current, { y: 0, opacity: isOpen ? 1 : 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(nav, { height: "auto", duration: 0.45, ease: "power3.out" });
      tl.to(
        cardsRef.current,
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.07 },
        "-=0.2",
      );
      if (isOpen) tl.progress(1);
      tlRef.current = tl;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isOpen) {
      setIsOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback("onReverseComplete", () => setIsOpen(false));
      tl.reverse();
    }
  };

  const close = () => {
    if (!isOpen) return;
    const tl = tlRef.current;
    if (!tl) return;
    tl.eventCallback("onReverseComplete", () => setIsOpen(false));
    tl.reverse();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <nav
        ref={navRef}
        className={`w-full max-w-5xl rounded-2xl border overflow-hidden transition-colors duration-300 ${
          scrolled || isOpen
            ? "bg-[#0a0612]/95 backdrop-blur-xl border-primary/20 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_hsla(259,95%,65%,0.1)]"
            : "bg-[#0a0612]/70 backdrop-blur-md border-white/8"
        }`}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between h-[60px] px-4 sm:px-5">
          {/* Hamburger */}
          <button
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex flex-col justify-center gap-[5px] w-8 h-8 group"
          >
            <span
              className={`block h-px bg-foreground/80 transition-all duration-300 origin-center ${
                isOpen ? "w-5 rotate-45 translate-y-[3px]" : "w-5"
              }`}
            />
            <span
              className={`block h-px bg-foreground/80 transition-all duration-300 origin-center ${
                isOpen ? "w-5 -rotate-45 -translate-y-[3px]" : "w-4"
              }`}
            />
          </button>

          {/* Logo — centered */}
          <a
            href="#"
            onClick={close}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-display font-bold text-foreground"
          >
            <img src={logoWhite} alt="WebCom Media" className="h-6 sm:h-7 w-auto" />
            <span className="text-sm sm:text-base hidden xs:inline">WebCom Media</span>
          </a>

          {/* CTA */}
          <a
            href="#cta"
            onClick={close}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_20px_hsla(259,95%,65%,0.5)] active:scale-[0.98] whitespace-nowrap"
          >
            Book AI Audit
          </a>
        </div>

        {/* ── Expanded cards ── */}
        <div
          className="card-nav-content px-3 sm:px-4 pb-4 pt-1"
          aria-hidden={!isOpen}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {NAV_ITEMS.map((item, idx) => (
              <div
                key={item.label}
                ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                className="rounded-xl p-4 sm:p-5 border border-white/6 flex flex-col gap-3"
                style={{ backgroundColor: item.bgColor }}
              >
                {/* Card label */}
                <p className="text-[10px] font-mono-data tracking-widest text-primary uppercase">
                  {item.label}
                </p>

                {/* Links */}
                <div className="flex flex-col gap-1.5">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.ariaLabel ?? link.label}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={close}
                      className="group flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      <ArrowUpRight
                        size={12}
                        className="shrink-0 text-primary/50 group-hover:text-primary transition-colors duration-150"
                      />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div className="mt-3 flex items-center justify-between px-1">
            <p className="text-[10px] font-mono-data text-muted-foreground/50">
              webcommedia.in
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono-data text-muted-foreground/50">
                Taking new clients
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CardNav;
