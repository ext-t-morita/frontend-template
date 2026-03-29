"use client";

import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { EmptyState } from "./EmptyState";
import { Input } from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { Skeleton } from "./Skeleton";
import { StatusPill } from "./StatusPill";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

export type { ColumnDef as DataTableColumnDef } from "@tanstack/react-table";

export function DataTableEmptyState({
  description = "Try adjusting filters, density, or visible columns.",
  title = "No rows matched this view",
}: {
  title?: string;
  description?: string;
}) {
  return <EmptyState title={title} description={description} />;
}

export function DataTableLoadingState() {
  return (
    <div className="space-y-3 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.03)] p-5">
      <Skeleton className="w-48" />
      <Skeleton className="w-full" shape="block" />
      <Skeleton className="w-full" shape="block" />
    </div>
  );
}

export function DataTableErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-rose-400/30 bg-[rgba(248,113,113,0.08)] p-5">
      <div className="mb-3">
        <StatusPill tone="danger">Error</StatusPill>
      </div>
      <p className="text-sm leading-6 text-[var(--color-fg-default)]">
        {message}
      </p>
    </div>
  );
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: {
  column: Column<TData, TValue>;
  title: string;
}) {
  if (!column.getCanSort()) {
    return <span>{title}</span>;
  }

  return (
    <button
      className="inline-flex items-center gap-2 text-left text-inherit"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      type="button"
    >
      <span>{title}</span>
      <span className="text-[10px] text-[var(--color-fg-muted)]">
        {column.getIsSorted() === "asc"
          ? "ASC"
          : column.getIsSorted() === "desc"
            ? "DESC"
            : "SORT"}
      </span>
    </button>
  );
}

export function DataTableToolbar<TData>({
  children,
  searchKey,
  searchPlaceholder = "Search rows",
  table,
}: {
  table: TanStackTable<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}) {
  const searchValue = searchKey
    ? String(table.getColumn(searchKey)?.getFilterValue() ?? "")
    : "";

  return (
    <div className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {searchKey ? (
          <Input
            className="max-w-sm"
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            placeholder={searchPlaceholder}
            value={searchValue}
          />
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button tone="secondary">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {table
              .getAllLeafColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  checked={column.getIsVisible()}
                  key={column.id}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(Boolean(value))
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children ? (
        <div className="flex items-center gap-2">{children}</div>
      ) : null}
    </div>
  );
}

export function DataTablePagination<TData>({
  table,
}: {
  table: TanStackTable<TData>;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-[var(--color-border-subtle)] p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[var(--color-fg-muted)]">
        {table.getFilteredSelectedRowModel().rows.length} selected /{" "}
        {table.getFilteredRowModel().rows.length} visible
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-28">
          <Select
            onValueChange={(value) => table.setPageSize(Number(value))}
            value={String(table.getState().pagination.pageSize)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          tone="secondary"
        >
          Previous
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          tone="secondary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  error?: string;
  emptyDescription?: string;
  emptyTitle?: string;
  isLoading?: boolean;
  searchKey?: string;
  searchPlaceholder?: string;
  toolbarActions?: React.ReactNode;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyDescription,
  emptyTitle,
  error,
  isLoading = false,
  searchKey,
  searchPlaceholder,
  toolbarActions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const columnHelper = createColumnHelper<TData>();

  const resolvedColumns = useMemo(
    () => [
      columnHelper.display({
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
      }),
      ...columns,
    ],
    [columnHelper, columns],
  );

  const table = useReactTable({
    columns: resolvedColumns,
    data,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
  });

  if (error) {
    return <DataTableErrorState message={error} />;
  }

  if (isLoading) {
    return <DataTableLoadingState />;
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-surface)]">
      <DataTableToolbar
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        table={table}
      >
        {toolbarActions}
      </DataTableToolbar>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={cn(
                    row.getIsSelected() && "bg-[rgba(76,125,255,0.08)]",
                  )}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="p-6" colSpan={resolvedColumns.length}>
                  <DataTableEmptyState
                    description={emptyDescription}
                    title={emptyTitle}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
