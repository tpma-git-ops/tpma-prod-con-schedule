# Agent instructions (Codex, Claude, Cursor, and other assistants)

This repository defines how all coding agents work here. Follow these rules in every session.

## Planning workflow

1. **When you create a plan** (task breakdown, design notes, step list, or implementation plan for non-trivial work), save it as a **Markdown file** under `plans/backlog/`.
2. **Naming**: `YYYY-MM-DD-short-title.md` (e.g. `2026-04-27-api-schedule-migration.md`). Use a short kebab-case slug. If the same day has multiple plans, add a suffix: `2026-04-27-schedule-tweaks-2.md`.
3. **Contents**: state goal, context, decided approach, open questions, and checkboxes or steps. Keep the file the single source of truth for that plan while it is active.
4. **When the plan is done** (work shipped, superseded, or explicitly cancelled and documented), **move the file** from `plans/backlog/` to `plans/complete/`. Do not delete it unless the user asks; history belongs in `complete/`.
5. If a plan is replaced by a newer doc, move the old file to `plans/complete/` and link from the new backlog file if useful.

## General

- Prefer small, focused changes that match existing project patterns once code exists.
- Do not add secrets or credentials to the repo; use environment variables and local gitignored config per project norms.
