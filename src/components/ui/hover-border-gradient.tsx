import * as React from "react";
import { cn } from "@/lib/utils";

export type HoverBorderGradientProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  containerClassName?: string;
  innerClassName?: string;
  maskClassName?: string;
  duration?: number;
  clockwise?: boolean;
  className?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/**
 * HoverBorderGradient — static glowing border, no revolving flash.
 * On hover the border brightens from a dim purple to a vivid glow.
 */
export const HoverBorderGradient = React.forwardRef<HTMLElement, HoverBorderGradientProps>(
  function HoverBorderGradient(
    {
      as,
      children,
      containerClassName,
      innerClassName,
      className,
      disabled,
      type,
      ...rest
    },
    ref,
  ) {
    const Tag = as ?? "button";
    const face = cn(innerClassName, className);
    const isButton = Tag === "button";

    return (
      <Tag
        ref={ref as never}
        {...(isButton
          ? { type: (type as string | undefined) ?? "button", disabled }
          : { "aria-disabled": disabled })}
        className={cn(
          // Outer wrapper — provides the glowing border via box-shadow + border
          "relative inline-flex rounded-[inherit] p-px w-fit h-fit",
          "border border-primary/30 hover:border-primary/70",
          "shadow-[0_0_0_0_hsla(259,95%,65%,0)] hover:shadow-[0_0_16px_2px_hsla(259,95%,65%,0.25)]",
          "transition-all duration-300 ease-out",
          disabled && "pointer-events-none opacity-50",
          containerClassName,
        )}
        {...rest}
      >
        <div className={cn("relative z-10 w-auto min-w-0 rounded-[inherit]", face)}>
          {children}
        </div>
      </Tag>
    );
  },
);

HoverBorderGradient.displayName = "HoverBorderGradient";
