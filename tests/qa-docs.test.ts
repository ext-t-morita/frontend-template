import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("QA documentation", () => {
  it("keeps a QA strategy doc under docs/workflows", () => {
    const docsIndex = readProjectFile("docs/README.md");
    const qaStrategy = readProjectFile("docs/workflows/qa-strategy.md");

    expect(docsIndex).toContain("docs/workflows/qa-strategy.md");
    expect(qaStrategy).toContain("Chromatic");
    expect(qaStrategy).toContain("Storybook");
    expect(qaStrategy).toContain("Playwright");
    expect(qaStrategy).toContain("E2E");
  });

  it("documents that Chromatic is not part of the default QA stack", () => {
    const qaStrategy = readProjectFile("docs/workflows/qa-strategy.md");

    expect(qaStrategy).toContain("Chromatic は標準の QA stack に含めません");
    expect(qaStrategy).toContain("Storybook");
    expect(qaStrategy).toContain("Playwright");
    expect(qaStrategy).toContain("visual regression");
  });

  it("links the QA strategy from workflow and AGENTS entrypoints", () => {
    const workflow = readProjectFile("docs/workflows/change-workflow.md");
    const agents = readProjectFile("AGENTS.md");

    expect(workflow).toContain("qa-strategy.md");
    expect(agents).toContain("qa-strategy.md");
  });
});
