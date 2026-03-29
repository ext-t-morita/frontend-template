# AGENTS.md

## Documentation authority

This file is an agent-facing entrypoint.
The authoritative repository documentation lives under [docs/README.md](./docs/README.md).
If guidance here and guidance under `docs/` differ, treat `docs/` as authoritative unless a task is explicitly agent-only.

## Language policy

- AI-only material should be written in English.
- Material read by both AI and human, or primarily by human, should be written in Japanese.

## Commercial-grade expectation

- For commercial-grade work, think deeply before acting.
- Investigate architecture, tools, sources, and tests before locking in changes.
- Treat a defensible plan as the default.
- Skip the plan only when the task is clearly simple.
- Perform review with the same depth expected for production code.

## Purpose

This repository builds a commercial-grade web application UI with a server-first Next.js architecture.

The source of truth is NOT wireframes.
The source of truth is, in order:

1. Design tokens
2. UI primitives and shared components
3. Storybook stories
4. Playwright tests
5. App pages

Wireframes and mockups are advisory only.

## Operating summary

- Prefer Server Components by default; keep client islands small.
- Never hardcode reusable visual values in pages or app-local code.
- Accessibility is mandatory; prefer Radix primitives when behavior is non-trivial.
- Storybook is the contract for shared components.
- Playwright covers integrated behavior and stable route-level regression.
- Pencil is optional and low-authority.

## Product / UI stack

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- UI primitives: Radix Primitives where behavior/accessibility is non-trivial
- Fast component bootstrap: shadcn/ui
- Component workbench: Storybook
- Story format: CSF Next
- Browser / E2E / screenshot regression: Playwright
- Token source of truth: DTCG-style token JSON
- Forms: React Hook Form + Zod unless there is a strong reason not to
- Tables: TanStack Table unless a page is trivial
- Icons: use the project-standard icon set only

## Tooling rules

- TypeScript files (`*.ts`, `*.tsx`) use Biome for formatting and linting.
- Non-TypeScript project files use Prettier for formatting.
- Next.js and Storybook-specific static checks use ESLint as a separate framework-aware layer.
- Do not run Prettier on TypeScript files unless there is an explicit migration reason.
- Prefer `pnpm` scripts over adding a `Makefile` unless setup spans multiple toolchains or non-Node workflows.
- Use `pnpm install` for normal local setup. Use `pnpm install --frozen-lockfile` for CI or strict reproducibility.
- Before handoff, run `pnpm lint:framework`, `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm typecheck`, and `pnpm build`.
- `pnpm check` does not include `pnpm lint:framework`; run it separately before push or handoff.
- Regenerate token artifacts with `pnpm tokens:build` when token source files change.
- Git hooks are managed by `lefthook`.
- Hook installation should remain on `prepare`; do not introduce `make init` only to wrap existing `pnpm` workflows.
- `pre-commit` must format staged TypeScript files with Biome and staged non-TypeScript files with Prettier.
- `pre-push` must run `pnpm lint:framework`, `pnpm test`, and `pnpm build`, and block pushes on failure.
- Storybook should use `defineMain`, `definePreview`, and `preview.meta -> meta.story` instead of legacy default-export CSF files.
- For ad hoc browser exploration in dev mode, prefer `cdpb` with the `agent-browser` skill over Playwright MCP when possible.
- Use Playwright spec files for durable regression coverage, CI, and reviewable browser behavior contracts.

## Canonical docs

- [Docs Hub](./docs/README.md)
- [Initialize](./docs/initialize/README.md)
- [Migration Plan](./docs/initialize/frontend-template-migration-plan.md)
- [QA Strategy](./docs/workflows/qa-strategy.md)
- [Foundation](./docs/agents/01-foundation.md)
- [Tool Roles](./docs/agents/02-tool-roles.md)
- [Architecture](./docs/agents/03-architecture.md)
- [Implementation Rules](./docs/agents/04-implementation-rules.md)
- [Quality and Workflow](./docs/agents/05-quality-and-workflow.md)
- [Tooling](./docs/agents/06-tooling.md)

## Rule of interpretation

If this file is shorter than the guidance needed for a task, use [docs/README.md](./docs/README.md) as the entrypoint to the authoritative documentation tree.
