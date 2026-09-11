---
name: graph-of-loops
description: >
  Builds a graph of loops for end-to-end one-shots: same lifecycle as
  graph-engineering, but every node is a maker plus an independent checker
  that retry until a machine-checkable stop holds (budget or escalate).
  Use when the user invokes /graph-of-loops or says "graph of loops".
  Mutually exclusive with graph-engineering — never both. Not graphify.
  Not Cursor /loop (interval wake). Do not load unless the user named it.
disable-model-invocation: true
trigger: /graph-of-loops
argument-hint: "[plan path or leave blank to use the current nawab plan]"
license: MIT
---

# Graph of Loops

The **loop graph is the plan you look at**. Nawab §0–§18 still captures
scope. This skill owns **shape and depth**: the same lifecycle DAG as
graph-engineering, but each node is a **loop** (maker → checker → gate)
until a command or file predicate holds.

**XOR with `graph-engineering`.** If the user named both, **stop and ask**
which wins. Do not compile both into §19. Do not auto-chain from nawab-plans.

**Not Cursor `/loop`.** That skill is an interval wake. This skill is
planning-time loops with a named stop. Do not arm timers.

**Not graphify.** `graphify` maps a codebase. This skill shapes *execution*.

Template: [LOOP_GRAPH.template.md](LOOP_GRAPH.template.md)  
Loop plan: [LOOP.template.md](LOOP.template.md)  
Execute: [EXECUTE.md](EXECUTE.md)  
Lifecycle (shared): [../graph-engineering/LIFECYCLE.md](../graph-engineering/LIFECYCLE.md)  
Topologies (shared): [../graph-engineering/TOPOLOGIES.md](../graph-engineering/TOPOLOGIES.md)

## Persistence

Once loaded, stay on the loop graph for the **whole run** — every wave and
every inner round, including resume after a dead session. Ponytail on every
code write.

Off only: "stop graph of loops" / "run it linearly" / user reverts to §18.

---

## When to load

Load **only** when the user named this skill. Signals:

- `/graph-of-loops` or `@graph-of-loops`
- "graph of loops" / "loop graph" / "run this as a graph of loops"

**Do not load** because Plan mode is on, nawab-plans loaded, or
graph-engineering loaded.

**Skip the fleet** when the work is a real 1–3 step dependency. Do not invent
loops for a hotfix.

Pick **graph-engineering** instead when slices are known one-shots (no inner
retry). Pick **this skill** when a slice should not pass until a gate holds
and a **different** agent checks it.

---

## Hierarchy (depth 2, no more)

```text
LOOP_GRAPH.md                 ← what you approve and read
  plans/loops/<id>.md         ← one loop plan per node
  plans/loops/<id>.state.json ← round, gate result, escalate
```

1. **Loop graph** — topology, waves, **links to every loop plan**.
2. **Loop plan** — job, write paths, **stop command**, maker, checker, max
   rounds (default **3**), escalate. Not a second 18-section nawab.
3. **Stop.** A loop plan does **not** spawn another graph unless the user
   names this skill again for that slice.

---

## Cursor primitives

Do not emit JS orchestration scripts. Do not use Cursor `/loop` timers.

| Idea | Cursor |
|------|--------|
| Maker | One `Task` that **implements** the loop plan (writes allowed) |
| Checker | A **different** `Task` that **only** runs the stop and reports pass/fail. Must not be the maker. |
| Stop | A **command** or **file predicate**. "Looks good" is illegal — refuse to compile that node |
| Round | Maker then checker. Fail + rounds left → re-prompt maker with checker findings only |
| Budget | `max_rounds` default 3. Then **escalate** (human). Do not infinite-loop |
| State | `plans/loops/<id>.state.json` — resume the loop, not the whole graph |
| Edge | Named artifact that actually crosses |
| Fan-out | Independent loops in **one message** (makers first, then checkers) |
| Model | Maker `inherit` (or cheap on extract). Checker `composer-2.5-fast` unless the stop needs a judge |
| Isolation | Disjoint write paths. Checkers are readonly |

If a `model` slug is not in the session list, use `inherit`. Never guess.

---

## Gate 0 — Research, then questions (blocking)

Same as graph-engineering. Full rules: [LIFECYCLE.md](../graph-engineering/LIFECYCLE.md).

**Before** nawab §19, loop plans, or approval. Do not compile on guessed
architecture or UX. **Stop. Wait.**

If the user also named `graph-engineering`, ask which skill wins **before**
Gate 0 compile.

---

## End-to-end coverage

Same lifecycle catalog as graph-engineering. A graph that ends at "code
written" is incomplete. Run, trials, docs-out — present or `N/A — [reason]`.

Inner loops do **not** replace T1. T1 is still multiple product trials after
boot. The inner checker only proves **that node's stop**.

---

### A. Drafting (skill named, not yet approved)

1. **Gate 0** — research, then questions. Wait for answers.
2. Draft nawab §0–§18 for **scope**.
3. Compile the **graph of loops** (checklist). Write every loop plan
   **before** approval so the links work. Every loop plan **must** have a
   stop command or file predicate.
4. Put the graph in **§19** and on disk as `LOOP_GRAPH.md`.
5. Approval footer: *Approving this loop graph starts execution immediately. Loop plans are linked. Each node is maker + checker until its stop holds.*
6. Stop. Wait only for **that** approval.

### B. On approval, or skill named on an already-approved plan

1. If the graph or any loop plan is missing, compile first.
2. **Run immediately.** Follow [EXECUTE.md](EXECUTE.md).

---

## Compile checklist

Gate 0 must already be done. Read the shared lifecycle and topologies.

1. Start from the lifecycle catalog. Add/split nodes from nawab §5–§9.
   Mark unused stages `N/A — [reason]`.
2. Cut fake edges: if B does not **read** A's output, they are the same wave.
3. For **every** node: fill [LOOP.template.md](LOOP.template.md). Refuse to
   compile a node whose stop is prose-only.
4. Checker ≠ maker. Default checker model `composer-2.5-fast`.
5. `max_rounds` default 3. Name the escalate rule.
6. Pick topology; emit **waves**. Barrier only when a stage needs the whole set.
7. Fill [LOOP_GRAPH.template.md](LOOP_GRAPH.template.md). **Loop plans**
   table is required — every row is a working markdown link.
8. Tiny real chains stay a chain. Do not pad.

Save agents for judgment. Not for plumbing.

## Output contract

Show in chat, not only in files:

1. The mermaid graph
2. The **Loop plans** table with clickable links
3. Lifecycle table (every stage present or N/A)
4. Wave table
5. Per-loop **stop command**, max rounds, checker model
6. Edges cut, and why

During a loop: name node id, round n/max, maker vs checker. After: `passed`
or `escalated`.

---

## Pairing with nawab-plans

| | Default nawab | This skill named |
|--|----------------|------------------|
| What you read | Linear §0–§18 | **The loop graph** + linked loop plans |
| §19 | `N/A` | Required: loop graph + **links to every loop plan** |
| Approval | Then implement per §18 | Approve loop graph → **run** |
| Extra wait | — | Only on **escalate**, or a loop plan that marks a human checkpoint |

Never auto-chain. Nawab §0–§18 stay the scope contract. The loop graph is
the execution program.

If §19 already has a graph-engineering `EXECUTION_GRAPH.md`, do not add this
skill on top. Ask which wins.

---

## Anti-patterns

- Loading this skill because Plan mode is on
- Loading this skill **and** graph-engineering in one plan
- Using Cursor `/loop` (interval wake) as the inner loop
- Compiling before Gate 0 answers
- Stop condition that is not a command or file predicate
- Maker checking its own stop (checker Task must be a different spawn)
- `max_rounds` missing or > 5 without an explicit user ask
- Graph that ends at "code written" with no run / trials / docs-out
- Graph with no working links to loop plans
- 18-section nawab **per loop**
- Restarting from wave 0 after a dead session instead of loop state
- Parallel writers on the same files
- Confusing this skill with `graphify` or `graph-engineering`
