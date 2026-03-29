import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  tone?: "primary" | "secondary" | "ghost";
};

const sizeClasses = {
  sm: "h-9 w-9 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
} as const;

export function IconButton({
  className,
  size = "md",
  tone = "secondary",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary-bg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-canvas)] disabled:cursor-not-allowed disabled:opacity-60",
        tone === "primary" &&
          "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)] hover:brightness-110",
        tone === "secondary" &&
          "border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] text-[var(--color-fg-default)] hover:bg-[rgba(255,255,255,0.08)]",
        tone === "ghost" &&
          "text-[var(--color-fg-muted)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--color-fg-default)]",
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
