# Coding — Agent Mode

Engineering workflow: plan → approve → implement → validate.

## Before any task

1. Follow `planning.mdc` — analyze, plan, get approval before coding.
2. Follow `communication.mdc` — surface risks and tradeoffs.
3. Follow `documentation.mdc` — keep project docs in sync (when present in the target repo).

## During implementation

4. Apply `execution.mdc` — phase-based work only.
5. For stack-specific work, read [docs/TECH_STACK_SKILLS.md](docs/TECH_STACK_SKILLS.md) and `.cursor/rules/tech-stack-skills.mdc`.

## Before completion

6. Apply `quality-gates.mdc` — validate and report.

## Pre-installed skills

| Skill | When |
|-------|------|
| `nextjs-app-router-patterns` | Next.js App Router projects (only pre-installed stack skill) |
| `graphify` | Map codebase/docs before large refactors |
| `impeccable` | UI polish and design audit |
| `gsap-*` | Animation and scroll (not Framer Motion by default) |
| `find-skills` | Discover more skills |

Stack-specific skills (React, Flutter, Django, etc.) live in the **catalog** — install per project via `scripts/install-catalog-skill.ps1`.

## Linking to a code project

```powershell
.\scripts\link-to-project.ps1 -Target "D:\Startups\Stamped_Energy\Main_Website"
```
