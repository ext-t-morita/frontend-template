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
          "bg-[rgba(255,255,255,0.06)] text-[var(--color-fg-muted)]",
        tone === "info" &&
          "bg-[rgba(76,125,255,0.16)] text-[var(--color-action-primary-bg)]",
        tone === "success" && "bg-[rgba(52,211,153,0.16)] text-emerald-300",
        tone === "warning" && "bg-[rgba(251,191,36,0.16)] text-amber-300",
        tone === "danger" && "bg-[rgba(248,113,113,0.16)] text-rose-300",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2 w-2 rounded-full",
          tone === "neutral" && "bg-[var(--color-fg-muted)]",
          tone === "info" && "bg-[var(--color-action-primary-bg)]",
          tone === "success" && "bg-emerald-300",
          tone === "warning" && "bg-amber-300",
          tone === "danger" && "bg-rose-300",
        )}
      />
      <span>{children}</span>
    </span>
  );
}
