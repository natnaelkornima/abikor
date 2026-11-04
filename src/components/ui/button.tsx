import * as React from "react";
import { Slot } from "@/components/ui/slot";
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] text-[13px] font-medium select-none [-webkit-tap-highlight-color:transparent] transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ededed] motion-safe:enabled:active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&>svg]:stroke-[1.5] [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "bg-[#262626] text-[#ededed] border border-white/10 hover:bg-[#303030] hover:border-white/20 motion-safe:hover:-translate-y-px shadow-sm",
        primary:
          "bg-[#ededed] text-[#151515] font-semibold hover:bg-white hover:text-black motion-safe:hover:-translate-y-px shadow-sm",
        outline:
          "border border-[#2a2a2a] bg-transparent text-[#ededed] hover:bg-[#262626] hover:border-white/10",
        ghost: "hover:bg-[#262626] text-[#ededed]",
        link: "text-[#ededed] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 pl-3 pr-3.5 py-1.5",
        sm: "h-7 rounded-[4px] pl-2 pr-2.5 text-xs",
        lg: "h-10 rounded-[6px] pl-4.5 pr-5 text-sm",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
