---
name: nawab-plans
description: >
  Master execution plans. Cursor Plan mode defaults to the lite profile
  (§0 §1 §9 §16 §18) and writes only that plan file. Standard and project
  profiles add sections. Use when drafting a Cursor plan, orchestrating
  delivery, or turning a vague project into a commit matrix. After Build,
  land every §9 commit; if a graph skill was named, write node plans first,
  then run them. Not graphify. graph-engineering and graph-of-loops are
  opt-in §19 XOR (never both).
argument-hint: "[lite|standard|project] [scope]"
license: MIT
---

# Nawab Plans

One plan is the **execution contract**: what to build, in what order, with what
tests, who does what, when it is done. Portable across stacks — never bake a
named product or customer into the skill; fill §0 from the repo in front of you.

Templates: [PLAN.template.lite.md](PLAN.template.lite.md) · [PLAN.template.md](PLAN.template.md)  
Subagents: [SUBAGENT_ORCHESTRATION.md](SUBAGENT_ORCHESTRATION.md) (project / parallel WS only)

**graph-engineering** and **graph-of-loops** are opt-in, mutually exclusive.
Load only if the user named that skill. If they named both, stop and ask
which wins. graphify is a knowledge-graph CLI — never a substitute for §19.

---

## Profiles (pick one before writing)

Cursor Plan mode **defaults to lite** unless the user says “full nawab”,
“project mode”, or the work is multi-package / platform.

| Profile | When | Required sections |
|---------|------|-------------------|
| **lite** | Most Cursor plans; UI pass; docs; ≤~10 commits | §0 §1 §9 §16 §18 + Open questions |
| **standard** | One-package feature with real deps/tests | lite + §2 §3 §7 §10 §11 |
| **project** | Greenfield platform, multi-repo, or many packages | full §0–§18 (collapse as `N/A — reason`, do not omit headings) |

Hotfix / one-file: skip nawab — ponytail only.

**N/A rule:** only required inside the **chosen profile**. Do not pad lite to 18
sections. Do not delete headings in project profile — write `N/A — [reason]`.

Docs / README work: concept outline (audience + 3–5 nouns) **before** file paths.

---

## §0 fields (all profiles)

Ask **commit budget** before writing §9 if the user did not give a number.

| Field | Notes |
|-------|--------|
| Profile | lite / standard / project |
| Mode | feature / project (nawab mode, not Cursor `isProject`) |
| User commit budget | number or range — **overrides** 7–8 / 18+ defaults |
| Delivery | `cursor-plan` (`.plan.md`) or `repo IMPLEMENTATION_PLAN.md` |
| Supersedes | prior plan name/path or `none` |
| Stack, branch, authority, lead | as today |

If §9 rows > **2×** the commit budget, coalesce **before** asking approval.
Do not ship a second plan whose only job is shrinking the matrix.

---

## §9 — user count first

1. **User-specified count is a hard requirement.**
2. Then work-class defaults: marketing/UI ≈ 7–8; medium feature ≈ 7–10;
   multi-package ≈ 18–30+.
3. One row = one conventional commit. Tests in the same commit when they exist.

Anti-patterns: 500-line plan for 3 doc commits; first draft at 24 rows then a
follow-up plan to make it 8.

---

## §6 Subagents

Lite/standard lead-only: `§6 N/A — lead executes §9 sequentially`.

Full spawn-prompt contract: [SUBAGENT_ORCHESTRATION.md](SUBAGENT_ORCHESTRATION.md)
appendix — **project profile or parallel workstreams only**.

---

## Research before the plan

Load domain skills while researching. Record choices in §11 (standard/project).
Unresolved P0 questions → ask; do not invent architecture in §4.

---

## Optional §19

Exactly one:

| Named | §19 |
|-------|-----|
| nothing | `N/A — graph-engineering / graph-of-loops not requested` |
| `graph-engineering` | Gate 0, then the one-shot graph **inside §19** |
| `graph-of-loops` | Gate 0, then the loop graph **inside §19**; nawab **standard/project** (not lite) |
| both | **illegal** — ask which wins |

§19 **in the plan** is the graph the user sees and approves. Paste the full
shape there, not a summary and not a pointer to a file:

- the **mermaid diagram of the entire** graph-engineering or graph-of-loops structure
- every decided node (id, job, inputs and outputs, gate or stop)
- edges, waves, and lifecycle (or `N/A — reason`)

It also names future paths (`plans/nodes/<id>.md` or `plans/loops/<id>.md`).
Those paths are not files yet. A §19 that omits the mermaid or hides nodes
until execution is incomplete.

---

## Plan mode writes one file

Cursor Plan mode may edit **only the plan**. Do not create, during planning:

- `IMPLEMENTATION_PLAN.md`
- `EXECUTION_GRAPH.md` or `LOOP_GRAPH.md`
- `plans/nodes/*` or `plans/loops/*`
- `docs/planning/*`, `docs/PRODUCT.md`, `DECISIONS.md`, `PROGRESS.md`

Copy `IMPLEMENTATION_PLAN.md` only after Build, and only when Delivery is repo.

---

## Execution after approval

Build starts execution. Follow §18 in the plan. Cursor `todos:` frontmatter
may replace §8; do not maintain two conflicting lists.

**If §19 names a graph, step 0 comes before product code or node tasks:**

1. Write `EXECUTION_GRAPH.md` or `LOOP_GRAPH.md` from the approved §19.
2. Write every node or loop plan in full (objective, paths, commits, gate
   or stop, return contract). A stub is not a plan.
3. Confirm every path §19 named exists. Then run wave 0.

**Completion contract** (linear and graph). The plan is done only when all
of these hold. A partial run is a pause.

1. Every §1 deliverable exists, and its gate was run and passed.
2. Every §9 row is its own commit. Commits from this plan equal the approved
   row count. After each commit, state `k/N`. Four commits on a 20-row
   matrix is a failed run.
3. Coalesce only **before** approval (the 2× rule). After approval, do not
   merge, squash, or drop rows. If a row cannot be done, stop and ask.
4. Every §16 P0 item is checked, with the command that proved it.
5. Subagent output does not replace rows. One blob of work is still split
   into the approved commits.
6. If §19 is a graph, every non-N/A node passed, or escalated and is waiting
   on the user. Do not skip run, trials, or docs-out after they were approved.
7. If you stop early, name the next undone §9 row or node. Do not say the
   plan is complete.
