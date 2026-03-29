import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

const primitiveNames = [
  "Badge",
  "Button",
  "Card",
  "EmptyState",
  "IconButton",
  "Input",
  "Label",
  "Separator",
  "Skeleton",
  "StatusPill",
  "SurfaceCard",
  "Textarea",
] as const;

describe("issue #3 foundation UI primitives", () => {
  it("exports all requested primitives from packages/ui", () => {
    const indexFile = readProjectFile("packages/ui/src/index.ts");

    for (const primitiveName of primitiveNames) {
      expect(indexFile).toContain(primitiveName);
    }
  });

  it("ships primitive implementation files under packages/ui", () => {
    for (const primitiveName of primitiveNames) {
      expect(
        existsSync(
          projectPath(`packages/ui/src/components/ui/${primitiveName}.tsx`),
        ),
      ).toBe(true);
    }
  });

  it("adds a CSF Next story for each primitive under stories/ui", () => {
    for (const primitiveName of primitiveNames) {
      const storyPath = projectPath(`stories/ui/${primitiveName}.stories.tsx`);

      expect(existsSync(storyPath)).toBe(true);

      const storySource = readFileSync(storyPath, "utf8");
      expect(storySource).toContain("preview.meta");
      expect(storySource).toContain("meta.story");
    }
  });
});
