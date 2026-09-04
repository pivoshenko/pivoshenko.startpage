# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal personal startpage (browser start/new-tab page): a single static page of curated quick links. Next.js 16 + React 19 + Tailwind 3, deployed to Vercel at `startpage.pivoshenko.dev`.

The Next.js app lives entirely in `site/`. The repo root holds only `justfile`, `README.md`, `LICENSE`, `CLAUDE.md`, `AGENTS.md`, `.editorconfig`, `.no-tests`, and `.github/`. Every `pnpm`/`next` invocation happens inside `site/`.

## Commands

Run from the repo root; `just` proxies into `site/` via `pnpm -C site`:

```bash
just install   # pnpm install
just dev       # next dev --turbopack
just build     # next build
just lint      # biome lint .
just format    # biome format . --write
just check     # biome check . --write, then next build
just audit     # pnpm audit (built-in pnpm command, no package.json script)
just start     # build, then next start
just update    # pnpm update
just test      # sentinel no-op; see below
```

Direct equivalents: `pnpm -C site <script>` or `cd site && pnpm <script>`.

There is no test framework and no dedicated typecheck script; `next build` is the type gate. `just test` succeeds only because the empty `.no-tests` sentinel file exists at the repo root and hard-fails otherwise — if tests are ever added, delete `.no-tests` and replace the `test` recipe.

CI (`.github/workflows/ci.yaml`, Node 24, `ubuntu-24.04-arm`) runs `just install && just lint && just audit && just test && just build`. It runs `lint`, not `check` — `check` also writes formatting and is the stricter local gate. `just audit` runs `pnpm audit` with default settings, so any new advisory anywhere in the dependency tree breaks CI; the usual fix is another entry in `site/pnpm-workspace.yaml` `overrides`.

## Architecture

One route, one data file. No API routes, no database, no auth, no client state.

- `site/lib/links.ts` — all link data and the only file that normally changes. Shape: `WorkspaceTab[]` → `Category[]` → `LinkItem[]`. The "tab" layer is vestigial: `page.tsx` does `tabs.flatMap(tab => tab.categories)`, so tab names (`row-1`, `row-2`) only control ordering within the 3-column grid and are never rendered.
- `site/app/page.tsx` — server component rendering each category as a `<Card>` from `pivoshenko.ui`. `getCategoryIcon()` maps category name → `lucide-react` icon via a hardcoded `switch`; an unmatched name silently falls back to `Link2` with no error, so a typo or a rename degrades quietly instead of failing. The switch is kept in exact sync with the categories in `links.ts` — adding or renaming a category means editing both files.
- `site/app/layout.tsx` — thin wrapper over `SiteLayout` from `pivoshenko.ui/next/site-layout`, plus `siteMetadata(...)` / `siteViewport`. `<html>`/`<body>`, JetBrains Mono, `Nav`/`Footer`, and `@vercel/analytics` all live inside the shared layout; only `<SpeedInsights />` is wired locally through the `afterShell` prop.
- `site/app/icon.tsx`, `site/app/opengraph-image.tsx` — re-export handlers from `pivoshenko.ui`. Their route-segment exports (`size`, `contentType`, `runtime`, `alt`) must stay as local literals; Next parses them statically and cannot follow them through the package.
- `site/app/globals.css` — a single `@import "pivoshenko.ui/ui/globals.css"`.

## The `pivoshenko.ui` Dependency

Nearly all config and every component is inherited from `pivoshenko.ui`, pinned by git tag in `site/package.json` (`github:pivoshenko/pivoshenko.ui#v0.9.3`). Bumping it means changing that tag and re-running `just install`. Do not add local copies of things the package already provides.

| File | Inherits |
| --- | --- |
| `site/biome.json` | `./node_modules/pivoshenko.ui/config/biome.json` |
| `site/tsconfig.json` | `pivoshenko.ui/tsconfig.base.json` |
| `site/tailwind.config.ts` | `pivoshenko.ui/tailwind-preset/site` + `withUiContent()` |
| `site/postcss.config.mjs` | `pivoshenko.ui/postcss.config.mjs` (`postcss-import` runs before `tailwindcss`, so the `globals.css` import resolves at build) |
| `site/next.config.ts` | `baseNextConfig` from `pivoshenko.ui/next/config` |

`next.config.ts` is the one deliberate deviation: it spreads `baseNextConfig` and filters `X-Frame-Options: DENY` out of the shared `headers()`. Custom new-tab extensions embed this site in an iframe, so that header must not be sent. The other shared security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) are inherited unchanged — do not drop them while editing this file.

`site/pnpm-workspace.yaml` carries security `overrides` (`postcss`, `js-yaml`, `sharp`) for advisories reaching the tree transitively. Remove an entry only once upstream floors the version itself.

## Styling

Single dark theme; no light mode, no `next-themes`. Use the semantic role classes rather than raw Tailwind colors:

- Type: `type-heading`, `type-body`, `type-ui`, `type-label`, `type-meta`, `type-logo`
- Foreground: `fg-primary`, `fg-secondary`, `fg-subtle`, `fg-muted`, `fg-body`
- Surfaces/borders: `bg-bg-canvas`, `bg-bg-raised`, `border-ui`, `border-faint`
- Accents: `text-accent-primary`, `accent-success`, `accent-danger`, …

These are `@layer components` classes in `pivoshenko.ui/ui/globals.css`, backed by RGB-triple CSS variables in `pivoshenko.ui/ui/tokens.css` scoped to `:root`. Both are vendored in the package and regenerated there (via `just vendor-preset` in pivoshenko.ui); never edit them from this repo.

## Conventions

- Biome 1.9.4 handles lint, format, and import sorting: single quotes, double-quoted JSX attributes, no semicolons, trailing commas, 2-space indent, 80-char line width. `.editorconfig` says 120, but Biome's 80 wins for TS/TSX.
- Path alias `@/*` resolves to `site/`, not the repo root.
- Server components by default; anything needing `'use client'` lives in `pivoshenko.ui`.
- Node `>=24` enforced via `engines` plus `engine-strict=true` in `site/.npmrc`; package manager is pinned (`pnpm@10.30.3`).
- Conventional commit subjects (`feat:`, `fix:`, `build(deps):`, `docs:`, `ci:`, `chore:`), optionally scoped.
- PRs follow `.github/PULL_REQUEST_TEMPLATE.md` (summary + self-review checklist).

## Deployment

Vercel project `pivoshenko.startpage`, team `pivoshenko`. Vercel's **Root Directory** must be `site` — `site/vercel.json` assumes it is the project root (`buildCommand: pnpm build`, `installCommand: pnpm install --frozen-lockfile`, `outputDirectory: .next`). Production branch `main`; previews on other branches. No environment variables are required; analytics and speed insights come from the Vercel integration.
