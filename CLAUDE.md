# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal personal startpage (browser start/new-tab page) built with Next.js 16, React 19, Tailwind CSS 3, and JetBrains Mono font. Deployed on Vercel with `@vercel/analytics`.

The Next.js app lives in `site/`; the repo root holds only `justfile`, `README.md`, `LICENSE`, `CLAUDE.md`, and `.github/`. All `pnpm`/`next` commands run inside `site/`.

## Commands

Run from the repo root via `just` (which proxies into `site/` with `pnpm -C site`):

```bash
just dev          # local dev server (Turbopack)
just build        # production build
just lint         # biome lint
just format       # biome format (writes)
just audit        # pnpm audit (fails on any moderate+ advisory)
just check        # biome check + next build (full CI-equivalent gate)
```

Or directly: `pnpm -C site <script>` / `cd site && pnpm <script>`.

## Architecture

Single-page app with one route (`site/app/page.tsx`). No API routes, no database, no auth.

- **`site/lib/links.ts`** — all quick-link data. `WorkspaceTab[]` → each tab has `Category[]` → each category has `LinkItem[]`. The page flattens tabs and renders categories in a 3-column grid.
- **`site/app/layout.tsx`** — thin wrapper around `<SiteLayout brand="pivoshenko.startpage">` from `pivoshenko.ui/next/site-layout`; metadata via `siteMetadata(...)`, viewport via `siteViewport`. JetBrains Mono, `<html>`/`<body>` scaffolding, and Vercel Analytics are all handled inside the shared layout.
- **`site/app/page.tsx`** — renders categories inside `<Card>` from `pivoshenko.ui`.
- **`site/app/globals.css`** — single `@import "pivoshenko.ui/ui/globals.css"`. All design tokens come from the shared package.
- **`site/app/icon.tsx`** — re-exports the favicon handler from `pivoshenko.ui/next/icon` with locally-declared `size`/`contentType` literals (Next requires route segment exports to be statically parsable).
- **`site/app/opengraph-image.tsx`** — thin wrapper around `createOgImage({brand,title,subtitle,domain})` from `pivoshenko.ui/next/opengraph-image`. Route segment exports (`alt`, `size`, `contentType`, `runtime`) stay literal in the route file. Palette colors come from `pivoshenko.ui/ui/palette.ts` (vendored alongside `tokens.css`); update both together via `just vendor-preset` in `pivoshenko.ui`.
- **`site/components/`** — empty. Footer, Nav, ScrollToTop come from `pivoshenko.ui` (`<PageShell>` wires them up).

Single dark theme (`popil`) — light mode and `next-themes` were removed. Role classes (`bg-bg-canvas`, `text-fg-default`, `text-accent-*`) come from the `pivoshenko.ui/tailwind-preset/site` preset backed by CSS variables in `pivoshenko.ui/ui/tokens.css` (scoped to `:root`).

## Shared package consumption

This site pins `pivoshenko.ui` via git tag in `site/package.json`. See parent `sources/CLAUDE.md` for the cross-cutting pattern and local-override workflow.

- `site/biome.json` extends `./node_modules/pivoshenko.ui/config/biome.json`
- `site/tsconfig.json` extends `pivoshenko.ui/tsconfig.base.json`
- `site/tailwind.config.ts` uses `pivoshenko.ui/tailwind-preset/site` + the `withUiContent()` helper
- `site/next.config.ts` re-exports `baseNextConfig` from `pivoshenko.ui/next/config` (covers `reactStrictMode` + `transpilePackages: ['pivoshenko.ui']`)
- `site/postcss.config.mjs` re-exports `pivoshenko.ui/postcss.config.mjs` (which wires `postcss-import` before `tailwindcss` so `@import "pivoshenko.ui/ui/globals.css"` resolves at build time)
- `site/pnpm-workspace.yaml` carries an `overrides: "postcss@<8.5.10": ">=8.5.10"` pin for GHSA-qx2v-qp2m-jg93 (transitive via `next`). Remove once Next ships a release that bumps the floor itself.

## Deployment

Vercel project `pivoshenko.startpage` (team `pivoshenko`). Production domain `startpage.pivoshenko.dev`; production branch `main`; previews on every other branch. After the `site/` restructure, the Vercel **Root Directory** must be set to `site` — `vercel.json` lives at `site/vercel.json` and assumes it's the project root (`buildCommand: pnpm build`, `outputDirectory: .next`). Node `>=22` is enforced via `site/package.json` `engines`.

## Required env vars

None. `@vercel/analytics` is wired via the Vercel integration. If a future build needs a secret, add it here as: name · purpose · scope (build/runtime) · visibility (`NEXT_PUBLIC_` public vs secret).

## Code Style

- **Biome** handles linting, formatting, and import sorting (single quotes, no semicolons, trailing commas, 2-space indent, 80-char line width). Rules come from the shared config.
- Path alias: `@/*` maps to `site/` (the dir containing `tsconfig.json`), not the repo root.
- Server components by default; client components only where needed (theme toggle, etc.) — those live in `pivoshenko.ui`.
