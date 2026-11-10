---
name: modern-web-guidance
description: >
  Modern web platform patterns (HTML, CSS, client JS): performance, security,
  and accessibility. Use when building or reviewing web UIs, layouts, forms,
  animations, or browser APIs — prefer native platform APIs over legacy JS
  libraries. Pair with web-design-guidelines for Vercel UI audits; this skill
  covers how to implement features correctly on the platform.
metadata:
  author: GoogleChrome
  version: "router-1.0.0"
  upstream: https://github.com/GoogleChrome/modern-web-guidance
  docs: https://developer.chrome.com/docs/modern-web-guidance
---

# Modern Web Guidance (router)

This config ships a **router only**. Guide content (~250 topics) lives in the
[`modern-web-guidance`](https://www.npmjs.com/package/modern-web-guidance) npm
package — do not copy guides into the repo.

## Install (linked app or global skills)

Upstream recommends one of:

```shell
npx modern-web-guidance@latest install
```

```shell
npx skills add GoogleChrome/modern-web-guidance -y --copy
```

From a project linked to this coding config:

```powershell
.\scripts\install-catalog-skill.ps1 -Package "GoogleChrome/modern-web-guidance"
```

After install, a full `SKILL.md` and local guides may appear under
`.cursor/skills/modern-web-guidance/` in the **app** repo. This distro keeps
only this router so the config stays small.

## Primary workflow (no full install required)

Use the CLI via `npx` (network required on first fetch; runs offline after cache):

1. **Search** — focused 2–5 word query for one capability (omit framework names):

```shell
npx -y modern-web-guidance@latest search "<query>"
```

2. **Retrieve** — one or more guide IDs from search results:

```shell
npx -y modern-web-guidance@latest retrieve "<id>"
```

3. **Implement** using the retrieved patterns; add fallbacks only when the guide
   or the user's browser-support policy requires them.

**Legacy modernization** (broad audit only, not single-feature tasks):

```shell
npx -y modern-web-guidance@latest legacy-scan <path> --json
```

## When to use

- Building or changing: dialogs/popovers, forms, tables, layout, view transitions,
  scroll-driven UI, passkeys, sanitization, CWV (LCP/INP/CLS), dark mode, etc.
- Reviewing client-side code for obsolete patterns before adding dependencies.

**Skip for:** pure backend, infra/CI, test-only churn, or stack config with no
DOM/CSS/API surface.

## Related skills

- `vercel-react-best-practices` — React/Next bundle and RSC performance
- `web-design-guidelines` — Vercel Web Interface Guidelines audit
- `frontend-architecture` — component and data-boundary structure
