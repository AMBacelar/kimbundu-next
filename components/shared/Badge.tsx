import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "outline" | "accent" | "success" | "warning";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "border-border/60 bg-muted/80 text-foreground/90",
  outline:
    "border-border/60 bg-transparent text-muted-foreground",
  accent:
    "border-primary/20 bg-primary/8 text-primary",
  success:
    "border-emerald-300/50 bg-emerald-50/80 text-emerald-800",
  warning:
    "border-amber-300/50 bg-amber-50/80 text-amber-800",
};

export const Badge = ({
  children,
  variant = "default",
  className,
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 transition-colors",
      variantStyles[variant],
      className
    )}
  >
    {children}
  </span>
);
