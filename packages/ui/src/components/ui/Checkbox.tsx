"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { CheckIcon } from "./icons";

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: ReactNode;
  description?: ReactNode;
};

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, description, label, ...props }, ref) => (
  <div className="flex items-start gap-3 text-sm text-[var(--color-fg-default)]">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] text-[var(--color-action-primary-fg)] outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary-bg)] data-[state=checked]:border-[var(--color-action-primary-bg)] data-[state=checked]:bg-[var(--color-action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {(label || description) && (
      <span className="space-y-1">
        {label ? <span className="block font-medium">{label}</span> : null}
        {description ? (
          <span className="block text-[var(--color-fg-muted)]">
            {description}
          </span>
        ) : null}
      </span>
    )}
  </div>
));

Checkbox.displayName = "Checkbox";
