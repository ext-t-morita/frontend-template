"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./Checkbox";
import type { ComboboxOption } from "./Combobox";

export function formatDateLabel(value: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

export function getDatePickerTriggerLabel(value: string, placeholder: string) {
  return formatDateLabel(value) || placeholder;
}

export function filterComboboxOptions(
  options: ComboboxOption[],
  query: string,
) {
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
}

export function getSelectedOptions(
  options: ComboboxOption[],
  selectedValues: string[],
) {
  return options.filter((option) => selectedValues.includes(option.value));
}

export function buildDataTableColumns<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
): ColumnDef<TData, TValue>[] {
  const selectionColumn = {
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select row ${row.id}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
      />
    ),
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
      />
    ),
    id: "select",
  } satisfies ColumnDef<TData, unknown>;

  return [selectionColumn as ColumnDef<TData, TValue>, ...columns];
}
