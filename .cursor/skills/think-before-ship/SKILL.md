---
name: think-before-ship
description: >
  Before non-trivial code: product-aware design note, alternatives, adversarial
  review, and user-facing statechart. Requires pstack (/add-plugin pstack).
  Use for features, refactors, bugs that touch architecture, or any task where
  jumping to code would lock the wrong shape.
---

# Think before ship

Agents default to the shortest compiling path. This skill forces senior-engineer thinking **before** implementation.

## When required

Non-trivial if any apply:

- New user-facing flow or change to an existing flow
- New module, package, or cross-layer import
- Behavior that can race, retry, or sit in more than one state
- Touches money, auth, safety, or irreversible writes

Trivial typo or one-line fix: skip, but still read repo `CONTEXT.md` if present.

## Prerequisite

Install **pstack** per [docs/PSTACK.md](../../../docs/PSTACK.md) (`/add-plugin pstack`). Use plugin skills; do not rewrite them here.

## Workflow

### 1. Ground product and architecture

Read (create if missing, from templates):

- `CONTEXT.md` (glossary, users, invariants)
- `FEATURE_MAP.md` for UI work
- Nearest `docs/decisions/*.md` ADR

Trace real code paths; naming files is not grounding.

### 2. Design note (required artifact)

Write `docs/design-notes/<short-name>.md` from [templates/thinking/DESIGN_NOTE.md](../../../templates/thinking/DESIGN_NOTE.md) **or** embed the same sections in the PR description.

Sections (keep each short):

1. Problem and product intent (who, what outcome)
2. Constraints (latency, platforms, compliance, existing invariants)
3. Two to three **distinct** alternatives with tradeoffs (not one option dressed up)
4. Chosen design and why it loses least
5. What could go wrong (failure modes, observability)

For interface shape across modules: run pstack **`/architect`** on the design note before coding.

### 3. Adversarial review

Before implementation (or on the design note if no code yet):

- pstack **`/interrogate`** on the diff or design
- Optionally **`/arena`** when two architectures are still tied

Fix or document only findings a run **proves**. Encode repeats via **`/correct`** (lint/test), not new prose rules.

### 4. User-facing statechart (flows)

If the task changes a multi-step user or device flow:

- Run pstack **`/statechart`** (TLA+ spec + Mermaid + shortest path to broken states)
- Attach the chart to the PR for human review
- For deep formal work, also see skill **`formal-verification-starter`**

### 5. Implement

Follow approved design. Deviations are signal: update the design note or re-run architect.

## Outputs checklist

- [ ] Design note path listed in PR
- [ ] Alternatives section has at least two real options
- [ ] Interrogate (or explicit skip reason) recorded
- [ ] Statechart for flow changes
- [ ] `pnpm` / `./scripts/check.sh` or repo equivalent green locally