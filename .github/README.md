# GitHub Actions

**Today:** minutes budget is exhausted. Gates run locally: `./scripts/check.sh`.

**Later (~one month):** enable CI without rework:

1. Open `.github/workflows/quality-pack.yml`
2. Set repository variable `QUALITY_PACK_CI_ENABLED` to `true`, **or** change the job `if` to match your policy
3. Workflow runs the same steps as `check.sh` plus install smoke

Optional: `cp quality-pack/hooks/pre-push.sample .git/hooks/pre-push`