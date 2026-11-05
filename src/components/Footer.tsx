import { ArrowUpRight } from "lucide-react";
import { Link005 } from "@/components/SkiperLinks";
import { consultingCopy } from "@/content/consultingCopy";

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-main">
      <a className="wordmark footer-wordmark" href="#top"><span className="wordmark-star" aria-hidden="true">✳</span><span>WebCom Media</span></a>
      <p>Building digital presence.<br />Making room for what’s next.</p>
      <Link005 className="footer-back-top" href="#top" showArrow>Back to the top</Link005>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} WebCom Media</span>
      <span className="footer-credit">Motion: React Bits <i>·</i> Canvas crowd: Skiper UI</span>
      <a href={`mailto:${consultingCopy.contactEmail}`}>{consultingCopy.contactEmail} <ArrowUpRight size={13} /></a>
    </div>
  </footer>
);

export default Footer;
