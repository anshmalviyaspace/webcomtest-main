/** Shared messaging for AI consulting positioning */
export const consultingCopy = {
  badge: "AI Consulting for Growing Businesses",
  headline: "We Help You Implement AI Where It Matters.",
  subhead:
    "Map AI across operations, sales funnels, marketing, team workflows, and data — on a call, in a session, or on demand.",
  ctaPrimary: "Book a Free AI Discovery Call",
  ctaSecondary: "See Consulting Areas",
  philosophyLine: "We don't run your business. We show you where AI should.",
  contactEmail: "hello@webcommedia.in",
  linkedInUrl: "https://www.linkedin.com/company/webcommedia",
} as const;

export function mailtoHref(subject = "WebCom Media Inquiry") {
  return `mailto:${consultingCopy.contactEmail}?subject=${encodeURIComponent(subject)}`;
}
