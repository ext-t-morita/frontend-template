"use client";

import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "./Badge";
import { Button } from "./Button";
import type { ComboboxOption } from "./Combobox";
import { CheckIcon, ChevronDownIcon } from "./icons";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { SearchInput } from "./SearchInput";

type MultiSelectProps = {
  className?: string;
  disabled?: boolean;
  emptyMessage?: string;
  invalid?: boolean;
  onValueChange?: (value: string[]) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string[];
  defaultValue?: string[];
};

export function MultiSelect({
  className,
  defaultValue,
  disabled = false,
  emptyMessage = "No matching items.",
  invalid = false,
  onValueChange,
  options,
  placeholder = "Select options",
  searchPlaceholder = "Search items",
  value,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? []);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const currentValue = value ?? internalValue;

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => {
      const haystack = [
        option.label,
        option.value,
        option.description,
        ...(option.keywords ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [options, query]);

  const selectedOptions = options.filter((option) =>
    currentValue.includes(option.value),
  );

  const setSelectedValues = (nextValue: string[]) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const toggleValue = (nextValue: string) => {
    if (currentValue.includes(nextValue)) {
      setSelectedValues(
        currentValue.filter((valueItem) => valueItem !== nextValue),
      );
      return;
    }

    setSelectedValues([...currentValue, nextValue]);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-4 py-3 text-left text-sm text-[var(--color-fg-default)] outline-none transition focus-visible:ring-2 focus-visible:ring-[rgba(76,125,255,0.2)] disabled:cursor-not-allowed disabled:opacity-60",
            invalid &&
              "border-rose-400 focus-visible:ring-[rgba(248,113,113,0.2)]",
            className,
          )}
          disabled={disabled}
          type="button"
        >
          <span className="flex min-w-0 flex-1 flex-wrap gap-2">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <Badge key={option.value} tone="info">
                  {option.label}
                </Badge>
              ))
            ) : (
              <span className="truncate text-[var(--color-fg-muted)]">
                {placeholder}
              </span>
            )}
          </span>
          <ChevronDownIcon aria-hidden="true" className="shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[24rem] p-3">
        <div className="space-y-3">
          <SearchInput
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            placeholder={searchPlaceholder}
            value={query}
          />
          <div className="max-h-64 space-y-1 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = currentValue.includes(option.value);

                return (
                  <button
                    className={cn(
                      "flex w-full items-start justify-between gap-3 rounded-[var(--radius-control)] px-3 py-2.5 text-left transition hover:bg-[rgba(255,255,255,0.06)]",
                      isSelected &&
                        "bg-[rgba(76,125,255,0.14)] text-[var(--color-action-primary-bg)]",
                      option.disabled &&
                        "cursor-not-allowed opacity-50 hover:bg-transparent",
                    )}
                    disabled={option.disabled}
                    key={option.value}
                    onClick={() => toggleValue(option.value)}
                    type="button"
                  >
                    <span className="space-y-1">
                      <span className="block text-sm font-medium">
                        {option.label}
                      </span>
                      {option.description ? (
                        <span className="block text-sm text-[var(--color-fg-muted)]">
                          {option.description}
                        </span>
                      ) : null}
                    </span>
                    {isSelected ? (
                      <CheckIcon
                        aria-hidden="true"
                        className="mt-0.5 shrink-0"
                      />
                    ) : null}
                  </button>
                );
              })
            ) : (
              <div className="rounded-[var(--radius-control)] border border-dashed border-[var(--color-border-subtle)] px-3 py-6 text-center text-sm text-[var(--color-fg-muted)]">
                {emptyMessage}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] pt-3">
            <p className="text-sm text-[var(--color-fg-muted)]">
              {selectedOptions.length} selected
            </p>
            <Button
              disabled={selectedOptions.length === 0}
              onClick={() => setSelectedValues([])}
              size="sm"
              tone="ghost"
              type="button"
            >
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
