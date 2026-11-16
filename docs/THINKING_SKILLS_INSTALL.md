# Thinking skills: Cursor local and cloud

Three skills align Grok Bot and Cursor: **`think-before-ship`**, **`briefing-and-planning`**, **`formal-verification-starter`**.

## What cloud agents see

**Cloud agents and PR-only runs use the target repo's `.cursor/` tree.** They do not read your personal `~/.cursor/` skills unless that content is in the repo.

To use this pack on a product repo:

```bash
# From cursor-config-coding root (adjust TARGET)
./scripts/link-to-project.ps1 -Target /path/to/your-app   # Windows habit
# or copy/symlink:
rsync -a .cursor/ /path/to/your-app/.cursor/
rsync -a quality-pack/ /path/to/your-app/quality-pack/
cp scripts/check.sh /path/to/your-app/scripts/
./quality-pack/install.sh /path/to/your-app
```

Commit `.cursor/skills`, rules, and `scripts/check.sh` on the app branch the cloud agent uses.

## What local Cursor sees

- **User level** (`~/.cursor/skills`): optional; good for personal habits.
- **Repo level** (`.cursor/` in the project): preferred so the team and cloud agents share one contract.

Link or copy this config into each repo agents touch.

## pstack (optional)

```
/add-plugin pstack
/setup-pstack
```

Same in cloud agent workspace if the product repo includes [docs/PSTACK.md](PSTACK.md). Skills fall back to Task subagents when pstack is absent.

## Verify install

```bash
./scripts/check.sh
```

No GitHub Actions required. Enable `.github/workflows/quality-pack.yml` later via `QUALITY_PACK_CI_ENABLED`.