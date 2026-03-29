import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("issue #7 layout and business page patterns", () => {
  it("exports the layout and business pattern components from packages/ui", () => {
    const indexFile = readProjectFile("packages/ui/src/index.ts");

    expect(indexFile).toContain("PageShell");
    expect(indexFile).toContain("AppHeader");
    expect(indexFile).toContain("SidebarNav");
    expect(indexFile).toContain("TopNav");
    expect(indexFile).toContain("SectionHeader");
    expect(indexFile).toContain("PanelLayout");
    expect(indexFile).toContain("SplitView");
    expect(indexFile).toContain("DetailPane");
    expect(indexFile).toContain("CRUDTablePage");
    expect(indexFile).toContain("EntityDetailHeader");
    expect(indexFile).toContain("ConfirmDestructiveAction");
    expect(indexFile).toContain("InviteUserDialog");
    expect(indexFile).toContain("AuditLogList");
  });

  it("adds pattern stories for the shared page-building blocks", () => {
    const storyPaths = [
      "stories/patterns/CRUDTablePage.stories.tsx",
      "stories/patterns/EntityDetailHeader.stories.tsx",
      "stories/patterns/AuditLogList.stories.tsx",
      "stories/patterns/Dialogs.stories.tsx",
    ] as const;

    for (const storyPath of storyPaths) {
      expect(existsSync(projectPath(storyPath))).toBe(true);
      expect(readProjectFile(storyPath)).toContain("preview.meta");
    }
  });

  it("adds page stories for dashboard, list, detail, and settings compositions", () => {
    const pageStories = [
      "stories/pages/OperationsDashboardPage.stories.tsx",
      "stories/pages/TeamListPage.stories.tsx",
      "stories/pages/TeamDetailPage.stories.tsx",
      "stories/pages/WorkspaceSettingsPage.stories.tsx",
    ] as const;

    for (const storyPath of pageStories) {
      expect(existsSync(projectPath(storyPath))).toBe(true);
      expect(readProjectFile(storyPath)).toContain("preview.meta");
    }
  });
});
