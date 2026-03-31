import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type StatusPillProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
};

export function StatusPill({
  children,
  className,
  tone = "neutral",
  ...props
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-3 py-1.5 text-xs font-medium",
        tone === "neutral" &&
          "bg-[var(--color-bg-neutral-subtle)] text-[var(--color-fg-muted)]",
        tone === "info" &&
          "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)]",
        tone === "success" &&
          "bg-[var(--color-success-surface)] text-[var(--color-fg-success)]",
        tone === "warning" &&
          "bg-[var(--color-warning-surface)] text-[var(--color-fg-warning)]",
        tone === "danger" &&
          "bg-[var(--color-danger-bg)] text-[var(--color-fg-onBold)]",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2 w-2 rounded-full",
          tone === "neutral" && "bg-[var(--color-fg-muted)]",
          tone === "info" && "bg-[var(--color-action-primary-fg)]",
          tone === "success" && "bg-[var(--color-fg-success)]",
          tone === "warning" && "bg-[var(--color-fg-warning)]",
          tone === "danger" && "bg-[var(--color-fg-onBold)]",
        )}
      />
      <span>{children}</span>
    </span>
  );
}
