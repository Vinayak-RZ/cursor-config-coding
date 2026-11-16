# Implementation plan: TITLE

**Brief:** link to brief or PR  
**Status:** draft | approved (by name, date)

## Summary

One paragraph: chosen approach after alternatives.

## Alternatives considered

| Option | Pros | Cons |
|--------|------|------|
| A | | |
| B | | |

## Design decisions

Bullets the builder must not reverse without asking.

## Risks and mitigations

## Implementation steps

Ordered checklist for the builder (files or areas, not vague goals).

## Verification

Commands and artifacts the builder must produce before requesting review.

## Handoff note for builder

Copy into the build agent prompt:

```text
Implement exactly plans/THIS_FILE.md. Do not replan. If blocked, stop and ask.
Brief: LINK. Run: ./scripts/check.sh and VERIFICATION from plan.
```