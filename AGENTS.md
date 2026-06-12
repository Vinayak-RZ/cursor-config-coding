# Coding — Agent Mode

Engineering workflow: **research → plan → approve → implement → validate → commit → learn**.

## Before any task

1. Read this file and all `.cursor/rules/` (start with `rule-awareness`, `core-engineering`, `learn-and-research`).
2. Follow `planning.mdc` — analyze, plan, **get user approval** before non-trivial coding.
3. Follow `communication.mdc` — surface risks and tradeoffs explicitly.
4. Unfamiliar tech → research brief for the user before architectural choices.

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

## Git commits

After each validated phase or meaningful feature: **conventional commit** per `git-commit-discipline.mdc`.

- Agent commits proactively — user does not need to ask
- Agent does **not** push unless user asks

## MCP (live architecture patterns)

Default server: **agent-patterns** → [Agent Patterns Catalog](https://www.agentpatternscatalog.org/)  
Config: `.cursor/mcp.json` | Guide: [docs/MCP_SETUP.md](docs/MCP_SETUP.md)

For agentic design, **query MCP first** (`find_pattern`, `recommend_recipe`, `pattern_for_symptom`) then apply `agentic-system-design` + `system-design-tradeoffs`.

Reload Cursor after changing `mcp.json`.

## During implementation

4. Apply `execution.mdc` — phase-based work only; minimal scope.
5. Stack-specific optional skills: [docs/TECH_STACK_SKILLS.md](docs/TECH_STACK_SKILLS.md).
6. UI polish: `impeccable`. Animation: `gsap-*` skills.

## Before completion

7. Apply `quality-gates.mdc` — validate, report, update progress docs, **commit**.

## Pre-installed skills (19)

See [skills-manifest.json](skills-manifest.json) for the full list.

## Linking to a code project

```powershell
.\scripts\link-to-project.ps1 -Target "D:\Startups\Stamped_Energy\Main_Website"
```

## Companion repos

- [cursor-config-buisness](https://github.com/Vinayak-RZ/cursor-config-buisness) — PM/GTM/research
- [cursor-config-design](https://github.com/Vinayak-RZ/cursor-config-design) — decks, video, visual
