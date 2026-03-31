import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "primary" | "secondary" | "destructive" | "ghost";
};

export function Button({
  children,
  className,
  size = "md",
  tone = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-canvas)] disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm" && "px-3 py-2 text-sm",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-5 py-3 text-base",
        tone === "primary" &&
          "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)] hover:bg-[var(--color-action-primary-hovered)] active:bg-[var(--color-action-primary-pressed)]",
        tone === "secondary" &&
          "border border-[var(--color-border-input)] bg-[var(--color-bg-surface)] text-[var(--color-fg-default)] hover:bg-[var(--color-bg-neutral-hovered)] active:bg-[var(--color-bg-neutral-pressed)]",
        tone === "destructive" &&
          "bg-[var(--color-danger-bg)] text-[var(--color-fg-onBold)] hover:bg-[var(--color-fg-danger)] active:opacity-90",
        tone === "ghost" &&
          "text-[var(--color-fg-default)] hover:bg-[var(--color-bg-neutral-hovered)] active:bg-[var(--color-bg-neutral-pressed)]",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
