# Sync selected always-global rules from this config into:
#   1. ~/.cursor/rules  (applies to every Cursor workspace)
#   2. Companion config repos under the search roots (business / design)
#   3. Local git repos that already have .cursor/rules (non-junction copies)
#
# Junctioned .cursor trees already see this repo's rules — skipped.
#
# Usage:
#   .\scripts\sync-global-rules.ps1
#   .\scripts\sync-global-rules.ps1 -Roots "D:\Startups","D:\Tech"
#   .\scripts\sync-global-rules.ps1 -WhatIf

param(
    [string[]]$Roots = @("D:\Startups", "D:\Tech"),
    [int]$Depth = 4,
    [switch]$WhatIf
)

$ErrorActionPreference = "Stop"
$configRoot = Split-Path $PSScriptRoot -Parent
$sourceRules = Join-Path $configRoot ".cursor\rules"
$ruleNames = @(
    "model-selection.mdc"
)
$companionRepoNames = @(
    "cursor-config-buisness",
    "cursor-config-design",
    "cursor-config-coding"
)
$skipDirNames = @("node_modules", "external", ".git", "dist", ".next", "__pycache__", ".venv", "vendor")

function Test-IsJunction([string]$Path) {
    if (-not (Test-Path $Path)) { return $false }
    $item = Get-Item -LiteralPath $Path -Force
    return [bool]($item.Attributes -band [IO.FileAttributes]::ReparsePoint)
}

function Get-JunctionTarget([string]$Path) {
    $item = Get-Item -LiteralPath $Path -Force
    if ($item.Target) { return ($item.Target | Select-Object -First 1) }
    return $null
}

function Sync-RuleFile([string]$Name, [string]$DestRules) {
    $src = Join-Path $sourceRules $Name
    $dst = Join-Path $DestRules $Name
    if (-not (Test-Path $src)) {
        throw "Missing source rule: $src"
    }
    if ($WhatIf) {
        Write-Host "  whatif copy $Name -> $dst"
        return
    }
    New-Item -ItemType Directory -Path $DestRules -Force | Out-Null
    Copy-Item -LiteralPath $src -Destination $dst -Force
}

function Find-GitRepos([string]$Root, [int]$Left) {
    Get-ChildItem -LiteralPath $Root -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object {
        if ($skipDirNames -contains $_.Name) { return }
        if (Test-Path -LiteralPath (Join-Path $_.FullName ".git")) {
            $_.FullName
        }
        if ($Left -gt 0) {
            Find-GitRepos $_.FullName ($Left - 1)
        }
    }
}

function Repo-HasCursorRules([string]$Repo) {
    Test-Path -LiteralPath (Join-Path $Repo ".cursor\rules")
}

$copied = New-Object System.Collections.Generic.List[string]
$linked = New-Object System.Collections.Generic.List[string]
$skipped = New-Object System.Collections.Generic.List[string]

Write-Host "Source: $sourceRules"

$globalRules = Join-Path $env:USERPROFILE ".cursor\rules"
Write-Host "Global: $globalRules"
if (-not (Test-Path $globalRules) -and -not $WhatIf) {
    New-Item -ItemType Directory -Path $globalRules -Force | Out-Null
}
foreach ($n in $ruleNames) {
    Sync-RuleFile $n $globalRules
}
$copied.Add("global:$globalRules")
Write-Host "Updated global rules."

$repos = @()
foreach ($root in $Roots) {
    if (-not (Test-Path $root)) {
        Write-Host "Skip missing root $root"
        continue
    }
    $repos += Find-GitRepos $root $Depth
}
$repos = $repos | Sort-Object -Unique

foreach ($repo in $repos) {
    if ([string]::Equals($repo, $configRoot, [StringComparison]::OrdinalIgnoreCase)) {
        $skipped.Add("source:$repo")
        continue
    }

    $leaf = Split-Path $repo -Leaf
    $isCompanion = $companionRepoNames -contains $leaf
    $hasRules = Repo-HasCursorRules $repo

    if (-not $isCompanion -and -not $hasRules) {
        continue
    }

    $cursor = Join-Path $repo ".cursor"
    if (Test-IsJunction $cursor) {
        $target = Get-JunctionTarget $cursor
        $linked.Add("$repo -> $target")
        continue
    }

    $destRules = Join-Path $repo ".cursor\rules"
    if (-not (Test-Path $destRules) -and -not $WhatIf) {
        New-Item -ItemType Directory -Path $destRules -Force | Out-Null
    }
    foreach ($n in $ruleNames) {
        Sync-RuleFile $n $destRules
    }
    $copied.Add($repo)
    Write-Host "Updated $repo"
}

Write-Host ""
Write-Host "Copied ($($copied.Count)):"
$copied | ForEach-Object { Write-Host "  $_" }
Write-Host "Already junctioned ($($linked.Count)):"
$linked | ForEach-Object { Write-Host "  $_" }
Write-Host "Skipped ($($skipped.Count)):"
$skipped | ForEach-Object { Write-Host "  $_" }
