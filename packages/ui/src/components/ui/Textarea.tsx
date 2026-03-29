import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function Textarea({
  className,
  invalid = false,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-4 py-3 text-sm text-[var(--color-fg-default)] outline-none transition placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-action-primary-bg)] focus:ring-2 focus:ring-[rgba(76,125,255,0.2)] disabled:cursor-not-allowed disabled:opacity-60",
        invalid &&
          "border-rose-400 focus:border-rose-400 focus:ring-[rgba(248,113,113,0.2)]",
        className,
      )}
      rows={rows}
      {...props}
    />
  );
}
