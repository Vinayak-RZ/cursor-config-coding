#!/usr/bin/env bash
set -euo pipefail

SRC="${QUALITY_PACK_SRC:-$(cd "$(dirname "$0")" && pwd)}"
TARGET="${1:-.}"
TARGET="$(cd "$TARGET" && pwd)"
EFFECTS_DIR="${EFFECTS_DIR:-src/lib/effects}"

echo "Installing quality pack from $SRC into $TARGET"

mkdir -p "$TARGET/eslint" "$TARGET/scripts" "$TARGET/quality-pack"

cp "$SRC/eslint/eslint.config.mjs" "$TARGET/eslint/quality-pack.config.mjs"
cp "$SRC/ruff/ruff.toml.snippet" "$TARGET/quality-pack/ruff.toml.snippet"
cp "$SRC/scripts/quality-ratchet.mjs" "$TARGET/scripts/quality-ratchet.mjs"
cp "$SRC/scripts/check-justification-comments.mjs" "$TARGET/scripts/check-justification-comments.mjs"
cp "$SRC/scripts/quality_baseline.json" "$TARGET/quality-pack/quality_baseline.json.example"
cp "$SRC/dependency-cruiser/dependency-cruiser.config.mjs" "$TARGET/dependency-cruiser.config.mjs"
cp "$SRC/import-linter/importlinter.ini.example" "$TARGET/importlinter.ini.example"
cp "$SRC/docs/error-messages-for-agents.md" "$TARGET/quality-pack/error-messages-for-agents.md"
cp -r "$SRC/../templates" "$TARGET/templates" 2>/dev/null || true
if [[ -d "$SRC/dune" ]]; then
  mkdir -p "$TARGET/quality-pack/dune"
  cp "$SRC/dune/FEATURE_LAYOUT.md" "$TARGET/quality-pack/dune/FEATURE_LAYOUT.md"
fi
if [[ -x "$SRC/../scripts/check.sh" ]]; then
  cp "$SRC/../scripts/check.sh" "$TARGET/scripts/check.sh"
  chmod +x "$TARGET/scripts/check.sh"
fi

chmod +x "$TARGET/scripts/quality-ratchet.mjs" "$TARGET/scripts/check-justification-comments.mjs"

if [[ ! -f "$TARGET/quality_baseline.json" ]]; then
  cp "$SRC/scripts/quality_baseline.json" "$TARGET/quality_baseline.json"
  echo "Created quality_baseline.json (run: node scripts/quality-ratchet.mjs --write-baseline after tuning ceilings)"
fi

cat > "$TARGET/quality-pack/INSTALLED.json" <<EOF
{
  "installedFrom": "cursor-config-coding/quality-pack",
  "effectsDir": "$EFFECTS_DIR",
  "installedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo "Done. Next: add ESLint deps, merge ruff snippet, wire scripts in CI."