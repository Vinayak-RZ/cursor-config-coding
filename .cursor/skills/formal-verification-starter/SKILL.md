---
name: formal-verification-starter
description: >
  When to use TLA+ (TLC) vs Lean 4 vs tests only. Templates and local run
  commands. For full automation use pstack /create-formal-verification-skill.
---

# Formal verification starter

Formal methods are expensive. Use them only where bugs are costly and tests are weak on **ordering and concurrency**.

## When to use what

| Tool | Use when | Skip when |
|------|----------|-----------|
| **TLA+ / TLC** | Concurrent writers, retries, session state, protocol handshakes, "what if two requests interleave" | Straight CRUD, pure functions, static UI |
| **Lean 4** | Small algorithm with a crisp invariant (sort, scheduler slice, parser) | Large surface area, UI, IO-heavy code |
| **Tests + statechart** | User-visible flow with few states | Same, but you need shortest path to a bad state for reviewers |

pstack **`/statechart`** covers many flow reviews without owning a permanent TLA+ suite. pstack **`/create-formal-verification-skill`** when the property must run on every PR in one repo.

## TLA+ quick start

Templates: [templates/formal/tla/](../../../templates/formal/tla/)

Install (local):

```bash
# Example: mise manages Java + tlaplus (same idea as pstack statechart skill)
mise use -g java@temurin-17
# Download tla2tools.jar from https://github.com/tlaplus/TLAPlus/releases
java -cp tla2tools.jar tlc2.TLC -config Model.cfg Spec.tla
```

Workflow:

1. Name variables for **user-visible** or **protocol** state, not implementation detail.
2. Write invariants for rules product owners agree to.
3. Run TLC; any counterexample becomes a test or a code fix.
4. Optional: pstack **`/statechart`** to publish Mermaid for non-formal readers.

## Lean 4 quick start

Templates: [templates/formal/lean/](../../../templates/formal/lean/)

Install:

```bash
curl -sSfL https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh | sh
elan default stable
```

Workflow:

1. State theorem or invariant in plain language first.
2. Prove on a **small model** of the data (not the whole app).
3. Keep proofs beside the algorithm they guard; do not prove UI.

## Repo hygiene

- Store specs under `formal/` or `docs/formal/`
- One README per spec: what it proves, how to run, last TLC/Lean version
- Failing model check blocks merge locally via `./scripts/check.sh` only if you wire it (optional script hook)

## Thin rule

Do not mandate formal methods repo-wide. Mandate **think-before-ship** for non-trivial work; escalate here when the design note lists concurrency or invariant risk.