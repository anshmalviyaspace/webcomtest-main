import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type SkiperLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  showArrow?: boolean;
};

/** Skiper UI CssLink family (skiper40), styled for Webcommedia. */
const SkiperLink = ({ children, className = "", showArrow = false, ...props }: SkiperLinkProps) => (
  <a className={`skiper-link ${className}`} {...props}>
    <span className="skiper-link-label">{children}</span>
    {showArrow && <ArrowUpRight className="skiper-link-arrow" size={15} aria-hidden="true" />}
    <span className="skiper-link-line" aria-hidden="true" />
  </a>
);

export const Link001 = (props: SkiperLinkProps) => <SkiperLink {...props} />;

export const Link003 = ({ className = "", ...props }: SkiperLinkProps) => (
  <SkiperLink className={`skiper-link-center ${className}`} {...props} />
);

export const Link005 = ({ className = "", ...props }: SkiperLinkProps) => (
  <SkiperLink className={`skiper-link-wide ${className}`} {...props} />
);
