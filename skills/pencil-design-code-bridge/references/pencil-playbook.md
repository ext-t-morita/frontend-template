# Pencil Playbook

## Table Of Contents

- Read-first sequence
- Design -> Code
- Code -> Design
- Round-trip verification
- Tool selection rules

## Read-First Sequence

Use this sequence before any Pencil edit:

1. Call `mcp__pencil__get_editor_state` with `include_schema: true` once per turn.
2. If the wrong document is open and the user gave a path, call `mcp__pencil__open_document`.
3. Use `mcp__pencil__batch_get` to inspect the selected node, the target frame, or reusable components.
4. Use `mcp__pencil__get_variables` when color, spacing, typography, or theme tokens matter.
5. Use `mcp__pencil__get_screenshot` before translating a design into code or after changing a design.

Prefer narrow reads over deep full-tree reads.

## Design -> Code

Use this path when a `.pen` design already exists and code must follow it.

1. Identify the exact frame or component to implement.
2. Read structure with `mcp__pencil__batch_get`.
3. Use `mcp__pencil__snapshot_layout` only when layout rectangles, overlap, or clipping matter.
4. Pull reusable tokens from `mcp__pencil__get_variables` instead of guessing values.
5. Inspect repository code before editing and follow existing component, accessibility, and naming patterns.
6. Implement the minimum code that matches the design intent.
7. Run tests or project checks after code changes.

Translate hierarchy, spacing system, and states before chasing absolute pixel fidelity.

## Code -> Design

Use this path when code changed first and the design file must catch up.

1. Read the target nodes before any Pencil write.
2. Prefer `mcp__pencil__batch_design` in small logical batches.
3. Update existing frames or component instances instead of rebuilding unrelated structure.
4. Reuse existing variables and reusable nodes.
5. If repeated token cleanup is needed in a subtree, use `mcp__pencil__replace_all_matching_properties`.
6. After each meaningful visual change, inspect a new screenshot.

Do not write blind. Do not create parallel design-system primitives unless the user asked for them.

## Round-Trip Verification

When both sides move in the same task:

1. Read current Pencil state.
2. Update code or design, but not both at once.
3. Verify immediately.
4. Switch directions only after verification passes.

Use `mcp__pencil__snapshot_layout` with `problemsOnly: true` when you suspect overlap, clipping, or bad constraints.

## Tool Selection Rules

- Prefer `mcp__pencil__batch_get` for discovery.
- Prefer `mcp__pencil__batch_design` for design edits.
- Prefer `mcp__pencil__get_screenshot` for visual verification.
- Use `mcp__pencil__get_variables` before hardcoding tokens.
- Use `mcp__pencil__export_nodes` only when an external asset is actually needed.
- Keep `batch_design` calls small enough that rollback and diagnosis stay cheap.
