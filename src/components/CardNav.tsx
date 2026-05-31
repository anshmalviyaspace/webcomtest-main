import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Mail } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { consultingCopy } from "@/content/consultingCopy";
import {
  linkedInCompanyUrl,
  goToFooterContact,
  openEmailClient,
  scrollToHash,
} from "@/lib/navActions";

type NavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
  action?: "email" | "footer-contact" | "hash" | "external";
};

const NAV_ITEMS: { label: string; bgColor: string; links: NavLink[] }[] = [
  {
    label: "Services",
    bgColor: "#0a0a0a",
    links: [
      { label: "Operations & Workflows", href: "#services", action: "hash" },
      { label: "Sales & CRM", href: "#services", action: "hash" },
      { label: "Marketing Funnels", href: "#services", action: "hash" },
      { label: "Team & HR", href: "#services", action: "hash" },
      { label: "Data & Reporting", href: "#services", action: "hash" },
      { label: "Engagement Options", href: "#services", action: "hash" },
    ],
  },
  {
    label: "Company",
    bgColor: "#111111",
    links: [
      { label: "How We Consult", href: "#philosophy", action: "hash" },
      { label: "Principles", href: "#values", action: "hash" },
      { label: "Founder", href: "#founder", action: "hash" },
      { label: "Free Assessments", href: "#tools", action: "hash" },
    ],
  },
  {
    label: "Results",
    bgColor: "#0a0a0a",
    links: [
      { label: "Client Stories", href: "#clients", action: "hash" },
      { label: "Track Record", href: "#metrics", action: "hash" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#111111",
    links: [
      {
        label: "Book Discovery Call",
        href: "#cta",
        ariaLabel: "Book a free AI discovery call",
        action: "hash",
      },
      {
        label: "Email Us",
        href: "#footer-contact",
        ariaLabel: "Go to email and contact in footer",
        action: "footer-contact",
      },
      {
        label: "LinkedIn",
        href: linkedInCompanyUrl,
        ariaLabel: "WebCom Media on LinkedIn",
        external: true,
        action: "external",
      },
    ],
  },
];

const CardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const close = () => {
    if (!isOpen) return;
    const tl = tlRef.current;
    if (!tl) return;
    tl.eventCallback("onReverseComplete", () => setIsOpen(false));
    tl.reverse();
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (link.action === "email") {
      e.preventDefault();
      openEmailClient(close);
      return;
    }
    if (link.action === "footer-contact") {
      e.preventDefault();
      goToFooterContact(close);
      return;
    }
    if (link.action === "hash" && link.href.startsWith("#")) {
      e.preventDefault();
      scrollToHash(link.href, close);
      return;
    }
    if (link.external) {
      close();
    }
  };

  useLayoutEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { height: 72, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(nav, { height: "auto", duration: 0.45, ease: "power3.out" });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.07 },
      "-=0.2",
    );
    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useLayoutEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nav = navRef.current;
        if (!nav || !tlRef.current) return;
        tlRef.current.kill();
        gsap.set(nav, { height: isOpen ? "auto" : 72, overflow: "hidden" });
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
      }, 200);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <nav
        ref={navRef}
        className={`w-full max-w-5xl rounded-2xl border overflow-hidden transition-colors duration-300 ${
          scrolled || isOpen
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-gold/20 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "bg-[#0a0a0a]/80 backdrop-blur-md border-white/8"
        }`}
      >
        <div className="flex items-center justify-between h-[72px] px-4 sm:px-6 gap-2">
          <button
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex flex-col justify-center gap-[5px] w-8 h-8 group shrink-0"
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

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              close();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 sm:gap-3 font-display font-bold text-foreground"
            aria-label="WebCom Media — back to top"
          >
            <img
              src={logoWhite}
              alt="WebCom Media"
              className="h-9 w-auto sm:h-10 md:h-11 max-h-11 object-contain"
              width={160}
              height={44}
            />
            <span className="text-base sm:text-lg hidden xs:inline tracking-tight">WebCom Media</span>
          </a>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openEmailClient(close)}
              className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gold/25 text-gold-light hover:bg-gold-subtle hover:border-gold/45 transition-colors"
              aria-label="Open email to contact WebCom Media"
            >
              <Mail size={16} />
            </button>
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#cta", close);
              }}
              className="btn-cta gap-1.5 px-3.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-[0_0_0_1px_hsl(var(--gold-light)_/_0.25)]"
            >
              Discovery Call
            </a>
          </div>
        </div>

        <div className="card-nav-content px-3 sm:px-4 pb-4 pt-1" aria-hidden={!isOpen}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {NAV_ITEMS.map((item, idx) => (
              <div
                key={item.label}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
                className="rounded-xl p-4 sm:p-5 border border-white/6 flex flex-col gap-3"
                style={{ backgroundColor: item.bgColor }}
              >
                <p className="text-[10px] font-mono-data tracking-[0.18em] text-gold-muted uppercase">
                  {item.label}
                </p>

                <div className="flex flex-col gap-1.5">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.ariaLabel ?? link.label}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="group flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-gold-light transition-colors duration-150"
                    >
                      <ArrowUpRight
                        size={12}
                        className="shrink-0 text-gold/40 group-hover:text-gold-light transition-colors duration-150"
                      />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between px-1">
            <p className="text-[10px] font-mono-data text-muted-foreground/50">webcommedia.in</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-mono-data text-gold-muted">Booking discovery calls</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CardNav;
