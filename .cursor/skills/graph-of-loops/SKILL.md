---
name: graph-of-loops
description: >
  Full product one-shot as a graph of loops: ask every product and technical
  question first, lock the graph in the plan (users/P0/non-goals, architecture
  shape), then on Build write each loop plan and execute slices with maker +
  independent checker until a stop command holds, boot it, run a queued trial
  log, document after evidence. Do not write loop plan files during Plan mode.
  Finish every approved node and every mapped commit. For long (1–2h+) runs
  when the user names /graph-of-loops. XOR graph-engineering. Not graphify.
  Not Cursor /loop.
disable-model-invocation: true
trigger: /graph-of-loops
argument-hint: "[plan path or leave blank to use the current nawab plan]"
license: MIT
---

# Graph of Loops

This packet **builds the product**. Triggering it means a long run: questions
→ product lock → architecture → parallel build loops → integrate → tests →
**boot** → **queued trials** → docs. Wall clock of **one to two hours or
more** after approval is expected. Stopping at "code written" is failure.

Each **node** is a loop: maker implements, a **different** checker runs a
machine-checkable stop, retry until pass or budget, then escalate.

Nawab §0–§18 is still the scope contract. Use **standard or project**
profile (not lite). The **loop graph** is what you execute.

**XOR with `graph-engineering`.** Both named → stop and ask. Never auto-chain.

**Not Cursor `/loop`.** That is an interval wake. Do not arm timers.

**Not graphify.**

Packet:

| File | Job |
|------|-----|
| [QUESTIONS.md](QUESTIONS.md) | Gate 0 — ask everything; wait |
| [PRODUCT.md](PRODUCT.md) | P0 product lock |
| [DECISIONS.md](DECISIONS.md) | A1 ADRs |
| [CYCLE.md](CYCLE.md) | Stage catalog (R0→D1) |
| [QUALITY.md](QUALITY.md) | Tests, boot, trials, docs-out |
| [EXECUTE.md](EXECUTE.md) | Maker/checker + long-run stamina |
| [LOOP_GRAPH.template.md](LOOP_GRAPH.template.md) | Graph you approve |
| [LOOP.template.md](LOOP.template.md) | One node |
| Topologies | [../graph-engineering/TOPOLOGIES.md](../graph-engineering/TOPOLOGIES.md) |

## Persistence

Stay on this graph for the **whole run** — every wave and inner round,
including resume after a dead session. Ponytail on every product-code write.

Off only: "stop graph of loops" / "run it linearly" / revert to §18.

---

## When to load

**Only** when named: `/graph-of-loops`, `@graph-of-loops`, "graph of loops",
"loop graph", "run this as a graph of loops", or "one-shot this product as
loops".

**Do not load** because Plan mode is on, or because the task is a 1–3 step
hotfix (use ponytail + linear nawab).

Pick **graph-engineering** when slices are known one-shots with no inner
retry. Pick **this** when the run should stay up until gates hold and a
separate checker agrees — typical for **entire products / major features**.

---

## Hierarchy (depth 2)

```text
Plan §19                     ← approved graph (Plan mode: this file only)
LOOP_GRAPH.md                ← execution step 0
  plans/loops/<id>.md        ← execution step 0
  plans/loops/<id>.state.json
docs/PRODUCT.md              ← P0 node, during execution
DECISIONS.md                 ← A1 node, during execution
docs/planning/GATE_0.md      ← execution step 0, from answers already in the plan
docs/planning/R1_BOOT.md
docs/planning/T1_TRIALS.md
PROGRESS.md
```

Do not create this tree during Plan mode. Loop plans do **not** spawn
another graph unless the user names this skill again for that slice.

---

## Cursor primitives

Do not emit JS orchestration or `.claude/workflows/`. Do not use `/loop`
timers.

| Idea | Cursor |
|------|--------|
| Maker | `Task` that implements **one** loop plan (writes allowed) |
| Checker | **Different** `Task`, readonly, runs the stop only |
| Stop | Command or file predicate — "looks good" refuses compile |
| Round | Maker → checker; fail + budget → maker gets **findings only** |
| Budget | `max_rounds` default 3, cap 5 unless user asked |
| State | `plans/loops/<id>.state.json` — resume the node, not wave 0 |
| Fan-out | Independent makers in **one** message (2–4 writers) |
| Model | Maker `inherit` (cheap on extract). Checker `composer-2.5-fast` unless judge |
| Isolation | Disjoint write paths |

Unknown `model` slug → `inherit`. Never guess.

---

## Drafting vs execute

### A. Named, not yet approved

Cursor Plan mode writes **only the plan**. Do not create `LOOP_GRAPH.md`,
`plans/loops/*`, `docs/planning/GATE_0.md`, or other planning files in this
phase. Do not create files just so a markdown link resolves.

1. Research 5–10 lines. Follow [QUESTIONS.md](QUESTIONS.md). **Stop. Wait.**
2. From answers: nawab **standard/project** §0–§18 in that same plan. Record
   Gate 0 answers in the plan, not in a side file.
3. Compile per [CYCLE.md](CYCLE.md) + checklist below **into §19 of the
   plan**, where the user can see it. Include the **mermaid diagram of the
   entire loop graph**, every decided loop, edges, and waves. Name each
   future `plans/loops/<id>.md` and its stop command. Do **not** write those
   loop files yet. Do not leave the diagram for `LOOP_GRAPH.md`.
4. Footer: *Build starts the long run. Step 0 writes `LOOP_GRAPH.md` and
   every loop plan from this §19, then executes product, architecture,
   build, boot, queued trials, and docs-out.*
5. Wait **only** for that approval.

### B. Execution started (Build, or named on an already-approved plan)

**Step 0 — materialize, before any maker:**

1. Write `LOOP_GRAPH.md` from the approved §19.
2. Write `docs/planning/GATE_0.md` from the answers already in the plan.
3. Write every `plans/loops/<id>.md` in full from
   [LOOP.template.md](LOOP.template.md), including a real stop command.
   Copy the T1 trial queue from §19 into the T1 plan. A stub is not a plan.
4. Every path §19 named must exist. Then **run**
   [EXECUTE.md](EXECUTE.md) with no second wait per node. Do not skip a
   non-N/A stage, and do not stop while mapped §9 rows are still uncommitted.

---

## Compile checklist

Gate 0 answers exist. Read [CYCLE.md](CYCLE.md) and topologies.

1. Every cycle stage is a loop (or `N/A — reason`). **P0, A1, E1, R1, T1, D1
   are not optional** for software.
2. Cut fake edges. Independent work is the same wave.
3. Specify each node from [LOOP.template.md](LOOP.template.md) **inside §19**
   (path, stop, write paths, §9 rows). Prose-only stop → refuse that node.
   Write the loop plan file at execution step 0, not during planning.
4. Checker ≠ maker. Default checker `composer-2.5-fast`.
5. `max_rounds` default 3. Escalate rule named.
6. Waves + barrier only when the next node needs the **whole** set.
7. Paste the filled [LOOP_GRAPH.template.md](LOOP_GRAPH.template.md) **into
   the plan's §19**, including its mermaid block. The loop table lists every
   future path. T1's row lists the **trial queue**
   ([QUALITY.md](QUALITY.md)). The diagram and the decided loops are visible
   in the plan. Do not create the loop files.
8. Tiny real chains stay a chain. Do not pad.

Visible **in the plan's §19** (not only in chat, not deferred to
`LOOP_GRAPH.md`): mermaid of the entire loop graph, every decided loop and
its path (not a file yet), lifecycle, waves, per-loop stop + max rounds,
edges cut.

---

## Pairing with nawab-plans

| | Default nawab | This skill |
|--|----------------|------------|
| Profile | lite in Plan mode | **standard or project** |
| What you read while planning | §0–§18 | **§19 in the plan**: full loop graph, mermaid, every loop |
| What you read while executing | §0–§18 | `LOOP_GRAPH.md` + loop plans from step 0 |
| §19 | `N/A` | Required loop graph + a path per loop |
| Approval | then §18 | Build → **write loop plans, then run the long cycle** |
| Extra wait | — | Gate 0, escalate, prod/freeze only |

If §19 already has `EXECUTION_GRAPH.md`, ask which skill wins.

---

## Anti-patterns

- Loading because Plan mode is on, or with graph-engineering
- Using Cursor `/loop` as the inner loop
- Compiling before Gate 0 answers; guessing users or UX
- Writing `LOOP_GRAPH.md`, `plans/loops/*`, or `docs/planning/*` during Cursor Plan mode
- Creating files during planning so a link resolves
- A plan whose §19 has no mermaid of the whole loop graph, or hides decided loops until execution
- Lite nawab for this skill
- Finishing after a fraction of the §9 commits
- Skipping a non-N/A stage (especially R1, T1, D1) because code already exists
- Stop that is not a command or file predicate
- Maker checking its own stop
- Graph that ends at code written (no R1/T1/D1)
- Docs-out before trials
- Restarting wave 0 after a dead session
- Parallel writers on the same files
- Re-asking Gate 0 on resume
- Confusing with `graphify` or `graph-engineering`
