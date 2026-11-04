import * as React from "react";
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[5px] border font-mono text-[11px] leading-[1.5] select-none transition-[color,background-color,border-color] duration-150 ease-out focus:outline-none focus:ring-1 focus:ring-[#ededed] [&>svg]:stroke-[1.5] [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-white/5 bg-[#262626] text-[#b7b7b7] hover:bg-[#303030] hover:border-white/10",
        secondary:
          "border-transparent bg-[#202020] text-[#929292] hover:bg-[#282828]",
        outline:
          "border-[#2a2a2a] text-[#b7b7b7] hover:border-white/15",
        accent:
          "border-white/20 bg-white/10 text-[#ededed]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, className }), "px-2 py-0.5")} {...props} />
  );
}

export { Badge, badgeVariants };
