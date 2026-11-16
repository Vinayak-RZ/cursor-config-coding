#!/usr/bin/env bash
# Local quality gate for this template repo and for app repos after quality-pack install.
# Does not use GitHub Actions. Run before push: ./scripts/check.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "== justification comments =="
if [[ -f scripts/check-justification-comments.mjs ]]; then
  node scripts/check-justification-comments.mjs
elif [[ -f quality-pack/scripts/check-justification-comments.mjs ]]; then
  node quality-pack/scripts/check-justification-comments.mjs
else
  echo "skip (no justification script)"
fi

echo "== quality ratchet =="
RATchet="${ROOT}/quality-pack/scripts/quality-ratchet.mjs"
BASELINE="${QUALITY_BASELINE:-${ROOT}/quality_baseline.json}"
if [[ -f "$RATchet" ]]; then
  if [[ ! -f "$BASELINE" ]]; then
  cp quality-pack/scripts/quality_baseline.json "$BASELINE"
    QUALITY_BASELINE="$BASELINE" node "$RATchet" --write-baseline
  fi
  QUALITY_BASELINE="$BASELINE" node "$RATchet"
elif [[ -f scripts/quality-ratchet.mjs ]]; then
  BASELINE="${QUALITY_BASELINE:-${ROOT}/quality_baseline.json}"
  if [[ ! -f "$BASELINE" ]]; then
    echo "ratchet: missing quality_baseline.json (run quality-pack/install.sh)"
    exit 1
  fi
  QUALITY_BASELINE="$BASELINE" node scripts/quality-ratchet.mjs
else
  echo "skip (no ratchet script)"
fi

if [[ "${RUN_QUALITY_PACK_SMOKE:-0}" == "1" ]]; then
  echo "== quality-pack install smoke =="
  SCRATCH="$(mktemp -d)"
  trap 'rm -rf "$SCRATCH"' EXIT
  mkdir -p "$SCRATCH/src/lib/effects"
  printf '%s\n' 'export const ok = true;' >"$SCRATCH/src/index.ts"
  QUALITY_PACK_SRC="${ROOT}/quality-pack" bash "${ROOT}/quality-pack/install.sh" "$SCRATCH"
  (cd "$SCRATCH" && node scripts/quality-ratchet.mjs --write-baseline && node scripts/quality-ratchet.mjs)
fi

echo "check: ok"