---
name: briefing-and-planning
description: >-
  When handing work to a cloud agent, executor subagent, or separate build run;
  or starting plan-then-build on anything non-trivial. Writes the 8-part brief
  (outcome, user, context links, constraints, quality bar, done with proof,
  scope, challenge premise). Skips one-line follow-ups to a run already in
  flight. Use before launching Background Agents or Task workers in Cursor.
---

# Briefing and planning

A good brief replaces a page of rules. Weak briefs get mediocre architecture from strong models. Applies to **Cursor cloud agents**, **Task subagents**, and plan-then-build splits in local chat.

Pair with **`think-before-ship`** for design depth on Large work. See [docs/PLAN_THEN_BUILD.md](../../../docs/PLAN_THEN_BUILD.md).

## The brief (first message, this order)

One to two lines each unless Large needs a file (`plans/<slug>-brief.md` or PR body).

1. **Outcome.** What is true when done; how someone notices.
2. **User served.** Who benefits, in their words.
3. **Product context.** Repo paths or URLs: `CONTEXT.md`, `FEATURE_MAP.md`, `docs/decisions/*.md`, nearest similar feature. If missing, say so and ask the agent to record gaps.
4. **Constraints.** Safety, compliance, platforms, must-not-touch, decided facts. Tag **fact** (source) vs **preference**.
5. **Quality bar.** What "good" means beyond compiles; name repo check (e.g. `./scripts/check.sh`).
6. **Definition of done, with proof.** Checks to run and artifacts: test log, screenshots, diff summary, statechart link.
7. **Scope.** In scope, out of scope, one thing **not** to optimize for.
8. **Challenge the premise.** End with: "If this task is wrong or too big, say what to do instead and why."

**Rules:** Symptoms and goals, not commands. Hypotheses are labelled and may be discarded. No secrets in chat; attach files. Separate user quotes from your inference. For another bot: say if it must **act** now or only **know**.

Template file: [templates/thinking/TASK_BRIEF.md](../../../templates/thinking/TASK_BRIEF.md).

## Plan-then-build (non-trivial)

Two runs, not one.

1. **Planning run.** Plan only, no code. Output `plans/<slug>.md` (uses [templates/plans/IMPLEMENTATION_PLAN.md](../../../templates/plans/IMPLEMENTATION_PLAN.md)) with alternatives, choice, risks, steps, verification. Use strongest reasoning model the launcher allows (Cursor Plan mode, or high-reasoning cloud agent).
2. **Approval.** Human approves or says skip approval. Draft is not a go.
3. **Build run.** Give the builder: brief, approved plan path, in/out of scope, **"Do not replan; ask if the plan is wrong."** Faster model is fine.
4. **Follow-ups** on the **same** agent or branch so context persists.

**Skip split:** typo, copy, dependency-only bump, obvious one-file fix. Mark **trivial** in the hand-off.

## Checking what comes back

An agent's success report is a claim. Read the diff, run or read stated checks, compare to definition of done before telling the human it works. Report what **you** saw. No merge, deploy, or external send without human yes.

## After brief (same chat)

Large planning in one chat: run **`think-before-ship`**, then implement after approval.