"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";
import { Input } from "./Input";
import { CrossIcon, SearchIcon } from "./icons";

type SearchInputProps = ComponentPropsWithoutRef<typeof Input> & {
  onClear?: () => void;
};

export function SearchInput({
  className,
  onClear,
  value,
  ...props
}: SearchInputProps) {
  const hasValue = typeof value === "string" ? value.length > 0 : false;

  return (
    <div className="relative">
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-fg-muted)]"
      />
      <Input
        className={cn("pl-11 pr-10", className)}
        value={value}
        {...props}
      />
      {onClear && hasValue ? (
        <button
          aria-label="Clear search"
          className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-fg-muted)] transition hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--color-fg-default)]"
          onClick={onClear}
          type="button"
        >
          <CrossIcon />
        </button>
      ) : null}
    </div>
  );
}
