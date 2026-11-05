import { ArrowDown, ArrowUpRight, Compass } from "lucide-react";
import { motion } from "motion/react";
import { consultingCopy } from "@/content/consultingCopy";

const SHIP = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_024714_39df675e-5060-4528-87dc-9d0c274815aa.png&w=1600&q=90";

const Hero = () => (
  <section className="hero-shell voyage-hero" id="top">
    <div className="voyage-hero-frame" aria-hidden="true" />
    <div className="voyage-hero-inner">
      <motion.div
        className="voyage-hero-copy"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <p className="voyage-eyebrow"><Compass size={16} /> WEB COMMEDIA <span>·</span> CREATIVE &amp; AI STUDIO</p>
        <h1 className="voyage-title">A sharper digital presence.<br /><em>More room to grow.</em></h1>
        <p className="voyage-description">{consultingCopy.subhead}</p>
        <div className="hero-actions voyage-actions">
          <a href="#contact" className="button voyage-button">Start a project <ArrowUpRight size={17} /></a>
          <a href="#services" className="voyage-text-link">Explore our services <ArrowDown size={15} /></a>
        </div>
        <div className="voyage-caption"><span>01 — 05</span><span>GOOD WORK, OUT IN THE WORLD</span></div>
      </motion.div>

      <div className="voyage-hero-art" role="img" aria-label="A storybook galleon sailing across hand-drawn waves">
        <div className="voyage-sun" />
        <svg className="voyage-chart-lines" viewBox="0 0 700 650" fill="none" aria-hidden="true">
          <path d="M65 390C190 280 270 300 357 347C454 400 538 368 637 245" />
          <path d="M38 439C167 328 258 346 344 392C441 445 544 419 672 284" />
          <path d="M100 488C205 404 270 408 350 449C442 497 548 475 632 390" />
          <circle cx="357" cy="347" r="5" /><circle cx="637" cy="245" r="5" />
        </svg>
        <motion.img
          className="voyage-ship"
          src={SHIP}
          alt="Illustrated WebCom Media galleon"
          initial={{ opacity: 0, x: 28, y: 14, rotate: 2 }}
          animate={{ opacity: 1, x: 0, y: [0, -7, 0], rotate: [0, -0.8, 0] }}
          transition={{ opacity: { duration: 0.9, delay: 0.12 }, x: { duration: 0.9 }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 6.4, repeat: Infinity, ease: "easeInOut" } }}
        />
        <svg className="voyage-water voyage-water-back" viewBox="0 0 800 180" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M-20 58C70 26 121 87 207 58S342 32 429 61 566 88 652 56 755 32 830 58" />
          <path d="M-20 94C76 62 126 123 218 94S354 69 441 97 577 123 664 92 759 68 830 94" />
        </svg>
        <svg className="voyage-water voyage-water-front" viewBox="0 0 800 180" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M-20 76C52 47 127 105 210 76S348 48 429 77 571 106 651 75 758 46 830 75" />
          <path d="M-20 122C54 94 126 150 208 122S345 94 428 123 567 150 649 121 756 94 830 121" />
          <path d="M-20 158C58 137 118 177 203 158S340 135 425 157 564 179 648 158 758 137 830 158" />
        </svg>
        <span className="voyage-art-stamp">WEB<br />COMM<br />EDIA</span>
      </div>
    </div>
  </section>
);

export default Hero;
