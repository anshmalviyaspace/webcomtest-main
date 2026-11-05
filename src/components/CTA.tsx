import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import { consultingCopy, mailtoHref } from "@/content/consultingCopy";
import { Link003 } from "@/components/SkiperLinks";

const CTA = () => (
  <section className="contact-section section-wrap" id="contact">
    <motion.div
      className="contact-card"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="contact-copy">
        <p className="eyebrow">Have something in mind?</p>
        <h2>Let’s make<br /><em>it happen.</em></h2>
        <p>Tell us a little about your business and what you want to improve. We’ll take it from there.</p>
      </div>
      <div className="contact-actions">
        <a className="button button-paper" href={mailtoHref("New Webcommedia project") }>
          Start a conversation <ArrowUpRight size={17} />
        </a>
        <Link003 href={`mailto:${consultingCopy.contactEmail}`} className="contact-email" showArrow>
          <Mail size={14} /> {consultingCopy.contactEmail}
        </Link003>
      </div>
      <span className="contact-side-note">IDEAS ARE BETTER IN MOTION</span>
    </motion.div>
  </section>
);

export default CTA;
