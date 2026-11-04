import * as React from "react";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const childProps = children.props as any;
      return React.cloneElement(children, {
        ...props,
        ...childProps,
        ref,
        className: [className, childProps?.className].filter(Boolean).join(" "),
      } as any);
    }
    return (
      <span ref={ref as any} className={className} {...props}>
        {children}
      </span>
    );
  }
);
Slot.displayName = "Slot";

