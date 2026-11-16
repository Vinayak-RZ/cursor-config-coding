---
name: formal-verification-starter
description: >
  When to use TLA+ (TLC) vs Lean 4 vs tests only. Not default. Checklist for
  stateful, concurrent, safety-critical, or small invariant work. Templates local.
---

# Formal verification starter

**Default is tests and `./scripts/check.sh`, not formal methods.**

Use this skill only when the checklist below says yes. Otherwise use tests, pstack **`/statechart`** for review-only flow diagrams, or skip.

## Decision checklist (all must be considered)

Answer each. **Three or more "yes" on the TLA+ row** suggests TLA+. **Lean row** needs a crisp math-like invariant, not UI.

### TLA+ / TLC

| # | Question | Yes / No |
|---|----------|----------|
| 1 | Can two actors interleave (double submit, retry, two devices, two tabs)? | |
| 2 | Is there hidden state (session, lease, lock, queue) that must stay consistent? | |
| 3 | Would a race be expensive (money, safety, data loss, irreversible write)? | |
| 4 | Are unit tests weak on ordering (pass individually, fail in production)? | |

**Use TLA+ when:** at least two "yes" on rows 1 to 3, or row 4 is yes with any of 1 to 3.

**Do not use TLA+ when:** CRUD only, static UI, config change, or behavior is a pure function with no shared mutable state.

### Lean 4

| # | Question | Yes / No |
|---|----------|----------|
| 1 | Is the core a small algorithm (sort, schedule, parse, allocate)? | |
| 2 | Can you state the invariant in one sentence without UI words? | |
| 3 | Is the proof scope under ~200 lines of code? | |

**Use Lean when:** all three yes.

**Do not use Lean when:** the "proof" would be the whole app, IO boundaries, or product rules that change weekly.

### Neither (usual case)

- Straight features, refactors, forms, APIs without concurrency bugs
- Flow review for humans: pstack **`/statechart`** without maintaining TLC on every PR
- Permanent gate on every PR: pstack **`/create-formal-verification-skill`** only after one spec proves value

## When to use what (summary)

| Tool | Use when | Skip when |
|------|----------|-----------|
| **TLA+ / TLC** | Stateful, concurrent, multi-device, safety-critical interleavings | CRUD, static UI, no shared mutable state |
| **Lean 4** | Small algorithm, crisp invariant | UI, IO-heavy code, large surface |
| **Tests + statechart** | Normal flows; reviewers need a path to bad states | Same |

## TLA+ quick start

Templates: [templates/formal/tla/](../../../templates/formal/tla/)

```bash
mise use -g java@temurin-17
java -cp tla2tools.jar tlc2.TLC -config Model.cfg Spec.tla
```

(jar from https://github.com/tlaplus/TLAPlus/releases)

## Lean 4 quick start

Templates: [templates/formal/lean/](../../../templates/formal/lean/)

```bash
curl -sSfL https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh | sh
```

## Repo hygiene

Specs under `formal/`. Optional wire into `./scripts/check.sh` only when stable.

Record checklist answers in the design note or plan when you escalate to formal methods.