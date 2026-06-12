# Coding — Agent Mode

Engineering workflow: plan → architect (when needed) → approve → implement → validate.

## Before any task

1. Read this file and all `.cursor/rules/` (start with `rule-awareness`, `core-engineering`).
2. Follow `planning.mdc` — analyze, plan, get approval before non-trivial coding.
3. Follow `communication.mdc` — surface risks and tradeoffs explicitly.

## Architecture (when designing or refactoring)

| Domain | Skill | Rule |
|--------|-------|------|
| Frontend / UI / Next.js | `frontend-architecture` | `frontend-architecture.mdc` |
| Backend / API / data | `backend-architecture` | `backend-architecture.mdc` |
| AI agents / LLM / tools | `agentic-system-design` | `agentic-systems.mdc` |
| Any major trade-off | `system-design-tradeoffs` | `trade-offs.mdc` |

Before large refactors, consider `graphify` on the affected directory.

## During implementation

4. Apply `execution.mdc` — phase-based work only; minimal scope.
5. Stack-specific optional skills: [docs/TECH_STACK_SKILLS.md](docs/TECH_STACK_SKILLS.md).
6. UI polish: `impeccable`. Animation: `gsap-*` skills.

## Before completion

7. Apply `quality-gates.mdc` — validate, report, update progress docs if present.

## Pre-installed skills (17)

See [skills-manifest.json](skills-manifest.json) for the full list.

## Linking to a code project

```powershell
.\scripts\link-to-project.ps1 -Target "D:\Startups\Stamped_Energy\Main_Website"
```

## Companion repo

[cursor-config-buisness](https://github.com/Vinayak-RZ/cursor-config-buisness) — PM/GTM/research (separate workspace).
