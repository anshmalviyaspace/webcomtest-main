import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type BlurTextProps = {
  text: string;
  effect?: "blur" | "zoom" | "tilt" | "focus" | "drift";
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom" | "left" | "right";
  staggerFrom?: "start" | "center" | "end" | "random";
  trigger?: "view" | "load" | "hover" | "click";
  delay?: number;
  stepDuration?: number;
  blur?: number;
  distance?: number;
  threshold?: number;
  onAnimationComplete?: () => void;
  className?: string;
  loop?: boolean;
  loopDelay?: number;
  focusOnHover?: boolean;
};

/** React Bits-inspired focus reveal for display copy. */
const BlurText = ({
  text,
  effect = "blur",
  animateBy = "words",
  direction = "top",
  staggerFrom = "start",
  trigger = "view",
  delay = 200,
  stepDuration = 0.35,
  blur = 10,
  distance = 50,
  threshold = 0.1,
  onAnimationComplete,
  className,
  loop = false,
  loopDelay = 2,
  focusOnHover = false,
}: BlurTextProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(trigger === "load");
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const pieces = useMemo(() => animateBy === "words" ? text.split(/(\s+)/) : Array.from(text), [animateBy, text]);
  const animatedIndices = pieces.map((piece, index) => /\s+/.test(piece) ? -1 : index).filter((index) => index >= 0);
  const randomOrder = useMemo(() => [...animatedIndices].sort((a, b) => ((a * 31 + 13) % 17) - ((b * 31 + 13) % 17)), [text]);

  useEffect(() => {
    if (trigger !== "view" || !rootRef.current) return;
    const node = rootRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) setActive(true);
      else if (loop) setActive(false);
    }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [loop, threshold, trigger]);

  const offset = direction === "top" ? distance : direction === "bottom" ? -distance : 0;
  const xOffset = direction === "left" ? distance : direction === "right" ? -distance : 0;

  return (
    <span
      ref={rootRef}
      className={className}
      aria-label={text}
      onMouseEnter={() => trigger === "hover" && setActive(true)}
      onMouseLeave={() => trigger === "hover" && setActive(false)}
      onClick={() => trigger === "click" && setActive((value) => !value)}
      onBlur={() => trigger === "hover" && setActive(false)}
      onMouseMove={(event) => {
        if (!focusOnHover || animateBy !== "words") return;
        const target = event.target as HTMLElement;
        const index = Number(target.dataset.wordIndex);
        setHovered(Number.isFinite(index) ? index : null);
      }}
      onMouseLeaveCapture={() => focusOnHover && setHovered(null)}
    >
      {pieces.map((piece, index) => {
        if (/\s+/.test(piece)) return <span key={`space-${index}`} aria-hidden="true">{piece}</span>;
        const order = staggerFrom === "center"
          ? Math.abs(animatedIndices.indexOf(index) - (animatedIndices.length - 1) / 2)
          : staggerFrom === "end"
            ? animatedIndices.length - 1 - animatedIndices.indexOf(index)
            : staggerFrom === "random"
              ? randomOrder.indexOf(index)
              : animatedIndices.indexOf(index);
        const shouldFocus = hovered !== null && Number(pieces[index] === piece ? index : -1) !== hovered;
        const tilt = effect === "tilt" ? 9 : 0;
        const scale = effect === "zoom" ? 0.84 : 1;
        const startBlur = effect === "blur" || effect === "focus" ? blur : effect === "drift" ? blur * 0.4 : 0;

        return (
          <motion.span
            key={`${piece}-${index}`}
            data-word-index={index}
            aria-hidden="true"
            style={{ display: "inline-block", whiteSpace: "pre", transformOrigin: "50% 70%" }}
            initial={false}
            animate={reduceMotion ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotateX: 0, scale: 1 } : active ? {
              opacity: shouldFocus ? 0.32 : 1,
              filter: shouldFocus ? `blur(${Math.min(blur, 4)}px)` : "blur(0px)",
              x: 0,
              y: 0,
              rotateX: 0,
              scale: 1,
            } : {
              opacity: 0,
              filter: `blur(${startBlur}px)`,
              x: xOffset,
              y: offset,
              rotateX: tilt,
              scale,
            }}
            transition={{
              duration: stepDuration,
              delay: active ? order * delay / 1000 : 0,
              ease: [0.22, 1, 0.36, 1],
              ...(loop && active ? { repeat: Infinity, repeatType: "reverse" as const, repeatDelay: loopDelay } : {}),
            }}
            onAnimationComplete={() => {
              if (active && order === animatedIndices.length - 1) onAnimationComplete?.();
            }}
          >{piece}</motion.span>
        );
      })}
    </span>
  );
};

export default BlurText;
