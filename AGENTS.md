# Coding — Agent Mode

Engineering workflow: **ponytail → research → plan → approve → implement → validate → commit → learn**.

## Ponytail — mandatory gate for all coding

**Before writing or modifying any code**, apply [Ponytail](https://github.com/DietrichGebert/ponytail) — the lazy senior dev ladder for minimal, production-grade diffs.

| Layer | What | When |
|-------|------|------|
| Rule | `ponytail.mdc` | Always on — YAGNI, stdlib/native first, shortest working diff |
| Skill | `ponytail` | **Read first** on every coding task (write, fix, refactor, add deps) |
| MCP | `ponytail` / `ponytail_instructions` | Optional reinforcement via `.cursor/mcp.json` |
| Review | `ponytail-review`, `ponytail-audit` | After implementation or on request — hunt over-engineering |

Climb the ladder after you understand the problem: YAGNI → reuse codebase → stdlib → native → installed dep → one line → minimum that works. Never cut validation, security, accessibility, or error handling that prevents data loss.

Intensity: `full` (default). User can say `/ponytail ultra` for stricter YAGNI or `stop ponytail` to disable.

## Before any task

1. Read this file and all `.cursor/rules/` (start with `rule-awareness`, `ponytail`, `core-engineering`, `learn-and-research`).
2. **Coding tasks:** read `ponytail` skill and climb the ladder before proposing or writing code.
3. Follow `planning.mdc` — analyze, plan, **get user approval** before non-trivial coding.
4. Follow `communication.mdc` — surface risks and tradeoffs explicitly.
5. Unfamiliar tech → research brief for the user before architectural choices.

## Architecture (when designing or refactoring)

| Domain | Skill | Rule |
|--------|-------|------|
| Frontend / UI / Next.js | `frontend-architecture` | `frontend-architecture.mdc` |
| Backend / API / data | `backend-architecture` | `backend-architecture.mdc` |
| AI agents / LLM / tools | `agentic-system-design` | `agentic-systems.mdc` |
| Any major trade-off | `system-design-tradeoffs` | `trade-offs.mdc` |

Before large refactors, consider `graphify` on the affected directory.

## Learning & documentation

| Need | Skill / doc |
|------|-------------|
| Learn while building | `learn-while-building` |
| Exhaustive README | `extensive-readme` |
| Workflow guide | [docs/LEARNING_AND_RESEARCH.md](docs/LEARNING_AND_RESEARCH.md) |

End each phase with a short **What you learned** summary. Optional: maintain `LEARNING.md` in the project.

## Git commits and pushes

After each validated phase or meaningful feature:

- **Conventional commit** per `git-commit-discipline.mdc`
- **Push check** after every commit — auto-push when **≥ 10 unpushed** commits, or when user asks

Global rule: `~/.cursor/rules/git-commit-push-global.mdc`

## MCP

Default servers: **agent-patterns** + **ponytail**  
Config: `.cursor/mcp.json` | Guide: [docs/MCP_SETUP.md](docs/MCP_SETUP.md)

| Server | Use when |
|--------|----------|
| **agent-patterns** | Agentic design — `find_pattern`, `recommend_recipe`, `pattern_for_symptom` |
| **ponytail** | Reinforce minimal-code ladder — `ponytail_instructions` (optional; rule + skill are primary) |

First-time ponytail MCP setup: `.\scripts\setup-ponytail-mcp.ps1`

Reload Cursor after changing `mcp.json`.

## During implementation

6. Apply `execution.mdc` — phase-based work only; minimal scope; ponytail ladder on every edit.
7. Stack-specific optional skills: [docs/TECH_STACK_SKILLS.md](docs/TECH_STACK_SKILLS.md).
8. UI polish: `impeccable`. Animation: `gsap-*` skills.
9. Before marking done on non-trivial changes: consider `ponytail-review` on the diff.

## Before completion

10. Apply `quality-gates.mdc` — validate, report, update progress docs, **commit**.

## Pre-installed skills (25)

See [skills-manifest.json](skills-manifest.json) for the full list.

## Linking to a code project

```powershell
.\scripts\link-to-project.ps1 -Target "D:\Startups\Stamped_Energy\Main_Website"
```

## Companion repos

- [cursor-config-buisness](https://github.com/Vinayak-RZ/cursor-config-buisness) — PM/GTM/research
- [cursor-config-design](https://github.com/Vinayak-RZ/cursor-config-design) — decks, video, visual
