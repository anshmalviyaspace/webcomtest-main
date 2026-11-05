import MagicBento, { type BentoCardProps } from "@/components/MagicBento";

const serviceItems: BentoCardProps[] = [
  {
    label: "01 / DIGITAL FOUNDATION",
    title: "Website design & development",
    description: "A clear, mobile-first home for your business, projects, and enquiries. Designed to make the right first impression and easy to keep up to date.",
    color: "#151618",
  },
  {
    label: "02 / SOCIAL PRESENCE",
    title: "Instagram setup & management",
    description: "A polished profile, consistent visual direction, and useful property or company content that gives people a reason to follow along.",
    color: "#19191c",
  },
  {
    label: "03 / PAID REACH",
    title: "Reels & Meta advertising",
    description: "Turn approved property footage into strong reels, promote selected content to relevant audiences, and learn from campaign performance.",
    color: "#17191b",
  },
  {
    label: "04 / SMARTER WORKFLOWS",
    title: "AI automation",
    description: "Find repeatable tasks and connect the tools you already use, with sensible checks that keep people in control.",
    color: "#14181a",
  },
  {
    label: "05 / CLEARER DECISIONS",
    title: "AI consultation",
    description: "Practical guidance on use cases, tools, adoption, and the right next step for your team before you commit time or budget.",
    color: "#1a1818",
  },
];

const Services = () => (
  <section className="services-section section-wrap" id="services">
    <div className="section-heading-row" data-gsap-reveal>
      <div>
        <p className="eyebrow">What we do</p>
        <h2 className="section-heading">Make the first impression<br /><em>count.</em></h2>
      </div>
      <p className="section-heading-note">
        Creative services for a stronger presence. Practical AI for a smoother day behind it.
      </p>
    </div>

    <MagicBento
      items={serviceItems}
      layout="even"
      textAutoHide={false}
      enableStars
      enableSpotlight
      enableBorderGlow
      spotlightRadius={260}
      particleCount={7}
      enableTilt
      clickEffect
      enableMagnetism={false}
      glowColor="183, 219, 82"
    />

    <div className="services-note" data-gsap-reveal>
      <span className="services-note-mark">✳</span>
      <p>Campaign activity is measured and refined. Reach, leads, and sales depend on the market, offer, creative, and budget.</p>
    </div>
  </section>
);

export default Services;
