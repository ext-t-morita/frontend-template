import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "neutral" | "info" | "success" | "warning";
};

export function Badge({
  children,
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]",
        tone === "neutral" &&
          "border border-[var(--color-border-subtle)] bg-[var(--color-bg-neutral-subtle)] text-[var(--color-fg-muted)]",
        tone === "info" &&
          "bg-[var(--color-bg-selected)] text-[var(--color-fg-accent)]",
        tone === "success" &&
          "bg-[var(--color-success-surface)] text-[var(--color-fg-success)]",
        tone === "warning" &&
          "bg-[var(--color-warning-surface)] text-[var(--color-fg-warning)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
