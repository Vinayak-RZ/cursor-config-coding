---
name: briefing-and-planning
description: >
  Write a task brief with product context and quality bar before agents plan or
  code. Use for any non-trivial task, when briefing a cloud agent, or when Vinayak
  hands off plan-then-build work.
---

# Briefing and planning

A good brief replaces a page of rules. Poor briefs produce mediocre architecture.

## When required

Same bar as **`think-before-ship`**: non-trivial tasks need a brief **before** plan or code. Trivial: typo, copy fix, dependency bump with no behavior change (state "trivial" in the PR).

## Brief template

Use [templates/thinking/TASK_BRIEF.md](../../../templates/thinking/TASK_BRIEF.md). Minimum sections:

1. **Outcome** (measurable; what changes for users or operators)
2. **User served** (persona from `CONTEXT.md`, or name the stakeholder)
3. **Product links**: paths to `CONTEXT.md`, `FEATURE_MAP.md`, relevant `docs/decisions/ADR-*.md`
4. **Constraints** (latency, safety, compliance, platforms, out-of-scope)
5. **Definition of done** (local checks, verify command, artifacts to attach)
6. **Quality bar** (e.g. `./scripts/check.sh`, ratchet, interrogate on large diffs)
7. **Challenge the premise** (invite the agent: "If this task is wrong, say what to do instead")

Post the brief in the PR description or `plans/<slug>-brief.md`.

## Plan-then-build split

Vinayak's default for non-trivial work:

| Phase | Who | Delivers |
|-------|-----|----------|
| Plan | Stronger / reasoning model | Approved plan file (see below) |
| Build | Cheaper / fast model | Code, tests, verification against the plan |

Human approves the plan before build starts unless Vinayak says "skip approval."

Plan artifact: [templates/plans/IMPLEMENTATION_PLAN.md](../../../templates/plans/IMPLEMENTATION_PLAN.md) saved as `plans/<slug>.md` (or `docs/design-notes/<slug>.md`).

Handoff to builder must include:

- Link to brief + plan paths
- Explicit **in scope** / **out of scope** bullets
- "Do not replan; ask if the plan is wrong"

Full protocol: [docs/PLAN_THEN_BUILD.md](../../../docs/PLAN_THEN_BUILD.md).

## After the brief

1. Strong model runs **`think-before-ship`** (design note, architect, interrogate as needed).
2. Stop for approval.
3. Builder implements, runs `./scripts/check.sh` and verify artifacts from the brief.

## For humans writing briefs

- Name the feature id from `FEATURE_MAP.md` when UI is involved.
- State verification artifacts (screenshots, logs, statechart link).
- One sentence on what **not** to optimize for.
- End with: "Challenge this brief if the premise or scope is wrong."