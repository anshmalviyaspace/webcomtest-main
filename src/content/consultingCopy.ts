/** Shared public-facing copy for the Webcommedia digital and AI services site. */
export const consultingCopy = {
  badge: "Digital presence + practical AI",
  headline: "A sharper digital presence. More room to grow.",
  subhead:
    "Websites, social media, property reels, and Meta Ads—plus AI automation and consultation to help your business show up clearly and work more smoothly.",
  ctaPrimary: "Start a project",
  ctaSecondary: "Explore our services",
  philosophyLine: "Good digital work makes business feel easier.",
  contactEmail: "hello@webcommedia.in",
  linkedInUrl: "https://www.linkedin.com/company/webcommedia",
} as const;

export function mailtoHref(subject = "New Webcommedia project") {
  return `mailto:${consultingCopy.contactEmail}?subject=${encodeURIComponent(subject)}`;
}
