/**
 * FadeUp — lightweight scroll-triggered entrance wrapper using Framer Motion.
 * Wraps any children and animates them up + fade-in when they enter the viewport.
 */
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** How far below the viewport edge to trigger (negative = earlier) */
  margin?: string;
  y?: number;
}

const FadeUp = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
  margin = "-80px",
  y = 28,
}: FadeUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
