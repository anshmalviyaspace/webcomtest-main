import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const founders = [
  { name: "Ansh Malviya", role: "Co-founder", image: `${import.meta.env.BASE_URL}founder-ansh-malviya.png` },
  { name: "Anish Minj", role: "Co-founder", image: `${import.meta.env.BASE_URL}cofounder-02.png` },
];

const Founder = () => (
  <section className="founders-section section-wrap" id="founders">
    <div className="section-heading-row founders-heading-row" data-gsap-reveal>
      <div>
        <p className="eyebrow">Small team. Close collaboration.</p>
        <h2 className="section-heading">Two people.<br /><em>In your corner.</em></h2>
      </div>
      <p className="section-heading-note">
        We work closely with you, from the first conversation to the details that make the work feel right.
      </p>
    </div>

    <div className="founder-grid">
      {founders.map((founder, index) => (
        <motion.article
          key={founder.name}
          className={`founder-card founder-card-${index + 1} ${!founder.image ? "founder-card-placeholder" : ""}`}
          initial={{ opacity: 0, y: 28, rotate: index === 0 ? -2 : 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: index * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          whileHover={{ y: -7, rotate: index === 0 ? -1 : 1, transition: { duration: 0.25 } }}
        >
          <div className="founder-portrait">
            {founder.image ? (
              <img src={founder.image} alt={founder.name} />
            ) : (
              <div className="founder-placeholder-art" aria-hidden="true">
                <span className="placeholder-sun" /><span className="placeholder-ring" /><span className="placeholder-glyph">✳</span>
              </div>
            )}
            <span className="founder-index">0{index + 1}</span>
          </div>
          <div className="founder-card-meta">
            <div><h3>{founder.name}</h3><p>{founder.role}</p></div>
            <ArrowUpRight size={18} aria-hidden="true" />
          </div>
        </motion.article>
      ))}
    </div>

    <div className="founders-statement" data-gsap-reveal>
      <span className="statement-mark">“</span>
      <p>Good digital work should look considered, feel human, and make everyday business a little easier.</p>
      <span className="statement-rule" />
      <span className="statement-byline">THE WEBcommedia APPROACH</span>
    </div>
  </section>
);

export default Founder;
