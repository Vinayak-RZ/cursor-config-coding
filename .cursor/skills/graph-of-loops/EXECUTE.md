# Execute protocol — graph of loops

If nawab §19 is a loop graph, §18 defers to these waves. Lead owns git,
gates, `LOOP_GRAPH.md` status, `PROGRESS.md`, and PR. Subagents do not
commit. Ponytail on every code write.

Do **not** use Cursor `/loop` timers. Do **not** run graph-engineering’s
one-shot execute protocol on these nodes.

---

## State file

Each node: `plans/loops/<id>.state.json`

```json
{
  "id": "N1",
  "round": 0,
  "max_rounds": 3,
  "status": "pending",
  "last_exit_code": null,
  "findings": [],
  "escalated": false
}
```

`status`: `pending` | `looping` | `passed` | `escalated`.

A later session **resumes that node at `round`**, not wave 0 of the graph.

---

## Per node (inner loop)

1. Read the loop plan. Confirm **Stop** is a command or file predicate.
2. If `state.json` is `passed`, skip. If `escalated`, wait for the human.
3. Set `status` to `looping`. Increment `round` (starts at 1).
4. **Maker** `Task`: repo path, **this** loop-plan path, input artifact,
   write paths, previous `findings` (empty on round 1), **Do NOT commit**.
   Not the whole master nawab.
5. **Checker** `Task` (different spawn, readonly): run the **Stop** command
   (or evaluate the file predicate). Return `{ pass, command, exit_code, findings }`.
   The maker must not be the checker.
6. Persist state. If `pass`: set `passed`. Lead may commit that node’s §9
   rows. Downstream may start.
7. If fail and `round < max_rounds`: next maker round, prompt **only** with
   checker `findings` plus the loop plan. Do not paste the whole graph.
8. If fail and `round >= max_rounds`: set `escalated`. **Stop.** Tell the
   human. Do not start dependents.

Default `max_rounds` is **3**. Do not raise above **5** unless the user asked.

Checker model: `composer-2.5-fast` unless the stop needs a judge (`inherit`).
If the slug is not in the session list, use `inherit`.

---

## Per wave

1. Refresh `LOOP_GRAPH.md` from §19 (must still contain the loop-plan links).
2. Independent nodes: spawn **makers** in one message (cap 2–4 writers).
   After each maker returns, spawn its **checker**. Do not let two makers
   share write paths.
3. A node is done for the wave only when `passed`. Wave `done` when every
   required node passed.
4. Lead runs `plumbing`. Barrier only when the next node needs the whole set.
5. After the wave: update `LOOP_GRAPH.md` (wave + per-node status) and
   `PROGRESS.md`.
6. Conditionals: schema-bounded classify, then `if`/`switch` in the lead.
7. Cycles (unknown-size discovery): persist `seen` as in graph-engineering
   topologies; still wrap each find/verify slice as maker + checker.

---

## Resume

1. Open `LOOP_GRAPH.md`. First wave that is not `done`.
2. For each node `looping` or `pending`, read `state.json`.
3. Continue the inner loop at the next round. Do not restart passed nodes.

---

## Human checkpoints

Wait (do not skip) when:

- A node `escalated`
- The loop plan marks prod / freeze
- Stop cannot be run (missing tool) — that is escalate, not a silent pass
