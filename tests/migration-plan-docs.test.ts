import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("frontend-template migration plan docs", () => {
  it("keeps a one-page migration plan in docs/initialize", () => {
    const docsIndex = readProjectFile("docs/README.md");
    const plan = readProjectFile(
      "docs/initialize/frontend-template-migration-plan.md",
    );

    expect(docsIndex).toContain("frontend-template-migration-plan.md");
    expect(plan).toContain("移行計画");
    expect(plan).toContain("取り込む価値がある差分だけ");
  });

  it("documents implementation order and explicit non-goals", () => {
    const plan = readProjectFile(
      "docs/initialize/frontend-template-migration-plan.md",
    );

    expect(plan).toContain("Phase 1");
    expect(plan).toContain("Phase 2");
    expect(plan).toContain("Phase 3");
    expect(plan).toContain("取り込まないもの");
    expect(plan).toContain("Chromatic");
    expect(plan).toContain("Auth.js");
  });
});
