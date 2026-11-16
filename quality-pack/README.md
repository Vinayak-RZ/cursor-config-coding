# Quality pack

Deterministic checks plus **structure** (Dune-style layout, boundary configs). Copy into app repos with `install.sh`. Validate locally with `./scripts/check.sh` (this template repo) or the copied script in the target repo. **Do not depend on GitHub Actions** for these gates.

## Contents

| Path | Purpose |
|------|---------|
| `eslint/eslint.config.mjs` | Flat config: react-hooks, no-explicit-any, ban-ts-comment, restricted `useEffect` and timers outside `src/lib/effects/` |
| `ruff/ruff.toml.snippet` | Merge into `pyproject.toml` or `ruff.toml` |
| `scripts/quality-ratchet.mjs` | Fails when debt counts rise; can lower baseline when counts fall |
| `scripts/quality_baseline.json` | Example baseline (copy to repo root as `quality_baseline.json`) |
| `scripts/check-justification-comments.mjs` | Rejects workaround/hack/TODO-without-issue comments |
| `dependency-cruiser/dependency-cruiser.config.mjs` | Starter forbidden-import rules (edit for your layers) |
| `import-linter/importlinter.ini.example` | Starter Python package boundaries |
| `docs/error-messages-for-agents.md` | How to write lint errors agents can act on |
| `dune/FEATURE_LAYOUT.md` | Feature-folder layout and boundary rules |
| `hooks/pre-push.sample` | Optional git hook calling `check.sh` |

## Thinking layer (this repo)

Skills (not duplicated here): `think-before-ship`, `product-architecture-context`, `formal-verification-starter`. Install pstack per [docs/PSTACK.md](../docs/PSTACK.md).

## Install

From the target repo root:

```bash
/path/to/cursor-config-coding/quality-pack/install.sh
```

Optional env:

- `QUALITY_PACK_SRC` — path to this folder (default: directory containing `install.sh`)
- `EFFECTS_DIR` — override allowed effects directory (default: `src/lib/effects`)

## ESLint peer dependencies

Add to the target repo (versions are suggestions; match your TypeScript major):

```bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks
```

Point `eslint.config.mjs` at the copied file or re-export it.

## Ruff

Append `ruff/ruff.toml.snippet` into `[tool.ruff.lint]` / `[tool.ruff]` in `pyproject.toml`.

## Ratchet

1. Copy `scripts/quality_baseline.json` to the repo root and run once with `--write-baseline` after measuring current debt.
2. In CI: `node scripts/quality-ratchet.mjs` (no extra binaries; pure Node walk).
3. To record improvement: `node scripts/quality-ratchet.mjs --update`.

## Justification comments

```bash
node scripts/check-justification-comments.mjs
```

Allowed TODO form: `TODO #123` or `TODO: https://github.com/org/repo/issues/123`.

## Error messages

Read [docs/error-messages-for-agents.md](./docs/error-messages-for-agents.md) when adding custom rules or ratchet metrics.