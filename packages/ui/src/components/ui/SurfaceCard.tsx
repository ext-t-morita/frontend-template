import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type SurfaceCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function SurfaceCard({
  children,
  className,
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-surface)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
