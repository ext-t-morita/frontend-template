import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "primary" | "secondary";
};

export function Button({
  children,
  className,
  tone = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary-bg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-canvas)]",
        tone === "primary" &&
          "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)] hover:brightness-110",
        tone === "secondary" &&
          "border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] text-[var(--color-fg-default)] hover:bg-[rgba(255,255,255,0.08)]",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
