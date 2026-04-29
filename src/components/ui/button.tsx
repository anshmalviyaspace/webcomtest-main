import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const gradientVariants = new Set(["default", "destructive", "secondary", "outline"]);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const styles = buttonVariants({ variant, size, className });

    if (asChild) {
      return (
        <Comp className={styles} ref={ref} {...props}>
          {children}
        </Comp>
      );
    }

    if (!gradientVariants.has(variant ?? "default")) {
      return (
        <Comp className={styles} ref={ref} {...props}>
          {children}
        </Comp>
      );
    }

    const round =
      size === "icon" || /\brounded-full\b/.test(className ?? "")
        ? "rounded-full"
        : "rounded-md";

    return (
      <HoverBorderGradient
        ref={ref as React.Ref<HTMLElement>}
        as="button"
        containerClassName={cn(round, /\bw-full\b/.test(className ?? "") && "w-full")}
        innerClassName={styles}
        {...props}
      >
        {children}
      </HoverBorderGradient>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
