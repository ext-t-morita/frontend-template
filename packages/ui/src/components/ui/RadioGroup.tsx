"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-3", className)}
    {...props}
  />
));

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

type RadioGroupItemProps = ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> & {
  label?: ReactNode;
  description?: ReactNode;
};

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, description, label, ...props }, ref) => (
  <div className="flex items-start gap-3 text-sm text-[var(--color-fg-default)]">
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-input)] bg-[var(--color-bg-surface)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] data-[state=checked]:border-[var(--color-border-selected)]",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-full bg-[var(--color-action-primary-bg)]" />
    </RadioGroupPrimitive.Item>
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

RadioGroupItem.displayName = "RadioGroupItem";
