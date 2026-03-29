import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("issue #5 data table foundation", () => {
  it("declares TanStack Table in packages/ui", () => {
    const packageJson = JSON.parse(
      readProjectFile("packages/ui/package.json"),
    ) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@tanstack/react-table"]).toBeTruthy();
  });

  it("exports the data table foundation from packages/ui", () => {
    const indexFile = readProjectFile("packages/ui/src/index.ts");

    expect(indexFile).toContain("Table");
    expect(indexFile).toContain("DataTable");
    expect(indexFile).toContain("DataTableToolbar");
    expect(indexFile).toContain("DataTablePagination");
    expect(indexFile).toContain("DataTableColumnHeader");
    expect(indexFile).toContain("DataTableEmptyState");
    expect(indexFile).toContain("DataTableLoadingState");
    expect(indexFile).toContain("DataTableErrorState");
  });

  it("adds UI and pattern stories for the table foundation", () => {
    const uiStoryPath = projectPath("stories/ui/DataTable.stories.tsx");
    const patternStoryPath = projectPath(
      "stories/patterns/DataTableFoundation.stories.tsx",
    );

    expect(existsSync(uiStoryPath)).toBe(true);
    expect(existsSync(patternStoryPath)).toBe(true);
    expect(readFileSync(uiStoryPath, "utf8")).toContain("preview.meta");
    expect(readFileSync(patternStoryPath, "utf8")).toContain("preview.meta");
  });
});
