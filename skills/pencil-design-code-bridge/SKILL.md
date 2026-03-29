---
name: pencil-design-code-bridge
description: Bridge Pencil MCP designs and UI code in both directions. Use only when explicitly invoked via `$pencil-design-code-bridge` or the exact skill name to inspect `.pen` documents, extract layout/tokens/components into implementation code, or reflect code changes back into a Pencil design with verification screenshots.
---

# Pencil Design Code Bridge

Use Pencil MCP as the visual source of truth and repository code as the behavioral source of truth. Change one side at a time and verify before switching.

## Quick Loop

1. Decide the direction: `Design -> Code`, `Code -> Design`, or `Round Trip`.
2. Read only the minimum Pencil context needed before editing.
3. Change one side.
4. Verify immediately:
   - Code side: run the relevant tests or checks.
   - Design side: inspect a fresh Pencil screenshot.
5. Report which source of truth led the task and what was verified.

## Read More Only When Needed

- For concrete Pencil tool selection and call order, read [references/pencil-playbook.md](references/pencil-playbook.md).
- Use that reference when choosing between `batch_get`, `batch_design`, `get_variables`, `snapshot_layout`, screenshots, and export flows.
- Keep names, hierarchy, and tokens aligned between design and code so future round trips stay cheap.
