#!/usr/bin/env bash
# Sync always-global rules into ~/.cursor/rules and local repos.
# On Windows this calls the PowerShell script so junctions are detected correctly.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if command -v powershell.exe >/dev/null 2>&1; then
  exec powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$DIR/sync-global-rules.ps1" "$@"
fi

ROOT="$(cd "$DIR/.." && pwd)"
SRC="$ROOT/.cursor/rules"
GLOBAL="${HOME}/.cursor/rules"
RULES=(model-selection.mdc)
SEARCH_ROOTS=("${@:-$HOME/Startups}")

sync_into() {
  local dest="$1"
  mkdir -p "$dest"
  for r in "${RULES[@]}"; do
    cp "$SRC/$r" "$dest/$r"
  done
}

echo "Source: $SRC"
sync_into "$GLOBAL"
echo "Updated global $GLOBAL"

for search in "${SEARCH_ROOTS[@]}"; do
  [[ -d "$search" ]] || continue
  find "$search" \( -name node_modules -o -name external -o -name .git -o -name vendor \) -prune -o -name .git -type d -print 2>/dev/null \
    | while read -r gitdir; do
        repo="$(dirname "$gitdir")"
        [[ "$repo" == "$ROOT" ]] && continue
        rules_dir="$repo/.cursor/rules"
        leaf="$(basename "$repo")"
        if [[ ! -d "$rules_dir" ]] && [[ "$leaf" != cursor-config-buisness && "$leaf" != cursor-config-design && "$leaf" != cursor-config-coding ]]; then
          continue
        fi
        if [[ -L "$repo/.cursor" ]]; then
          echo "junctioned: $repo"
          continue
        fi
        echo "update: $repo"
        sync_into "$rules_dir"
      done
done
