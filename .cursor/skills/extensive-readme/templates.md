# Extensive README — Section templates

Copy and adapt. Skip sections that do not apply. Keep numbering sequential in the
final file. Teaching blocks are not optional when the project has non-obvious ideas.

## Skeleton (section order)

```markdown
# {Project} — {one-line what + for whom}

> {What it is}. {What it is not}. Primary interface: {CLI / API / UI}.

Runtime: {language / deploy target}.

---

## TL;DR

- {Differentiator 1}
- {Differentiator 2}
- …

## Table of contents

- [1. Vision](#1-vision)
- [2. Ideas worth understanding](#2-ideas-worth-understanding)
- [3. Architecture](#3-architecture)
- [4. Quickstart](#4-quickstart)
- [5. Configuration](#5-configuration)
- [6. Directory tree](#6-directory-tree)
- [7. Interfaces](#7-interfaces)
- [8. Data model](#8-data-model)
- [9. Testing](#9-testing)
- [10. Further reading](#10-further-reading)
- [11. Roadmap and changelog](#11-roadmap-and-changelog)
- [12. FAQ](#12-faq)
- [13. Glossary](#13-glossary)

## 1. Vision

### What it is
### What it is not

## 2. Ideas worth understanding

{See teaching block template below. 3–8 ideas.}

## 3. Architecture

Use a mermaid `flowchart TD` or `flowchart LR` here (≤15 nodes).

### 3.1 Concept to implementation map

| Concept | Where it lives | Notes |
|---------|----------------|-------|
| {idea} | `{path}` | {one line} |

## 4. Quickstart

## 5. Configuration

| Variable | Required | Default | What it does |
|----------|----------|---------|--------------|
| `{NAME}` | yes/no | `{value}` | {one line} |

## 6. Directory tree

## 7. Interfaces

## 8. Data model

## 9. Testing

## 10. Further reading

## 11. Roadmap and changelog

## 12. FAQ

## 13. Glossary
```

Renumber if you skip sections. TOC anchors must match headings.

## Teaching block (one idea)

Use this shape for every item in **Ideas worth understanding**:

```markdown
### N.M {Memorable name}

**Constraint.** {What would go wrong, or what the system cannot afford.}

**How it works.** {Mechanism in 3–8 sentences. Name the invariant. Cite `{path}`.}

**Analogy.** {One comparison a newcomer can hold — e.g. "a JIT, but for weights".}

**Limits.** {When it wins, when it loses, what is unproven. Do not oversell.}

**Read next.** [{Title}]({verified-url}) — {why this source}. Optional second link.
```

Good names are ideas, not features: "one hierarchy, not one memory requirement",
not "supports CUDA".

## Further reading section

```markdown
## N. Further reading

Start here if you want the ideas, not the file tree.

| Idea | Canonical source | What you will learn |
|------------------------|---------------------|
| {name} | [{title}]({url}) | {one line} |

Related systems (verified):

- [{project}]({url}) — {what it shares with this repo}
```

Rules for every URL: [further-reading.md](further-reading.md).

## Catalog table (tools / APIs / CLI)

```markdown
### N.M {Category} ({count})

| Name | Auth / gate | What it does |
|------|-------------|--------------|
| `{id}` | {none / role / approval} | {outcome-focused one line} |
```

Show category counts and a verified total.

## Concept → implementation map

```markdown
| Concept | Code | Config | Test |
|---------|------|--------|------|
| {idea name} | `{path}` | `{VAR}` | `{test path}` |
```

## Glossary row

Teach, do not only define:

```markdown
| Term | Meaning in this repo | Why it matters |
|------|----------------------|----------------|
| {term} | {definition tied to this codebase} | {what a reader will misread without this} |
```

## Opening blockquote

```markdown
> **{Project} is {category}.** It is not {nearby-wrong-thing}. The primary
> interface is `{command or URL}`. Optional pieces degrade to {fallback}.
```
