import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type FieldProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  labelAction?: ReactNode;
  required?: boolean;
};

export function Field({
  children,
  className,
  description,
  error,
  htmlFor,
  label,
  labelAction,
  required = false,
  ...props
}: FieldProps) {
  return (
    <div className={cn("space-y-2.5", className)} {...props}>
      {(label || labelAction) && (
        <div className="flex items-center justify-between gap-3">
          {label ? (
            <label
              className="text-sm font-medium text-[var(--color-fg-default)]"
              htmlFor={htmlFor}
            >
              {label}
              {required ? (
                <span className="ml-1 text-rose-400" aria-hidden="true">
                  *
                </span>
              ) : null}
            </label>
          ) : (
            <span />
          )}
          {labelAction ? (
            <div className="text-sm text-[var(--color-fg-muted)]">
              {labelAction}
            </div>
          ) : null}
        </div>
      )}
      {children}
      {description ? (
        <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
          {description}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm leading-6 text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FieldGroupProps = HTMLAttributes<HTMLDivElement> & {
  columns?: 1 | 2 | 3;
  dense?: boolean;
};

export function FieldGroup({
  children,
  className,
  columns = 1,
  dense = false,
  ...props
}: FieldGroupProps) {
  return (
    <div
      className={cn(
        "grid gap-5",
        columns >= 2 && "md:grid-cols-2",
        columns === 3 && "xl:grid-cols-3",
        dense && "gap-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
