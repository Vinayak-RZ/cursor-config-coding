---
name: formal-verification-starter
description: >-
  When a design has concurrent actors, multiple devices, retries, hidden shared
  state, irreversible writes, or a small algorithm with a crisp invariant, and
  you must choose TLA+ or Lean. Not for CRUD, static UI, config, or ordinary
  features. Default is tests plus a flow diagram, not formal tools.
---

# Formal verification starter

**Default:** tests, `./scripts/check.sh`, and a Mermaid or pstack **`/statechart`** diagram. TLA+ and Lean cost time; use only when the checklist says the bug would be expensive and hard to catch in tests.

## TLA+ (states and interleavings)

Answer yes or no:

1. Can two actors interleave: double submit, retry, two devices, two tabs, bot and human?
2. Hidden state that must stay consistent: session, lease, lock, queue, approval status?
3. Would a race be costly: money, safety, lost data, irreversible write?
4. Tests struggle with ordering: each passes alone, production fails?

**Use TLA+** when at least **two** of 1 to 3 are yes, or **4** is yes with any of 1 to 3.  
**Do not use** for CRUD, static UI, config, or pure functions with no shared mutable state.

## Lean 4

Use only when **all three** are yes: small algorithm core (allocate, schedule, parse, sort); invariant in one sentence without UI words; proof scope under ~200 lines.

**Do not use** when the proof would be the whole app, code is mostly IO, or product rules change weekly.

## Usual case: neither

Statechart for human review; move on. Permanent TLC on every PR only after one spec proved value (pstack **`/create-formal-verification-skill`**).

## If the answer is yes

- Record checklist answers in the design note or plan.
- Model only the risky slice, not the whole product.
- Templates: [templates/formal/](../../../templates/formal/). Cloud agents can run TLC/Lean if Java/Lean are on the VM; otherwise run locally and attach output.
- Deliverable: reachable bad states and shortest paths in plain words for human judgment. Passing TLC covers the model only, not the full product.

## Quick run

TLA+: Java + `tla2tools.jar` (https://github.com/tlaplus/TLAPlus/releases).  
Lean: https://leanprover.github.io/lean4/doc/setup.html via `elan`.