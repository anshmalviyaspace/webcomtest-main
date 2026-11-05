import { ArrowUpRight, MoveUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Services from "@/components/Services";
import Founder from "@/components/founder";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CrowdCanvas from "@/components/CrowdCanvas";
import ScrollExperience from "@/components/ScrollExperience";

const steps = [
  { number: "01", title: "Get to know the business", body: "We start with your goals, your audience, and what you already have in place." },
  { number: "02", title: "Shape the right story", body: "Together we plan the website, content, or automation that fits your next move." },
  { number: "03", title: "Put it into motion", body: "We build, publish, and review the work so the next improvement is grounded in what we learn." },
];

const HomeBelowFold = () => (
  <>
    <ScrollExperience />
    <Services />

    <div className="ticker-band" role="img" aria-label="Website design, social content, paid promotion, AI automation, AI consultation">
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <span className="ticker-set" key={copy}>
            WEBSITE <i>✳</i> SOCIAL <i>✳</i> REELS <i>✳</i> AUTOMATION <i>✳</i> AI CONSULTATION <i>✳</i>
          </span>
        ))}
      </div>
    </div>

    <section className="approach-section section-wrap" id="approach">
      <div className="approach-topline" data-gsap-reveal><span><Sparkles size={15} /> A clear process, built around you</span><MoveUpRight size={20} /></div>
      <div className="section-heading-row approach-heading-row" data-gsap-reveal>
        <h2 className="section-heading">From first idea<br /><em>to in the world.</em></h2>
        <p className="section-heading-note">Good work comes from listening closely, making the important choices clear, and staying curious as it takes shape.</p>
      </div>
      <div className="approach-steps">
        {steps.map((step, index) => (
          <motion.article
            className="approach-step"
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
          >
            <span className="step-number">{step.number}</span>
            <div className="step-copy"><h3>{step.title}</h3><p>{step.body}</p></div>
            <ArrowUpRight className="step-arrow" size={19} />
          </motion.article>
        ))}
      </div>
    </section>

    <section className="crowd-moment" aria-labelledby="crowd-moment-title">
      <div className="crowd-moment-copy" data-gsap-reveal>
        <span className="crowd-moment-eyebrow">Ideas move when people do</span>
        <h2 id="crowd-moment-title">Good work is always <em>in motion.</em></h2>
        <p>From the first conversation to the next milestone, we keep your work moving forward.</p>
      </div>
      <div className="crowd-moment-stage" aria-hidden="true">
        <div className="crowd-moment-ground" />
        <CrowdCanvas src="/images/peeps/all-peeps.svg" rows={15} cols={7} />
      </div>
    </section>

    <Founder />
    <CTA />
    <Footer />
  </>
);

export default HomeBelowFold;
