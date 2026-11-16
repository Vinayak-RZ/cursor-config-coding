# Plan-then-build

Two-model workflow: **plan with depth, build with speed**.

## Roles

1. **Planner** (stronger reasoning model): reads brief, runs `briefing-and-planning` + `think-before-ship`, writes `plans/<slug>.md`, stops for approval.
2. **Builder** (faster/cheaper model): implements only the approved plan, verifies, opens or updates PR.

Same human can run both phases in different Cursor chats or cloud agent runs.

## File layout

```text
plans/
  <feature-or-fix-slug>-brief.md   # optional if brief lives in PR body
  <feature-or-fix-slug>.md        # approved implementation plan
docs/design-notes/                # alternative: design note doubles as plan
```

Either `plans/<slug>.md` **or** an approved `docs/design-notes/<slug>.md` satisfies the plan artifact.

## When to skip

| OK to skip formal plan | Still required |
|------------------------|----------------|
| Typo, comment, copy | None |
| One-file bug with obvious fix | One-line brief in PR |
| Dependency bump, no API change | "trivial" label in PR |

Everything else: brief + plan before code.

## Approval

Planner sets plan **Status: approved** only after the human owner replies. Builder must not start if status is draft.

## Cloud agents

Brief in the kickoff message. Attach plan file path in the build job. Builder PR must link both.