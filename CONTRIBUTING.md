# Contributing to the Toronto Product Con schedule

Thanks for donating your time to the **[Toronto Product Management Association (TPMA)](https://www.tpma.ca/)** and this codebase. Whether you ship a one-line fix or a larger feature, you are welcome.

## Code of Conduct

Everyone participating—issues, discussions, reviews, chat—is expected to follow our **[Code of Conduct](CODE_OF_CONDUCT.md)**. If you see behaviour that violates it, please report it (contact options are listed in that document).

## Getting started

1. Read **`README.md`** until you have the app running locally (`npm install`, Supabase schema + seed, `.env.local`).
2. Browse **`docs/tpc2026-design-system.md`** before sizeable UI changes.
3. For non-trivial or cross-cutting work, check **`plans/backlog/`** and **`plans/complete/`** so we do not duplicate effort.

## How to contribute

### Issues

- **Bug** — use the **Bug report** template when something is wrong and you can describe how to reproduce it.
- **Idea / feature** — use the **Feature request** template so we can align on scope before you invest a lot of time.
- **Question** — open an issue with a clear title; say what you already tried (commands, errors, env).

If you are not sure, open an issue anyway—small questions are fine.

### Pull requests

1. **Fork** the repository and create a **branch** from `main` (or the default branch), e.g. `fix/room-filter-a11y` or `feat/session-export`.
2. **Keep PRs small** when possible—one logical change is easier to review than a mixed refactor.
3. **Match existing style** in the files you touch: imports, component patterns, Tailwind usage, formatting.
4. **Do not commit secrets.** Use `.env.local` locally only; production uses Vercel (or hosting) env configuration.
5. Fill out the **PR template** (summary, test plan).

Before opening a PR, run **`npm run lint`** and **`npm run build`** if your changes could affect compilation. For UI changes, add a brief note or screenshot in the PR when it helps reviewers.

### Planning docs (agents and humans)

Larger designs or multi-step work may use Markdown plans under **`plans/backlog/`** (see **`AGENTS.md`**). When work is done or superseded, plans move to **`plans/complete/`**. You do not have to use this workflow for tiny fixes—but for anything that spans several PRs or needs discussion, consider adding a short plan first.

### Commit messages

Write messages that explain **why**, not only **what**. One line is fine; optional body for tricky changes. Imperative mood is conventional (`Fix room tab focus order` rather than `Fixed`).

## Security

Reporting paths and expectations are in **`SECURITY.md`** (GitHub’s **Security** tab uses this when present).

Thank you again for helping attendees and organisers get value from this app.
