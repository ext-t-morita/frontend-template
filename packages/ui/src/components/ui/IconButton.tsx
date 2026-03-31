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
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-canvas)] disabled:cursor-not-allowed disabled:opacity-60",
        tone === "primary" &&
          "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)] hover:bg-[var(--color-action-primary-hovered)] active:bg-[var(--color-action-primary-pressed)]",
        tone === "secondary" &&
          "border border-[var(--color-border-input)] bg-[var(--color-bg-surface)] text-[var(--color-fg-default)] hover:bg-[var(--color-bg-neutral-hovered)] active:bg-[var(--color-bg-neutral-pressed)]",
        tone === "ghost" &&
          "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-neutral-hovered)] hover:text-[var(--color-fg-default)] active:bg-[var(--color-bg-neutral-pressed)]",
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
