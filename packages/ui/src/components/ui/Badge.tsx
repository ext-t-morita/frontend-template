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
          "border border-[var(--color-border-subtle)] text-[var(--color-fg-muted)]",
        tone === "info" &&
          "bg-[rgba(76,125,255,0.14)] text-[var(--color-action-primary-bg)]",
        tone === "success" && "bg-[rgba(52,211,153,0.14)] text-emerald-300",
        tone === "warning" && "bg-[rgba(251,191,36,0.14)] text-amber-300",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
