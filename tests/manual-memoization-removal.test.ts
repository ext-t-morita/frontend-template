import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ColumnDef } from "@tanstack/react-table";
import { describe, expect, it } from "vitest";
import {
  buildDataTableColumns,
  filterComboboxOptions,
  formatDateLabel,
  getDatePickerTriggerLabel,
  getSelectedOptions,
} from "../packages/ui/src/components/ui/derived-state";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("manual memoization removal helpers", () => {
  it("derives date picker labels without memoization", () => {
    expect(getDatePickerTriggerLabel("", "Pick a date")).toBe("Pick a date");
    expect(formatDateLabel("2026-03-29")).toBe("Mar 29, 2026");
    expect(getDatePickerTriggerLabel("2026-03-29", "Pick a date")).toBe(
      "Mar 29, 2026",
    );
  });

  it("filters combobox-style options from the raw query each render", () => {
    const options = [
      {
        description: "Handles operational events",
        keywords: ["alerts", "events"],
        label: "Incident queue",
        value: "incidents",
      },
      {
        label: "Design review",
        value: "design-review",
      },
    ];

    expect(filterComboboxOptions(options, "  INCIDENT  ")).toEqual([
      options[0],
    ]);
    expect(filterComboboxOptions(options, "alerts")).toEqual([options[0]]);
    expect(filterComboboxOptions(options, "")).toBe(options);
  });

  it("derives selected options without memoization", () => {
    const options = [
      { label: "Design review", value: "design-review" },
      { label: "Incident queue", value: "incidents" },
    ];

    expect(getSelectedOptions(options, ["incidents"])).toEqual([options[1]]);
  });

  it("prepends the selection column for the data table foundation", () => {
    const columns: ColumnDef<{ name: string }, string>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
    ];

    const resolvedColumns = buildDataTableColumns(columns);

    expect(resolvedColumns).toHaveLength(2);
    expect(resolvedColumns[0]).toMatchObject({
      enableHiding: false,
      id: "select",
    });
    expect(resolvedColumns[1]).toMatchObject({
      accessorKey: "name",
      header: "Name",
    });
  });
});

describe("memoization policy documentation", () => {
  it("documents the compiler-first direction in AGENTS and docs", () => {
    const agents = readProjectFile("AGENTS.md");
    const implementationRules = readProjectFile(
      "docs/agents/04-implementation-rules.md",
    );
    const qualityWorkflow = readProjectFile(
      "docs/agents/05-quality-and-workflow.md",
    );
    const workflow = readProjectFile("docs/workflows/change-workflow.md");

    expect(agents).toContain("React Compiler");
    expect(agents).toContain("useMemo");
    expect(implementationRules).toContain("React Compiler");
    expect(implementationRules).toContain("useCallback");
    expect(qualityWorkflow).toContain("review checklist");
    expect(qualityWorkflow).toContain("useMemo");
    expect(workflow).toContain("manual memoization");
  });
});
