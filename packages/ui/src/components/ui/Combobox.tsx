"use client";

import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { CheckIcon, ChevronDownIcon } from "./icons";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { SearchInput } from "./SearchInput";

export type ComboboxOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  keywords?: string[];
};

type ComboboxProps = {
  className?: string;
  disabled?: boolean;
  emptyMessage?: string;
  invalid?: boolean;
  onValueChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
  defaultValue?: string;
};

export function Combobox({
  className,
  defaultValue,
  disabled = false,
  emptyMessage = "No results found.",
  invalid = false,
  onValueChange,
  options,
  placeholder = "Select an option",
  searchPlaceholder = "Search options",
  value,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
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

  const selectedOption = options.find(
    (option) => option.value === currentValue,
  );

  const handleSelect = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setOpen(false);
    setQuery("");
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
          <span
            className={cn(
              "truncate",
              !selectedOption && "text-[var(--color-fg-muted)]",
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDownIcon aria-hidden="true" className="shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[22rem] p-3">
        <div className="space-y-3">
          <SearchInput
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            placeholder={searchPlaceholder}
            value={query}
          />
          <div className="max-h-64 space-y-1 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-[var(--radius-control)] px-3 py-2.5 text-left transition hover:bg-[rgba(255,255,255,0.06)]",
                    option.value === currentValue &&
                      "bg-[rgba(76,125,255,0.14)] text-[var(--color-action-primary-bg)]",
                    option.disabled &&
                      "cursor-not-allowed opacity-50 hover:bg-transparent",
                  )}
                  disabled={option.disabled}
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
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
                  {option.value === currentValue ? (
                    <CheckIcon aria-hidden="true" className="mt-0.5 shrink-0" />
                  ) : null}
                </button>
              ))
            ) : (
              <div className="rounded-[var(--radius-control)] border border-dashed border-[var(--color-border-subtle)] px-3 py-6 text-center text-sm text-[var(--color-fg-muted)]">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
