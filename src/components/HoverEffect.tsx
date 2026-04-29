import { cn } from "@/lib/utils";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

export type HoverEffectItem = {
  title: string;
  description: string;
  link: string;
  icon?: LucideIcon;
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: HoverEffectItem[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 md:py-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item.link}
          key={item.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary/10 dark:bg-primary/[0.12] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon ? (
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                <item.icon size={22} className="text-primary" />
              </div>
            ) : null}
            <CardTitle className={item.icon ? "mt-0" : undefined}>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl h-full w-full z-20",
        "bg-gradient-to-b from-background/90 via-background/75 to-background/60",
        "shadow-[0_22px_56px_rgba(0,0,0,0.35),0_0_48px_-16px_hsla(259,95%,65%,0.1)]",
        className
      )}
    >
      <ShineBorder
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        borderWidth={1}
        duration={14}
        className="z-0"
      />
      <div className="relative z-10">
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-foreground font-display font-semibold text-lg md:text-xl tracking-tight mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-3 md:mt-4 text-muted-foreground tracking-wide leading-relaxed text-sm md:text-base",
        className
      )}
    >
      {children}
    </p>
  );
};
