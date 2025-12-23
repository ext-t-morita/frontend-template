"use client";

import { useMemo, useState } from "react";

type Column<T, K extends keyof T = keyof T> = {
  key: K;
  header: string;
  sortable?: boolean;
  render?: (value: T[K], row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Array<Column<T>>;
  emptyMessage?: string;
  rowKey?: (row: T) => string;
};

type SortState<T> = {
  key: keyof T;
  direction: "asc" | "desc";
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  emptyMessage = "データがありません",
  rowKey,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T> | null>(null);

  const sorted = useMemo(() => {
    if (!sort) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];
      if (aVal === bVal) return 0;
      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;

      const aComparable = typeof aVal === "number" ? aVal : String(aVal);
      const bComparable = typeof bVal === "number" ? bVal : String(bVal);

      if (aComparable < bComparable) return sort.direction === "asc" ? -1 : 1;
      if (aComparable > bComparable) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort]);

  const toggleSort = (key: keyof T, sortable?: boolean) => {
    if (!sortable) return;
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      return {
        key,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-secondary text-secondary-foreground">
          <tr>
            {columns.map((col) => {
              const active = sort?.key === col.key;
              return (
                <th
                  key={String(col.key)}
                  scope="col"
                  className="px-4 py-3 text-left font-semibold text-foreground"
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 text-left"
                    onClick={() => toggleSort(col.key, col.sortable)}
                  >
                    {col.header}
                    {col.sortable ? (
                      <span className="text-muted-foreground text-xs">
                        {active ? (sort?.direction === "asc" ? "▲" : "▼") : "⇅"}
                      </span>
                    ) : null}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card text-foreground">
          {sorted.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-muted-foreground" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <tr
                key={rowKey ? rowKey(row) : `row-${idx}-${String(columns[0]?.key ?? "row")}`}
                className="hover:bg-secondary/60"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 align-middle">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
export type { Column };
