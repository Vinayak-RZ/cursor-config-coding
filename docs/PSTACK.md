# pstack (Lauren Tan / poteto)

Official Cursor plugin: **pstack** in [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack).

## Install in Cursor

In the agent chat:

```
/add-plugin pstack
```

Then run `/setup-pstack` once to choose models.

Claude Code (from plugin README):

```bash
/plugin marketplace add cursor/plugins
/plugin install pstack@cursor-plugins
```

## What we reuse (do not duplicate here)

| pstack skill | Use in Vinayak repos when |
|--------------|---------------------------|
| `/poteto-mode` | Default rigorous entry for non-trivial work |
| `/architect` | Types and module boundaries before code crosses a function wall |
| `/interrogate` | Adversarial multi-model review on a diff or design |
| `/statechart` | User-visible flows modeled in TLA+ plus Mermaid statechart |
| `/reflect` | Capture a recipe after a long task |
| `/correct` | Repeated mistakes become lint/test, not prose |
| `principle-*` | Bundled engineering principles (loaded by poteto-mode) |

This config repo adds **think-before-ship** and **product-architecture-context** skills that call pstack at the right steps. Install pstack in the same Cursor workspace as this rule pack.

## What we do not copy

- Full poteto-mode playbooks (23): install the plugin.
- pstack model routing (`pstack-models.mdc`): use `/setup-pstack`.
- Dune itself (Electron framework in Sand): we adopt the **layout ideas** in `quality-pack/dune/` for general repos.