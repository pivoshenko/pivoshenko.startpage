# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal personal startpage (browser start/new-tab page) built with Next.js 16, React 19, Tailwind CSS 3, and JetBrains Mono font. Deployed on Vercel with `@vercel/analytics`.

## Commands

```bash
pnpm dev          # local dev server (Turbopack)
pnpm build        # production build
pnpm lint         # biome lint
pnpm format       # biome format (writes)
pnpm check        # biome check (lint + format + import sort, writes)
```

`just lint` runs `pnpm check && pnpm build` (the full CI-equivalent check).

## Architecture

Single-page app with one route (`app/page.tsx`). No API routes, no database, no auth.

- **`lib/links.ts`** — all quick-link data. `WorkspaceTab[]` → each tab has `Category[]` → each category has `LinkItem[]`. The page flattens tabs and renders categories in a 3-column grid.
- **`app/layout.tsx`** — composes `<PageShell>` from `pivoshenko.ui` with `brand="pivoshenko.startpage"` and external `navLinks`; wires `next/font` JetBrains Mono + `ThemeProvider` + Analytics.
- **`app/page.tsx`** — renders categories inside `<Card>` from `pivoshenko.ui`.
- **`app/globals.css`** — single `@import "pivoshenko.ui/ui/globals.css"`. All design tokens come from the shared package.
- **`app/icon.tsx`** — dynamically generated favicon using Next.js `ImageResponse` with JetBrains Mono fetched from Google Fonts CDN (`runtime = 'edge'`).
- **`components/`** — empty. Footer, Nav, ThemeToggle come from `pivoshenko.ui` (`<PageShell>` wires them up).

Theme switching uses `next-themes` with `attribute="class"` and `darkMode: 'class'` (from the shared Tailwind preset).

## Shared package consumption

This site pins `pivoshenko.ui` via git tag in `package.json`. See parent `me/CLAUDE.md` for the cross-cutting pattern and local-override workflow.

- `biome.json` extends `./node_modules/pivoshenko.ui/config/biome.json`
- `tsconfig.json` extends `pivoshenko.ui/tsconfig.base.json`
- `tailwind.config.ts` uses `pivoshenko.ui/tailwind-preset` + a content glob pointing at the package source
- `next.config.ts` needs `transpilePackages: ['pivoshenko.ui']`
- `postcss.config.mjs` needs `postcss-import` before `tailwindcss` (so `@import "pivoshenko.ui/ui/globals.css"` resolves at build time)

## Code Style

- **Biome** handles linting, formatting, and import sorting (single quotes, no semicolons, trailing commas, 2-space indent, 80-char line width). Rules come from the shared config.
- Path alias: `@/*` maps to project root.
- Server components by default; client components only where needed (theme toggle, etc.) — those live in `pivoshenko.ui`.
