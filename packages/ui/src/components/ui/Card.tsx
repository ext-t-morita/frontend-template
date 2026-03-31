import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
  tone?: "default" | "muted";
};

const paddingClasses = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
} as const;

export function Card({
  children,
  className,
  padding = "lg",
  tone = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--color-border-subtle)]",
        tone === "default" && "bg-[var(--color-bg-raised)]",
        tone === "muted" && "bg-[var(--color-bg-sunken)]",
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
