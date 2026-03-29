# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm lint         # Biome lint
pnpm format       # Biome format (writes changes)
pnpm check        # Biome lint + format (writes changes)
```

The `justfile` `lint` target runs `pnpm check && pnpm build` — use this to fully validate before committing.

## Architecture

**Tech stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3, Biome (lint/format), next-themes, Lucide React, Vercel Analytics.

**No ESLint or Prettier** — Biome handles all linting and formatting. Config: `biome.json` (no semicolons, single quotes, 80-char line width, 2-space indent).

### Data flow

All link data lives in `lib/links.ts` as a typed structure (`WorkspaceTab → Category → LinkItem[]`). The home page (`app/page.tsx`) renders this data in a responsive 3-column grid. To add/change links, edit only `lib/links.ts`.

### Styling conventions

Global semantic CSS classes are defined in `app/globals.css` under `@layer components`:
- Typography: `type-heading`, `type-body`, `type-ui`, `type-label`, `type-logo`
- Colors: `fg-primary`, `fg-secondary`, `fg-body`, `fg-subtle`, `fg-muted`
- Interaction: `hover-primary`, `hover-secondary`
- Borders: `border-ui`, `border-faint`

Use these semantic classes for consistency; Tailwind utilities are used for layout/spacing only.

### Server vs. client components

Most components are server-rendered by default. Only `components/nav.tsx` and `components/theme-toggle.tsx` are client components (`'use client'`) due to theme interactivity. Keep new components server-side unless they require browser APIs or interactivity.

### Color palette

`lib/palette.ts` defines the Morok color scheme (Catppuccin-style). Reference it for any new themed colors rather than hardcoding hex values.
