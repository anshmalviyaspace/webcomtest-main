import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

/** Coordinates smooth scrolling, GSAP scroll scenes, and reduced-motion behavior. */
const ScrollExperience = () => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      anchors: { offset: -76, duration: 1.1 },
    });
    const syncScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", syncScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]").forEach((element) => {
        gsap.fromTo(element,
          { autoAlpha: 0, y: 34, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const serviceCards = gsap.utils.toArray<HTMLElement>(".services-section .card");
      if (serviceCards.length) {
        gsap.fromTo(serviceCards,
          { autoAlpha: 0, y: 42, rotate: 1.2, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.78,
            stagger: 0.11,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-section .bento-section",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      gsap.to(".hero-art", {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    const restoreLagSmoothing = () => gsap.ticker.lagSmoothing(500, 33);

    return () => {
      cancelAnimationFrame(refreshFrame);
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      restoreLagSmoothing();
    };
  }, [reduceMotion]);

  return null;
};

export default ScrollExperience;
