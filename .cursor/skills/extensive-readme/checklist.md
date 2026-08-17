# Extensive README — pre-ship checklist

Run before delivering. Fix every fail. Do not ship a catalog-only README.

## Accuracy

- [ ] Features, paths, and counts match the current tree (not memory or an old README)
- [ ] Env vars match `.env.example` / config modules; required vs optional is correct
- [ ] Tool / API / CLI counts match the registry or routes
- [ ] Diagrams show interfaces that still exist
- [ ] Stack names are the ones in code (do not mix Chroma/Qdrant/Postgres by habit)

## Structure

- [ ] Major `##` sections numbered sequentially `1…N`
- [ ] Subsections use `N.M` matching the parent
- [ ] TOC lists every major section; anchors work
- [ ] Physical order matches numeric order
- [ ] Empty inapplicable sections were omitted, not left as placeholders

## Teaching (mandatory)

- [ ] 3–8 **ideas worth understanding** (or fewer only if the repo truly has fewer)
- [ ] Each idea has: name, mechanism, analogy, constraint, honest limits
- [ ] Each idea cites `{path}` or an invariant in this repo
- [ ] Ideas are bets/techniques, not a restated feature list
- [ ] **Further reading** exists when there are ideas to teach
- [ ] Every citation URL was verified (see [further-reading.md](further-reading.md))
- [ ] No invented, guessed, or "probably this arxiv id" links
- [ ] Glossary teaches terms as used here, not generic Wikipedia blurbs

## Voice

- [ ] Opening 30 lines: title, positioning, TL;DR
- [ ] Technical-blog sentences; no engagement bait
- [ ] Present tense for current behavior; past tense only in changelog
- [ ] Honest today vs roadmap

## Routing

- [ ] This file is a reference manual, not a product landing page
- [ ] If the user asked for a public product README (logo, tagline, tiny quickstart), stop and use `product-readme`
