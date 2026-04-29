import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
};

export type HoverBorderGradientProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  containerClassName?: string;
  innerClassName?: string;
  maskClassName?: string;
  duration?: number;
  clockwise?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const HoverBorderGradient = React.forwardRef<HTMLElement, HoverBorderGradientProps>(
  function HoverBorderGradient(
    {
      as,
      children,
      containerClassName,
      innerClassName,
      maskClassName,
      className,
      duration = 1,
      clockwise = true,
      disabled,
      onMouseEnter,
      onMouseLeave,
      type,
      ...rest
    },
    ref,
  ) {
    const Tag = as ?? "button";
    const [hovered, setHovered] = useState(false);
    const [direction, setDirection] = useState<Direction>("TOP");

    const rotateDirection = useCallback(
      (currentDirection: Direction): Direction => {
        const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
          ? (currentIndex - 1 + directions.length) % directions.length
          : (currentIndex + 1) % directions.length;
        return directions[nextIndex]!;
      },
      [clockwise],
    );

    const highlight =
      "radial-gradient(75% 181% at 50% 50%, hsl(var(--primary)) 0%, rgba(255, 255, 255, 0) 100%)";

    const face = cn(innerClassName, className);

    useEffect(() => {
      if (hovered || disabled) return;
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, duration * 1000);
      return () => clearInterval(interval);
    }, [hovered, disabled, duration, rotateDirection]);

    const isButton = Tag === "button";

    return (
      <Tag
        ref={ref as never}
        {...(isButton
          ? { type: (type as string | undefined) ?? "button", disabled }
          : { "aria-disabled": disabled })}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          setHovered(false);
          onMouseLeave?.(e);
        }}
        className={cn(
          "relative inline-flex rounded-[inherit] border border-transparent content-center",
          "bg-black/15 dark:bg-white/15 hover:bg-black/10 dark:hover:bg-white/10 transition duration-500",
          "items-center justify-center overflow-visible p-px decoration-clone w-fit h-fit",
          disabled && "pointer-events-none opacity-50",
          containerClassName,
        )}
        {...rest}
      >
        <div className={cn("relative z-10 w-auto min-w-0 rounded-[inherit]", face)}>{children}</div>
        <motion.div
          className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
          style={{
            filter: "blur(2px)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          initial={{ background: movingMap[direction] }}
          animate={{
            background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
          }}
          transition={{ ease: "linear", duration: duration ?? 1 }}
        />
        <div
          className={cn(
            "absolute z-[1] flex-none inset-[2px] rounded-[inherit] pointer-events-none",
            maskClassName ?? face,
          )}
          aria-hidden
        />
      </Tag>
    );
  },
);

HoverBorderGradient.displayName = "HoverBorderGradient";
