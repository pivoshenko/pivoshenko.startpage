# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal personal startpage (browser start/new-tab page) built with Next.js 16, React 19, Tailwind CSS 3, and Geist fonts. Deployed on Vercel with `@vercel/analytics`.

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
- **`lib/palette.ts`** — "morok" colour palette constants (Catppuccin-inspired).
- **`app/globals.css`** — design-token utility classes defined via `@layer components`: typography (`type-heading`, `type-body`, `type-ui`, `type-label`, `type-meta`, `type-logo`), foreground colours (`fg-primary` through `fg-muted`), hover states (`hover-primary`, `hover-secondary`), and borders (`border-ui`, `border-faint`). Use these classes instead of raw Tailwind colour utilities for consistency.
- **`app/icon.tsx`** — dynamically generated favicon using Next.js `ImageResponse` with GeistMono Bold.
- **`components/`** — `Nav` (header + external links to blog/theme/wallpapers), `Footer` (copyright + social icons), `ThemeToggle` (light/dark via `next-themes`).

Theme switching uses `next-themes` with `attribute="class"` and `darkMode: 'class'` in Tailwind config.

## Code Style

- **Biome** handles linting, formatting, and import sorting (single quotes, no semicolons, trailing commas, 2-space indent, 80-char line width).
- Path alias: `@/*` maps to project root.
- Only `Nav` and `ThemeToggle` are client components (`'use client'`); everything else is a server component.
