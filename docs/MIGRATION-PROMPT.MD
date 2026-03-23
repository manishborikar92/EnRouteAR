# EnRouteAR — Next.js Migration & Documentation

## Scaffolded Setup

The `web/` directory already exists via `create-next-app`:

- **Language:** JavaScript (no TypeScript)
- **Linter:** ESLint
- **Styling:** Tailwind CSS v4
- **Structure:** `src/` directory enabled → `web/src/app/`
- **Router:** App Router → import alias `@/*` maps to `web/src/`
- **Installed:** `next` · `react` · `react-dom` · `tailwindcss` ·
  `@tailwindcss/postcss` · `eslint` · `eslint-config-next`

Do not re-scaffold. Do not add TypeScript. Do not create a `styles/`
directory — `web/src/app/globals.css` is the sole Tailwind entry point.

---

## Your Task

### 1 — Audit the existing codebase
Read everything outside `web/`. Identify the tech stack, all pages and
components, data-fetching patterns, third-party integrations, and any
tech debt. Do not proceed until this is complete.

### 2 — Decide the target stack
Based on what you found, select the best current packages for: UI
components, state management, server state, forms, animation, icons,
date handling, testing, and linting/formatting. For each, briefly state
what you chose and why. Use only packages compatible with Next.js and
the App Router.

### 3 — Define the architecture
Before writing code, define: the `web/src/` folder structure (justified),
rendering strategy per route (SSG / SSR / ISR / CSR), Server vs. Client
Component policy, and all required environment variables.

### 4 — Migrate
Move the existing project into `web/src/` route by route, starting with
the lowest-risk pages. Each route gets `page.js`, `loading.js`, and
`error.js`. Apply Server Components by default; add `"use client"` only
when genuinely required. Use `next/image` for all images.

### 5 — Implement SEO
Use the Next.js Metadata API (`metadata` export for static routes,
`generateMetadata()` for dynamic). Add `sitemap.js`, `robots.js`, and a
reusable `JsonLd.js` Server Component with the appropriate Schema.org
types. Ensure every page meets LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

### 6 — Write documentation
Create the following files in `docs/`. Every filename must be uppercase
and hyphenated. Every file must reflect the actual project — no generic
filler.

| File | Contents |
|------|----------|
| `docs/PROJECT-OVERVIEW.md` | What this project is · local setup · links to all other docs |
| `docs/ARCHITECTURE.md` | Folder structure · rendering strategy · data flow · SEO approach · CWV targets · Server vs. Client Component policy |
| `docs/TECH-STACK.md` | Every package decision with justification |
| `docs/MIGRATION-PLAN.md` | What was migrated, how, and in what order |
| `docs/ENVIRONMENT-VARS.md` | Every `.env` variable · scope · purpose · example value |
| `docs/CONTRIBUTING.md` | Branches · commits · PR process · running tests |

---

## Rules

- Audit first. Every decision must follow from what you actually find.
- App Router and `src/` layout are non-negotiable.
- Always use `@/` imports. No deep relative paths.
- `globals.css` uses `@import "tailwindcss"` — no v3 directives.
- No `<img>` tags. No placeholder content in docs.
- Follow the latest Next.js and React best practices throughout.