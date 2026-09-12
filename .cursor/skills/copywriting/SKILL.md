---
name: copywriting
description: >-
  Writes and audits public copy others will see: product READMEs, landing pages,
  headlines, CTAs, marketing pages, and other shipped prose. Use when the user
  asks for copy, copywriting, headlines, CTAs, taglines, hero copy, punchier
  README prose, marketing copy, or to make public text convert or read human.
  Loads anti-slop.md. Never invents proof. For GitHub READMEs, structure still
  comes from product-readme / readable-readme / extensive-readme.
---

# Copywriting

Write public copy that a stranger gets in two seconds, believes, and can act on.
This skill supplies **sentences**. README skills still own **structure**.

Compiled from: your business-config `direct-response-copy-engine` (Schwartz,
Masterson, Dry); Corey Haines conversion copy (clarity, one CTA, customer
language); Wikipedia [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) via [../readme/anti-slop.md](../readme/anti-slop.md).
Fifty frameworks stay out. A GitHub README is not a sales letter.

**Load before drafting:** [../readme/anti-slop.md](../readme/anti-slop.md) and
[scorecard.md](scorecard.md).

## When to apply

- Marketing: landing, homepage, ads, captions, CTAs, headlines, value lines
- Product: README pitch, first screen, technique blurbs, "why it exists"
- Audit: "this copy is weak", "make this human", "punch this up"

**Not this skill**

| Want | Use |
|------|-----|
| README section order, proof command, file maps | `product-readme` / `readable-readme` / `extensive-readme` |
| Long-form ads, video hooks, 2026 feed playbooks | Business repo: `direct-response-copy-engine` |
| Category / JTBD / positioning workshop | Business repo: `positioning-ideas`, `value-proposition` |
| Internal architecture prose with no reader | Skip. Write the fact. |

If positioning is mushy, say so in one line and write the smallest true claim.
Do not invent a category.

## Hard lines

- **One idea, one reader, one promise, one action.** Extra benefits get cut or demoted.
- **Channel desire.** Start at the want they already have, not the product.
- **Never invent proof.** Numbers, customers, benches, "trusted by" come from the tree or the user. Missing proof → smaller true claim.
- **Concrete, falsifiable, nobody else.** Harry Dry's three tests on every important line. See [scorecard.md](scorecard.md).
- **Two seconds.** If it needs a decoder, rewrite.
- **Anti-slop pass.** LLM cadence is a ship blocker. Earned contrast (two checkable facts) is allowed. Empty upgrade ("it's not a tool, it's a revolution") is not.

## Surfaces

### README (default when a README skill is also loaded)

GitHub reader is **solution-aware / product-aware**. Lead with what it is and
how to prove it. Do **not** PAS-agitate ("tired of buggy circuits?") into a
sales letter.

- Structure: the loaded README skill (first screen, techniques + limits, install).
- Copy job: make the pitch, invariant, and technique lines pass the scorecard.
- Action: the proof command or install. Not "Get Started" with nothing behind it.
- Nearby-wrong: one factual neighbor, once. Insider codenames only if the README
  already names them; otherwise name the category ("not a general coding agent
  that also does circuits").

### Marketing page / landing

One message, one CTA. Match the lead to awareness (below). Headline = the one
idea. Subhead adds the mechanism or the proof. CTA = verb + what they get.

### Ads, captions, hooks

First line earns the next moment. No windup. Point at a fact.

## Intake (do not skip)

Pull from the repo first. Ask only for gaps. Never fill a gap with a guess.

1. **Surface:** README, landing, ad, caption, other
2. **One reader:** one face, one situation
3. **Want they already have:** finish: "They already want ____. They do not believe ____ can get them there."
4. **Offer:** what it is, in one or two plain sentences
5. **Real proof:** commands, numbers, gold tests, named limits. Mark missing.
6. **Awareness:** unaware / problem-aware / solution-aware / product-aware / most-aware
7. **Sophistication:** have they heard this claim to death? If yes, lead with the how, not the promise.
8. **One action:** the next step

Thin proof means a quieter claim. It does not mean a louder adjective.

## Generate

1. Lock the **one idea**. It must be easy to understand, easy to believe, and something a competitor cannot sign. Fail any check → work the idea, not the adjectives.
2. Pick the **lead** (Masterson):
   - Warm (product/most-aware): Promise or Offer
   - Cold (unaware/problem-aware): Problem-solution, story, or a checkable proclamation
   - GitHub README: Promise + Offer (what it is, then the proof command)
3. Write the **hook** (headline / first paragraph). Run Dry's tests.
4. Write the **body**. Each section proves the one idea. Features become: mechanism → what changes for the reader → limit or proof.
5. **One ask.**
6. Run [scorecard.md](scorecard.md) and the anti-slop **Pass**. Rewrite until both are clean.

Headline formulas that are allowed because they stay specific:

- `{outcome} without {named pain}`
- `The {category} for {named reader}`
- `{checkable fact}` (Volvo-style pointing)

Headline formulas that are slop unless the blanks are facts: "Unlock the power of", "The future of", "It's not just X".

## Audit

1. State the one idea in one sentence. If you cannot, that is finding #1.
2. Score with [scorecard.md](scorecard.md). Quote failing lines.
3. Verdict: foundation / wording / structure / ship.
4. Fixes in priority order (foundation first).
5. One strongest rewrite of the hook or the one idea, using only real proof.

## Voice

- Customer language over company language. Mirror how the reader names the job.
- `is` / `has` / `does`. Not "enables you to leverage".
- Short. One idea per sentence.
- Humor only if it is true and cheap. Never puns that hide the claim.
- Repeat the real product name. Do not elegant-vary into "the solution".

## Pairing

| Also loaded | Copywriting does | The other skill does |
|-------------|------------------|----------------------|
| `product-readme` | Pitch, invariant wording, technique lines, captions | Section order, proof command, logo, limits required |
| `readable-readme` | Concept brief in human nouns | 7-section skeleton, cap of 5 ideas |
| `extensive-readme` | Why a file exists, in a sentence you can see | Package map, path accuracy |
| `impeccable` | UI microcopy | Layout, type, motion |

## Do not

- Overlay AIDA/PAS on a product README
- Stack CTAs ("star, follow, and try")
- Use "Learn More" / "Get Started" / "Click Here" when a specific verb exists
- Pepper rhetorical questions as a default ("Tired of X?")
- Cite invented conversion stats (including third-party "+81% conversions" claims)
- Copy a competitor's line and swap the noun
- Skip anti-slop because "this is marketing"
