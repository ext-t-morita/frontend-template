import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shape?: "line" | "block" | "pill";
};

export function Skeleton({
  className,
  shape = "line",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-[linear-gradient(90deg,var(--color-skeleton-base),var(--color-skeleton-highlight),var(--color-skeleton-base))] bg-[length:200%_100%]",
        shape === "line" && "h-4 rounded-[var(--radius-pill)]",
        shape === "block" && "h-24 rounded-[var(--radius-card)]",
        shape === "pill" && "h-10 rounded-[var(--radius-pill)]",
        className,
      )}
      {...props}
    />
  );
}
