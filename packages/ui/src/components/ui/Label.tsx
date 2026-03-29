import type { LabelHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({
  children,
  className,
  htmlFor,
  required = false,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-[var(--color-fg-default)]",
        className,
      )}
      htmlFor={htmlFor}
      {...props}
    >
      <span>{children}</span>
      {required ? (
        <span
          className="text-[var(--color-action-primary-bg)]"
          aria-hidden="true"
        >
          *
        </span>
      ) : null}
    </label>
  );
}
