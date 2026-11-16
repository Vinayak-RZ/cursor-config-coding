---
name: think-before-ship
description: >-
  When designing, architecting, or building anything consequential (feature,
  module, cross-system change, strategy-shaped doc) before committing to a shape.
  Sizes the ask, writes a design note with real alternatives including a bold one,
  adversarial pass on large work, premise check, statechart for flows. Skips typos
  and one-line edits. Use in Cursor Plan mode, local chat, or before coding in a
  cloud agent run.
---

# Think before ship

Default behaviour is the shortest path that looks done. This skill makes you think like a senior engineer and product owner first. It routes to other skills; it does not replace them.

Load **`briefing-and-planning`** when handing work to another cloud agent or subagent. For work in this chat, brief + design note still apply on **Large** asks.

Optional: pstack per [docs/PSTACK.md](../../../docs/PSTACK.md) (`/add-plugin pstack`). Use `/architect`, `/interrogate`, `/arena`, `/statechart` when available; fallbacks below always work.

## Size the ask first

- **Skip**: typo, copy tweak, lookup, status reply, one-line fix, easy undo in a minute. Do not write a note. Do not mention this skill.
- **Medium**: small feature, doc outline, localized recommendation. Five to ten lines in the reply (sections below), then implement.
- **Large**: new flow, new module, cross-system change, money, safety, auth, customer data, irreversible writes, or others will build from your shape. Write a file under `docs/design-notes/<short-name>.md` (or `plans/<slug>.md`), run adversarial pass, get human **yes** before build unless they said skip approval.

## Design note (Medium and Large)

Keep sections short. Label each claim **fact** (source), **estimate**, or **judgement**. Do not invent numbers, customers, or quotes.

1. **Problem and user.** Who is affected, what must be true when this ships, how we will notice.
2. **Constraints.** Fixed, decided, or out of scope. Read `CONTEXT.md`, `FEATURE_MAP.md`, nearest `docs/decisions/*.md`. Naming a file is not reading it.
3. **Two or three real alternatives**, each with pros, cons, and what it rules out. Different **shape**, not wording. Include one **bold** high-upside option beside a safe one.
4. **Chosen option**, tradeoff accepted, what would change your mind.
5. **Risks and failure modes.** Double submit, offline, partial rollout, wrong data. How it would be noticed.
6. **Premise check.** If the ask is wrong, say so and give the better move before doing the work.

Template: [templates/thinking/DESIGN_NOTE.md](../../../templates/thinking/DESIGN_NOTE.md). Enduring choice: add an ADR (`templates/decisions/ADR-template.md`).

## Adversarial pass (Large only)

Try to break the note before building.

- **Fast path (pstack):** `/interrogate` on the note; `/architect` for interfaces; `/arena` if two options stay tied.
- **Fallback:** Fresh context only (Cursor **Task** subagent, second chat, or cloud agent) with the note and named files. Ask: five likely failures and weakest assumption. Keep findings only if backed by a run, quote, or missing file.
- Fix survivors or record open risks. Do not silently drop findings.

## User flows

Multi-step human or device flow: pstack **`/statechart`**, or Mermaid statechart; find states that should not exist. Escalate to **`formal-verification-starter`** only if its checklist passes.

## Route elsewhere

| Need | Skill |
|------|--------|
| Glossary, feature map, layout | `product-architecture-context` |
| Hand off to cloud agent | `briefing-and-planning` |
| Greenfield spec pack | `speckit`, `nawab-plans` |
| Trade-offs on architecture | `system-design-tradeoffs` |

## Done

- Note at the size the ask required; alternatives are real; adversarial pass ran or skip reason stated.
- Large: human saw the note before build (or recorded "skip approval").
- Build deviations update the note; do not drift silently.
- `./scripts/check.sh` or repo equivalent before claiming done.