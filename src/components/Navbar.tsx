import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const items = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Our approach", href: "#approach" },
  { label: "The founders", href: "#founders" },
];

/** A compact chart-inspired navigation for the WebCom Media voyage page. */
const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [activeHref, setActiveHref] = useState("#top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = ["top", "services", "approach", "founders", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4, 0.7] });
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(navRef.current.querySelectorAll(".pill-nav-intro"),
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.72, stagger: 0.075, ease: "back.out(1.7)", delay: 0.12 },
    );
  }, []);

  const closeMenu = (href: string) => {
    setActiveHref(href);
    setMenuOpen(false);
  };

  return (
    <header ref={navRef} className={`site-nav pill-nav-shell ${scrolled ? "site-nav-scrolled" : "site-nav-on-light"}`}>
      <div className="site-nav-inner pill-nav-inner">
        <a className="wordmark pill-nav-intro" href="#top" aria-label="WebCom Media home" onClick={() => closeMenu("#top")}>
          <span className="wordmark-star" aria-hidden="true">✳</span>
          <span>WebCom Media</span>
        </a>

        <nav className="pill-nav-links pill-nav-intro" aria-label="Main navigation">
          <span className="pill-nav-active" aria-hidden="true" />
          {items.map((item) => (
            <a
              key={item.href}
              className={`pill-nav-item ${activeHref === item.href ? "is-active" : ""}`}
              href={item.href}
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={() => closeMenu(item.href)}
            >
              <span className="pill-nav-label">{item.label}</span>
              <span className="pill-nav-roll" aria-hidden="true">{item.label}</span>
            </a>
          ))}
        </nav>

        <a className="nav-contact pill-nav-intro" href="#contact" onClick={() => closeMenu("#contact")}>
          Start a project <span aria-hidden="true">↗</span>
        </a>

        <button
          className="mobile-menu-button pill-nav-intro"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav pill-nav-mobile" aria-label="Mobile navigation">
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => closeMenu(item.href)}>
              {item.label}<span aria-hidden="true">↗</span>
            </a>
          ))}
          <a href="#contact" onClick={() => closeMenu("#contact")}>Start a project <span aria-hidden="true">↗</span></a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
