# Error messages that agents can fix

Lint and ratchet output is part of the product. Agents read it instead of a long rule file. Each message should answer:

1. **What failed** — rule id or metric name
2. **Where** — file and line
3. **Root-cause fix** — the allowed pattern, not a vague “fix this”

## Template

```
[RULE_ID] <short violation> at <path>:<line>
Fix: <one imperative sentence naming the correct layer, file, or API>
```

## Examples

**Boundary (dependency-cruiser)**

```
boundary/no-ui-to-db: ui/dashboard.tsx imports src/db/client.ts
Fix: call a server action or service in src/services/; UI must not import data access.
```

**Restricted hook**

```
react-effects/no-raw-use-effect: useEffect in src/components/Chart.tsx
Fix: move lifecycle logic to src/lib/effects/useChartMount.ts and call that hook from the component.
```

**Ratchet**

```
ratchet/type-ignore: count 125 exceeds baseline 124 (+1)
Fix: remove the new type: ignore by typing the value or narrowing; do not raise the baseline.
```

**Justification comment**

```
comments/no-justification: "temporary hack" in src/api/cache.ts:42
Fix: fix the underlying bug or track work as TODO #<issue>; delete the comment.
```

## Anti-patterns

- “Invalid code” with no next step
- Pointing to AGENTS.md instead of the fix
- Suggesting `eslint-disable` without a linked issue id

## When Vinayak or review corrects the agent

Encode the correction as a rule, test, or ratchet metric in the **same PR** that fixes the bug. Shrink prose only after the check exists.