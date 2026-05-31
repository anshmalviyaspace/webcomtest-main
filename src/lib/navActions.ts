import { consultingCopy, mailtoHref } from "@/content/consultingCopy";

/** Open default mail app with pre-filled address. */
export function openEmailClient(closeMenu?: () => void) {
  closeMenu?.();
  window.location.href = mailtoHref();
}

/** Scroll to footer where email + booking live (works without a mail app). */
export function goToFooterContact(closeMenu?: () => void) {
  scrollToHash("#footer-contact", closeMenu);
}

export function scrollToHash(href: string, closeMenu?: () => void) {
  if (!href.startsWith("#")) return;
  closeMenu?.();
  window.setTimeout(() => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, closeMenu ? 200 : 0);
}

export function scrollToCta(closeMenu?: () => void) {
  scrollToHash("#cta", closeMenu);
}

export function scrollToFooterContact(closeMenu?: () => void) {
  scrollToHash("#footer-contact", closeMenu);
}

export const linkedInCompanyUrl = consultingCopy.linkedInUrl;
