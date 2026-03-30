"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  label?: ReactNode;
  description?: ReactNode;
};

export const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, description, label, ...props }, ref) => (
  <div className="flex items-start justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)] p-4 text-sm text-[var(--color-fg-default)]">
    <span className="space-y-1">
      {label ? <span className="block font-medium">{label}</span> : null}
      {description ? (
        <span className="block text-[var(--color-fg-muted)]">
          {description}
        </span>
      ) : null}
    </span>
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 rounded-full bg-[var(--color-border-input)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] data-[state=checked]:bg-[var(--color-action-primary-bg)] disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-[var(--color-fg-default)] transition data-[state=checked]:translate-x-[1.3rem]" />
    </SwitchPrimitive.Root>
  </div>
));

Switch.displayName = "Switch";
