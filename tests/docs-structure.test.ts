import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("documentation source of truth", () => {
  it("uses docs/README as the repository documentation hub", () => {
    const docsIndex = readProjectFile("docs/README.md");

    expect(docsIndex).toContain("正本");
    expect(docsIndex).toContain("AGENTS.md");
    expect(docsIndex).toContain("docs/architecture");
    expect(docsIndex).toContain("docs/design-system");
    expect(docsIndex).toContain("docs/workflows");
    expect(docsIndex).toContain("docs/decisions");
    expect(docsIndex).toContain("docs/initialize");
  });

  it("treats AGENTS as an entrypoint to the canonical docs", () => {
    const agents = readProjectFile("AGENTS.md");

    expect(agents).toContain("docs/README.md");
    expect(agents).toContain("entrypoint");
    expect(agents).toContain("authoritative");
  });

  it("points README readers to the canonical docs hub", () => {
    const readme = readProjectFile("README.md");

    expect(readme).toContain("docs/README.md");
    expect(readme).toContain("正本");
  });

  it("includes a pnpm command quick reference in README", () => {
    const readme = readProjectFile("README.md");

    expect(readme).toContain("コマンド早見表");
    expect(readme).toContain("pnpm dev");
    expect(readme).toContain("pnpm lint");
    expect(readme).toContain("pnpm lint:framework");
    expect(readme).toContain("pnpm check");
    expect(readme).toContain("pnpm storybook");
  });

  it("clarifies setup prerequisites and validation command intent in README", () => {
    const readme = readProjectFile("README.md");

    expect(readme).toContain("Node.js 24");
    expect(readme).toContain("corepack enable");
    expect(readme).toContain("pnpm format:check");
    expect(readme).toContain("does not include");
    expect(readme).toContain("pnpm build-storybook");
    expect(readme).toContain("pnpm test:e2e:list");
  });

  it("shows starter users how to begin from docs/initialize", () => {
    const readme = readProjectFile("README.md");

    expect(readme).toContain("Starter の使い始め方");
    expect(readme).toContain("docs/initialize/README.md");
    expect(readme).toContain("technical-baseline.md");
    expect(readme).toContain("product-shape.md");
    expect(readme).toContain("docs/decisions/");
  });

  it("documents audience-based language rules in AGENTS", () => {
    const agents = readProjectFile("AGENTS.md");

    expect(agents).toContain("AI-only");
    expect(agents).toContain("English");
    expect(agents).toContain("human");
    expect(agents).toContain("Japanese");
  });

  it("documents deep-thinking expectations for commercial-grade work in AGENTS", () => {
    const agents = readProjectFile("AGENTS.md");

    expect(agents).toContain("commercial-grade");
    expect(agents).toContain("architecture");
    expect(agents).toContain("tools");
    expect(agents).toContain("sources");
    expect(agents).toContain("tests");
    expect(agents).toContain("plan");
    expect(agents).toContain("review");
  });

  it("treats planning as the default unless the task is clearly simple", () => {
    const agents = readProjectFile("AGENTS.md");

    expect(agents).toContain("plan");
    expect(agents).toContain("default");
    expect(agents).toContain("simple");
  });

  it("links initialize docs and clarifies the check command limits in AGENTS", () => {
    const agents = readProjectFile("AGENTS.md");

    expect(agents).toContain("docs/initialize/README.md");
    expect(agents).toContain("frontend-template-migration-plan.md");
    expect(agents).toContain("pnpm check");
    expect(agents).toContain("does not include");
    expect(agents).toContain("lint:framework");
  });

  it("documents pull request template usage in AGENTS and workflow docs", () => {
    const agents = readProjectFile("AGENTS.md");
    const changeWorkflow = readProjectFile("docs/workflows/change-workflow.md");
    const pullRequestTemplate = readProjectFile(
      ".github/pull_request_template.md",
    );

    expect(agents).toContain("pull_request_template.md");
    expect(agents).toContain("PR");
    expect(changeWorkflow).toContain("pull_request_template.md");
    expect(changeWorkflow).toContain("PR");
    expect(pullRequestTemplate).toContain("## Summary");
    expect(pullRequestTemplate).toContain("## Testing");
  });

  it("documents project initialization decisions before implementation lock-in", () => {
    const initializeIndex = readProjectFile("docs/initialize/README.md");
    const technicalBaseline = readProjectFile(
      "docs/initialize/technical-baseline.md",
    );
    const productShape = readProjectFile("docs/initialize/product-shape.md");

    expect(initializeIndex).toContain("実装を固定する前");
    expect(technicalBaseline).toContain("auth");
    expect(technicalBaseline).toContain("database");
    expect(technicalBaseline).toContain("billing");
    expect(productShape).toContain("single-tenant");
    expect(productShape).toContain("multi-tenant");
  });
});
