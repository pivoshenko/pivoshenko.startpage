# CLAUDE.md

Guidance for Claude Code when working in this repository.

`pivoshenko.startpage` is a personal browser startpage deployed to Vercel: one route, one data file,
no backend, no state, no tests. The repository root is a thin wrapper - the app lives in `site/`.

## Rules

**`next.config.ts` deliberately strips `X-Frame-Options`.** The shared base config sets it to `DENY`;
this site filters that one header out so browser new-tab extensions can embed the page in an iframe.
Do not "fix" this back - the comment in the file explains it. Every other security header is
inherited unchanged.

**Never fix `pivoshenko.ui` behavior locally.** Every config file here (`biome.json`, `tsconfig.json`,
`tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`) is a thin wrapper over the shared
package. Change it upstream and bump the pinned tag; only override locally when the divergence is
genuinely specific to the startpage. The dependency is a git ref, so `just update` will not move it -
edit the ref in `site/package.json` and re-run `just install`. For the design tokens and component
API it provides, see `pivoshenko.ui`'s own `CLAUDE.md`.

**The page opens with a `HeroBand`, then `PageBody` wraps the grid.** `main` has no width of its
own, so the card grid needs `PageBody` for its gutter while the band stays full-bleed. The pixel
field behind the band and the footer is one site-level choice - `field="pixels"` on `SiteLayout`
in `layout.tsx`, beside `accent="green"` - never set per component.

**All content lives in `site/lib/links.ts`.** Adding, removing, or reordering links is a data edit
there, never a change to `page.tsx`. The shape is `WorkspaceTab -> Category -> LinkItem`.

**`AGENTS.md` is a symlink to this file.** Never edit it directly.

## Architecture

**The `tabs` layer is vestigial.** `page.tsx` calls `tabs.flatMap((tab) => tab.categories)` and
renders the flattened result into a 3-column grid, so a tab is really just a visual row - hence the
`row-1` / `row-2` names. There is no tab UI. Adding a fourth category to a row pushes it onto the
next grid line rather than creating anything new.

**Categories carry no icon.** The card header is an accent `//` and the category name from
`links.ts`, so a new category needs nothing beyond its data entry.

**Everything visual comes from `pivoshenko.ui`** - React components, the Tailwind preset, the global
stylesheet, and the Next.js metadata/icon/OG-image helpers. This repo owns almost no styling of its
own; match the existing classes in `page.tsx` rather than reaching for raw Tailwind colors.

## Commands

`just --list` for the full set, `just check` is the pre-PR gate; `CONTRIBUTING.md` documents the
rest. Always run `just` from the repository root - every recipe forwards to pnpm with `-C site`, so
running pnpm from the root fails.

The one surprising row: `just format` maps to the site's `check` script, not its `format` script -
`pnpm check` is the one that both formats and applies safe lint fixes.

There are no tests; the `.no-tests` sentinel makes `just test` a deliberate no-op, and if you add
tests, replace the `test` recipe and remove the sentinel in the same change.
