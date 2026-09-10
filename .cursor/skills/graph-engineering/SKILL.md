---
name: graph-engineering
description: >
  Builds a graph-of-plans for large one-shot work: the graph is the master
  plan you read; each node has its own linked sub-plan; approval of the graph
  writes EXECUTION_GRAPH.md and runs the waves (fan-out, barriers, verifiers)
  immediately. Use for entire projects or major features when the user invokes
  /graph-engineering or says "graph this plan", "graph engineering", "convert
  the plan to a graph", "run this as a graph", or "one-shot this project".
  Do not load while drafting or executing a nawab plan unless the user named
  it. Not graphify (codebase knowledge graphs). Not for 1–3 step real chains.
disable-model-invocation: true
trigger: /graph-engineering
argument-hint: "[plan path or leave blank to use the current nawab plan]"
license: MIT
---

# Graph Engineering

The **graph is the plan you look at**. Nawab §0–§18 still captures scope
(north star, blockers, commit discipline). This skill owns **shape and
scale**: what can run at once, which slice owns which files, and the
per-node plans that execute those slices.

Each **node** is a bounded workstream with **its own plan file**. The master
graph **must list a markdown link to every node plan** so you can open any
slice without hunting.

**Not graphify.** `graphify` maps a codebase. This skill shapes *execution*.

Template: [GRAPH.template.md](GRAPH.template.md)  
Node plan: [NODE.template.md](NODE.template.md)  
Topologies: [TOPOLOGIES.md](TOPOLOGIES.md)

## Persistence

Once loaded, stay on the graph for the **whole run** — every wave, including
resume after a dead session. Do not drift back to one sequential agent holding
the entire project. Ponytail on every code write.

Off only: "stop graph" / "run it linearly" / user reverts to §18.

---

## When to load

Load **only** when the user named this skill. Signals:

- `/graph-engineering` or `@graph-engineering`
- "graph this plan" / "graph engineering" / "run this as a graph"
- "one-shot this project" / "one-shot this feature"

**Do not load** because Plan mode is on or nawab-plans loaded.

**Skip the fleet** (one-node or short chain in §19) when the work is a real
1–3 step dependency. Do not invent nodes or nested plans for a hotfix.

This skill is for **entire projects and major feature additions** — long,
quality-rich, parallel work.

---

## Hierarchy (depth 2, no more)

```text
EXECUTION_GRAPH.md          ← what you approve and read
  plans/nodes/<id>.md     ← one collapsed plan per node (linked from the graph)
```

1. **Graph** — topology, contracts, waves, **links to every node plan**.
2. **Node plan** — feature-mode nawab, collapsed: objective, paths, commits,
   gate, return contract. Not a second 18-section master.
3. **Stop.** A node plan does **not** spawn another graph unless the user
   names this skill again for that slice.

---

## Cursor primitives (not Claude Code)

Do not emit JS orchestration scripts or `.claude/workflows/`.

| Idea | Cursor |
|------|--------|
| Node | One `Task` (or lead job) that **executes that node's plan** against a JSON return contract |
| Node plan | `plans/nodes/<id>.md` — the only authority that node agent loads |
| Edge | Named artifact that actually crosses (schema field, file, list) |
| Fake "and then" | No Task, no wait — two node plans, same wave |
| Fan-out | Multiple `Task`s in **one message**, each prompted with **its** node-plan path |
| Plumbing | Lead code (`flatMap`, dedupe) — no extra node, no extra plan |
| Barrier / merge | Lead waits; one merge node whose plan sees the whole set |
| Verifier | Readonly `Task`s that try to kill findings before they flow on |
| Isolation | Disjoint write paths. Cloud worktrees only if the user asked |
| Cycle | `seen` set; dry stop after **2** empty rounds; dedupe vs **seen** |
| Model | `composer-2.5-fast` on extract/classify; `inherit` on merge/judge |
| Concurrency | Readonly: fan out freely. Writers: **2–4**, disjoint paths |

If a `model` slug is not in the session list, use `inherit`. Never guess.

---

## Two modes

### A. Drafting (skill named, not yet approved)

1. Draft nawab §0–§18 for **scope** (what the project is).
2. Compile the **graph of plans** (checklist below). Write every node plan
   **before** asking for approval so the links work.
3. Put the graph in **§19** and on disk as `EXECUTION_GRAPH.md`.
4. Approval footer: *Approving this graph writes/refreshes `EXECUTION_GRAPH.md` and starts execution immediately. Node plans are already linked.*
5. Stop. Wait only for **that** approval. No per-node wait.

### B. On approval, or skill named on an already-approved plan

1. If the graph or any node plan is missing, compile first.
2. **Run immediately.** Each node Task gets: repo path, node-plan path,
   input artifact, output schema, write paths, **Do NOT commit**.
3. Follow [Execute protocol](#execute-protocol).

---

## Compile checklist

Read [TOPOLOGIES.md](TOPOLOGIES.md) if the shape is not a simple diamond.

1. From nawab §5–§9, list candidate nodes — **one job each**.
2. Cut fake edges: if B does not **read** A's output, they are the same wave.
3. Contract every node (in schema, out schema). Pass inputs explicitly.
4. Mark remaining edges `plumbing` | `agent` | `verify`.
5. Pick topology; emit **waves**. Barrier only when a stage needs the **whole** set.
6. Write `plans/nodes/<id>.md` per node from [NODE.template.md](NODE.template.md).
   Map commits onto the parent §9 matrix; writers must not overlap.
7. Fill [GRAPH.template.md](GRAPH.template.md). **Node plans** table is
   required — every row is a working markdown link.
8. Tiny real chains stay a chain. Do not pad.

Save agents for judgment. Not for plumbing.

## Output contract

Show in chat, not only in files:

1. The mermaid graph
2. The **Node plans** table with clickable links
3. Wave table (counts, where the barrier is)
4. **Edges cut, and why**
5. Model tiers: which nodes run cheap

During a wave: name wave, node ids, model; after: survivors vs dropped.

---

## Execute protocol

If §19 is filled, §18 defers to these waves.

1. Refresh `EXECUTION_GRAPH.md` from §19 (must still contain the node-plan links).
2. Ponytail on every code write.
3. Per wave: spawn independent `Task`s in **one message**. Each prompt
   includes **only** that node's plan path plus its input artifact — not the
   whole master nawab. Null/empty → drop; fan-in tolerates missing inputs.
4. Lead runs `plumbing`. Spawn merge/verify only when judgment is required.
5. Barrier only when the next node needs every prior result together.
6. Conditionals: schema-bounded classify, then `if`/`switch` in the lead.
7. Cycles: persist `seen` (sidecar JSON or in the graph). Stop after 2 dry rounds.
8. **Checkpoints:** after each wave, update `EXECUTION_GRAPH.md` (wave status)
   and `PROGRESS.md`. A later session **resumes at the next pending wave** —
   do not restart the project in one context.
9. Lead owns git, gates, PROGRESS, PR. Subagents do not commit. One §9 row
   per commit. Human checkpoint only if the node plan marks it (prod / freeze).

---

## Pairing with nawab-plans

| | Default nawab | This skill named |
|--|----------------|------------------|
| What you read | Linear §0–§18 | **The graph** + linked node plans |
| §19 | `N/A` | Required: graph + **links to every node plan** |
| Approval | Then implement per §18 | Approve graph → **run** |
| Extra wait | — | **None** per node |

Never auto-chain from nawab-plans. Nawab §0–§18 stay the scope contract.
The graph is the execution program. Node plans are additive files.

---

## Anti-patterns

- Loading this skill because Plan mode is on
- Graph with no working links to node plans
- 18-section nawab **per node** (collapse; depth 2 only)
- Node plan that spawns another graph unasked
- Treating "and then" as an edge when no data crosses
- Spawning an agent to flatten or dedupe
- One Task prompt that pastes every node plan (kills the point of the graph)
- Restarting from wave 0 after a dead session instead of the checkpoint
- Parallel writers on the same files
- Confusing this skill with `graphify`
- Inventing a fleet for a 1–3 step real chain
- Guessing a `model` slug not in the session list
