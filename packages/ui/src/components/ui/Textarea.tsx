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
        "w-full rounded-[var(--radius-control)] border border-[var(--color-border-input)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-fg-default)] outline-none transition-colors placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-border-focus)] disabled:cursor-not-allowed disabled:opacity-60",
        invalid &&
          "border-[var(--color-border-danger)] focus:border-[var(--color-border-danger)] focus:ring-[var(--color-border-danger)]",
        className,
      )}
      rows={rows}
      {...props}
    />
  );
}
