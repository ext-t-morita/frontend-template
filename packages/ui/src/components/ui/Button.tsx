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
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary-bg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-canvas)] disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm" && "px-3 py-2 text-sm",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-5 py-3 text-base",
        tone === "primary" &&
          "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)] hover:brightness-110",
        tone === "secondary" &&
          "border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] text-[var(--color-fg-default)] hover:bg-[rgba(255,255,255,0.08)]",
        tone === "destructive" &&
          "bg-[rgba(248,113,113,0.9)] text-[var(--color-action-primary-fg)] hover:bg-[rgba(248,113,113,1)]",
        tone === "ghost" &&
          "text-[var(--color-fg-default)] hover:bg-[rgba(255,255,255,0.08)]",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
