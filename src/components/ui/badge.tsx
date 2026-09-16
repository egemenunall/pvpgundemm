import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 border px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "rounded-sm border-border bg-surface text-text-secondary",
        accent: "rounded-sm border-accent/40 bg-accent/10 text-accent",
        outline: "rounded-sm border-border text-text-secondary",
        muted: "rounded-sm border-transparent bg-surface-hover text-text-muted",
        seal: "seal-badge",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
