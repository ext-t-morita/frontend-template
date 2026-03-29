"use client";

import { useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "./Button";
import { getDatePickerTriggerLabel } from "./derived-state";
import { CalendarIcon } from "./icons";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

type DatePickerProps = {
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  max?: string;
  min?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};

export function DatePicker({
  className,
  defaultValue,
  disabled = false,
  invalid = false,
  max,
  min,
  onValueChange,
  placeholder = "Pick a date",
  value,
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const currentValue = value ?? internalValue;

  const triggerLabel = getDatePickerTriggerLabel(currentValue, placeholder);

  const setSelectedValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-[var(--radius-control)] border border-[var(--color-border-input)] bg-[var(--color-bg-surface)] px-4 py-3 text-left text-sm text-[var(--color-fg-default)] outline-none transition-colors focus-visible:border-[var(--color-border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] disabled:cursor-not-allowed disabled:opacity-60",
            invalid &&
              "border-[var(--color-border-danger)] focus-visible:ring-[var(--color-border-danger)]",
            className,
          )}
          disabled={disabled}
          type="button"
        >
          <span
            className={cn(
              "truncate",
              !currentValue && "text-[var(--color-fg-muted)]",
            )}
          >
            {triggerLabel}
          </span>
          <CalendarIcon aria-hidden="true" className="shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[20rem] space-y-4">
        <input
          className="w-full rounded-[var(--radius-control)] border border-[var(--color-border-input)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-fg-default)] outline-none transition-colors focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-border-focus)]"
          max={max}
          min={min}
          onChange={(event) => setSelectedValue(event.target.value)}
          type="date"
          value={currentValue}
        />
        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={() => {
              setSelectedValue(today);
              setOpen(false);
            }}
            size="sm"
            tone="secondary"
            type="button"
          >
            Today
          </Button>
          <Button
            disabled={!currentValue}
            onClick={() => {
              setSelectedValue("");
              setOpen(false);
            }}
            size="sm"
            tone="ghost"
            type="button"
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
