---
name: graph-engineering
description: >
  Compiles a nawab plan into an execution graph (real edges only, fan-out,
  contracts, verifiers, cycles) and embeds it as §19 in the plan. On nawab
  plan approval, writes EXECUTION_GRAPH.md and runs the graph immediately.
  Use only when the user names this skill, says "graph this plan", "convert
  the plan to a graph", "graph engineering", or invokes /graph-engineering.
  Do not use when drafting or executing nawab-plans unless the user named
  this skill. Not graphify (codebase knowledge graphs).
disable-model-invocation: true
trigger: /graph-engineering
argument-hint: "[plan path or leave blank to use the current nawab plan]"
---

# Graph Engineering

Turns a nawab plan into a **graph of work**: nodes with contracts, edges that
carry data, parallel where there is no dependency. Nawab still owns *what*
to build (§0–§18, commit matrix, gates). This skill owns *shape* — what can
run at once, what must wait, what is plumbing.

**Not graphify.** `graphify` maps a codebase into a knowledge graph. This
skill shapes *agent execution*.

Template: [GRAPH.template.md](GRAPH.template.md)  
Topologies: [TOPOLOGIES.md](TOPOLOGIES.md)

---

## When to load

Load **only** when the user named this skill. Signals:

- `/graph-engineering` or `@graph-engineering`
- "graph this plan" / "convert the plan to a graph" / "graph engineering"

**Do not load** because Plan mode is on, because nawab-plans loaded, or
because the task is multi-step. Nawab-plans is always-on. This skill is not.

Tiny 1–3 step plans that are a real chain: fill §19 as a one-node or short
chain. Do not invent fake fan-out.

---

## Cursor primitives (not Claude Code)

The source ideas (`agent()`, `parallel()`, `pipeline()`) are Claude Code.
This config runs in **Cursor**. Map them as follows — do not emit JS
orchestration scripts or `.claude/workflows/`.

| Idea | Cursor |
|------|--------|
| Node | One `Task` subagent, or one bounded lead-agent job, with a JSON return contract |
| Edge | A named artifact that actually crosses (JSON field, file, list) |
| Fake "and then" | No Task, no wait |
| Fan-out | Multiple `Task` calls in **one message** |
| Plumbing / reduce | Lead agent code (`flatMap`, dedupe, filter) — no extra subagent |
| Barrier / diamond merge | Lead waits for the wave, then one merge node |
| Pipeline | One subagent **per item** that runs **all** of that item's stages. Do not barrier between extract and transform unless the next stage needs the whole set |
| Conditional | `if` / `switch` on validated JSON from a classifier node |
| Verifier | Extra readonly `Task`s that try to kill findings before they pass downstream |
| Isolation | Nawab file-ownership (one writer per path). Cloud worktrees only if the user asked |
| Cycle | Lead `while` with a **seen** set — dedupe against everything seen, not only confirmed |
| Model tier | `Task` `model`: cheap on extract/classify (`composer-2.5-fast`); `inherit` on merge/judge |

---

## Two modes

### A. Plan not yet approved (skill named while drafting)

1. Draft nawab §0–§18 as usual (`nawab-plans` + `PLAN.template.md`).
2. Compile the graph into **§19**. Do not skip showing it in the plan.
3. Follow [Compile checklist](#compile-checklist).
4. Approval footer **must** say: approving this plan writes `EXECUTION_GRAPH.md` and **starts graph execution immediately**.
5. Stop. Wait only for **nawab plan** approval. No second graph wait.

### B. On nawab approval, or skill named against an already-approved plan

1. If §19 is missing, compile it into the plan first (same checklist).
2. Write `EXECUTION_GRAPH.md` beside the plan from §19 — materialize, do not re-invent.
3. **Run immediately.** No second confirmation.
4. Follow [Execute protocol](#execute-protocol).

---

## Compile checklist

Read [TOPOLOGIES.md](TOPOLOGIES.md) if the shape is not a simple diamond.

1. Load the source plan: §5 workstreams, §6 spawn map, §7 phases, §9 commit matrix.
2. List candidate nodes — **one job each**.
3. For every "and then": does the next step **read** the previous output? If not, **cut the edge**. Independence is fan-out.
4. Give every node an input schema and an output schema. Pass inputs explicitly. Never assume a shared window.
5. Name every remaining edge by **data**, not order. Mark kind:
   - `plumbing` — flatten, dedupe, filter (lead code, zero tokens)
   - `agent` — judgment / synthesis
   - `verify` — adversarial or lens check before the result may flow downstream
6. Pick topology per cluster (chain only if the next node truly consumes the last). Default to per-item pipeline. Reach for a barrier only when a stage needs the **whole** set.
7. Emit **waves**: independent nodes in the same wave = one-message Task fan-out.
8. Map nodes onto §9 commit rows and write paths. Parallel writers must not overlap. Sequence overlapping paths.
9. Fill nawab **§19** using [GRAPH.template.md](GRAPH.template.md). Tiny real chains stay a chain — do not pad.

Save agents for judgment. Not for plumbing.

---

## Execute protocol

Runs **only** after nawab-plan approval (or when this skill is named on an already-approved plan). If §19 is filled, §18 defers to these waves.

1. Write `EXECUTION_GRAPH.md` from §19 (same template). Put it next to `IMPLEMENTATION_PLAN.md` or at the project root.
2. Ponytail on every code write.
3. For each wave: spawn independent `Task`s in **one message**. Treat thrown/empty returns as null; drop them. Fan-in must tolerate a missing input.
4. Lead runs `plumbing` edges in process. Spawn a merge/verifier `Task` only when the contract needs judgment.
5. Barrier only when the next node needs every prior result together (cross-set dedupe, rank-all, compare-one-against-all).
6. Conditionals: classify with a schema-bounded node, then branch in code. Do not let a subagent skip a path that the graph did not write.
7. Cycles: persist `seen` (file or in-plan set). Stop after **2** consecutive dry rounds (nothing new vs `seen`). Dedupe against **seen**, not only confirmed.
8. Lead owns git commits, gates, PROGRESS, PR. Subagents do not commit. One §9 row per commit.

---

## Pairing with nawab-plans

| | Default nawab | This skill named |
|--|----------------|------------------|
| §19 | `N/A — graph-engineering not requested` | Required, filled |
| Approval | Approve → then implement per §18 | Approve → write `EXECUTION_GRAPH.md` **and run** |
| Extra wait | None beyond nawab | **None** — no second graph approval |

Never auto-chain this skill from nawab-plans. Nawab §0–§18 and the commit matrix stay the source of *what*. §19 is additive.

---

## Anti-patterns

- Loading this skill because Plan mode is on
- Treating "and then" as an edge when no data crosses
- Spawning an agent to flatten or dedupe
- Barrier between stages that have no cross-item dependency
- Dedupe in a cycle against confirmed only (rejected findings return forever)
- Parallel `generalPurpose` writers on the same files
- Claude Code `parallel()` / `agent()` scripts as if they exist here
- Confusing this skill with `graphify`
- Inventing fan-out for a 1–3 step real chain
