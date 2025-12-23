"use client";

import clsx from "clsx";
import { forwardRef } from "react";

type TextFieldProps = {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, description, error, required, disabled, className, id, ...props }, ref) => {
    const inputId = id ?? props.name ?? `field-${label}`;
    const helpId = description ? `${inputId}-desc` : undefined;
    const errorId = error ? `${inputId}-err` : undefined;

    return (
      <label className="flex flex-col gap-1 text-foreground text-sm">
        <div className="flex items-center gap-2 font-medium">
          <span>{label}</span>
          {required ? (
            <span className="text-destructive">*</span>
          ) : (
            <span className="text-muted-foreground">(任意)</span>
          )}
        </div>
        <input
          id={inputId}
          ref={ref}
          aria-describedby={helpId}
          aria-errormessage={errorId}
          aria-invalid={Boolean(error)}
          disabled={disabled}
          className={clsx(
            "h-10 rounded-md border bg-card px-3 text-sm shadow-sm ring-offset-background transition placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "border-border text-foreground",
            error && "border-destructive focus-visible:ring-destructive",
            disabled && "bg-secondary text-muted-foreground",
            className,
          )}
          {...props}
        />
        {description ? (
          <p id={helpId} className="text-muted-foreground text-xs">
            {description}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-destructive text-xs">
            {error}
          </p>
        ) : null}
      </label>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
