# Feature layout (Dune-inspired, repo-agnostic)

From Lauren Tan's **Dune** pattern (Grok Bot / Sand): make the shortcut the right path. Sources: [Dune gist](https://gist.github.com/michaelaflores/5bfed43ea91f89f425be0915c025d2d6), pstack talk on agent-friendly architecture.

## Principles

1. Conventional path needs fewer decisions than a shortcut.
2. Forbidden dependencies fail in tooling (not in review comments).
3. One obvious writer per durable value.
4. New work adds **files in a feature folder**, not branches in shared roots.
5. Exceptions are narrow, documented as ADRs, and wired in linter config.

## Suggested tree (web / TS)

```text
src/
  features/
    <feature-id>/
      index.ts          # public surface of the feature
      ui.tsx            # or route segment co-located
      model.ts          # feature-local state transitions
      api.client.ts     # browser-safe calls only
  server/               # host: actions, data access
  contracts/            # types shared across features (thin)
  lib/
    effects/            # only place for raw useEffect / timers (ESLint)
```

## Suggested tree (Python monolith)

```text
src/
  features/<feature_id>/
  cells/ or domains/    # optional bounded contexts
  contracts/
```

Use **import-linter** for Python package walls; **dependency-cruiser** for TS.

## Rules to encode in tooling

| Rule | enforcement |
|------|-------------|
| `features/*` does not import sibling feature internals | dependency-cruiser `feature-boundary` |
| UI does not import `server/` or `db/` | existing cruiser starters |
| `contracts/` has no imports from `features/` | import direction |
| Framework/shared lib does not import app features | `no-framework-to-app` |

Edit [dependency-cruiser.config.mjs](../dependency-cruiser/dependency-cruiser.config.mjs) after copying.

## Rejected for Vinayak template defaults

- **Ban all comments**: we use justification-comment lint instead (comments allowed when not excusing slop).
- **Ban useEffect everywhere without wrappers**: required for GSAP/Lenis; restrict to `lib/effects/`.
- **Full Dune framework copy**: product-specific; only layout and boundaries are templated here.