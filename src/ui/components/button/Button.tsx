"use client";

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";

const buttonStyles = cva(
  "button-hover inline-flex items-center justify-center gap-2 rounded-md font-semibold text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border bg-card shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-6 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export type ButtonProps = VariantProps<typeof buttonStyles> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
