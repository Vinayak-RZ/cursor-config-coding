---
name: product-architecture-context
description: >
  Maintain CONTEXT.md, FEATURE_MAP.md, ADRs, and Dune-style feature folders
  so agents inherit product sense and boundaries. Use when onboarding an agent,
  starting a feature, or restructuring directories.
---

# Product and architecture context

Lint catches slop syntax. **Structure and vocabulary** catch wrong product behavior.

## Files to maintain

| File | Purpose |
|------|---------|
| [templates/context/CONTEXT.md](../../../templates/context/CONTEXT.md) | Domain glossary, users, non-negotiable invariants |
| [templates/context/FEATURE_MAP.md](../../../templates/context/FEATURE_MAP.md) | Named features, routes, selectors, verify commands |
| [templates/decisions/ADR-template.md](../../../templates/decisions/ADR-template.md) | One decision per file under `docs/decisions/` |

Copy templates into the app repo root (or `docs/`) on first use. Link from `AGENTS.md`.

## Dune-style layout (generalized)

See [quality-pack/dune/FEATURE_LAYOUT.md](../../../quality-pack/dune/FEATURE_LAYOUT.md).

Summary:

- **One feature folder** owns ~80% of that feature's code
- **Reserved entrypoint filenames** (`index.ts`, `route.ts`, `*.client.tsx`) over central registries
- **Host vs client** (or server vs UI): enforce with dependency-cruiser / import-linter
- **Framework package never imports app** (`packages/dune` must not import `apps/product/src`)

After layout changes, update `dependency-cruiser.config.mjs` and run `./scripts/check.sh`.

## Error messages

Boundary tools must use [quality-pack/docs/error-messages-for-agents.md](../../../quality-pack/docs/error-messages-for-agents.md) wording: rule id, location, root-cause fix.

## Agent routine

1. Read `CONTEXT.md` at task start.
2. For UI work, read `FEATURE_MAP.md` and run the repo verify command if defined.
3. New cross-cutting decision: add ADR before merge.
4. New feature: add folder first, then code inside it (not new branches in shared roots).