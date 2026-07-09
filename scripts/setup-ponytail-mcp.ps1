# Installs ponytail MCP server dependencies (run once after clone or when vendor updates)
# Usage: .\scripts\setup-ponytail-mcp.ps1

$ErrorActionPreference = "Stop"
$configRoot = Split-Path $PSScriptRoot -Parent
$mcpDir = Join-Path $configRoot ".cursor\vendor\ponytail\ponytail-mcp"
$skillSrc = Join-Path $configRoot ".cursor\skills\ponytail\SKILL.md"
$skillDest = Join-Path $configRoot ".cursor\vendor\ponytail\skills\ponytail\SKILL.md"

if (-not (Test-Path $mcpDir)) {
    Write-Error "ponytail MCP vendor not found at $mcpDir"
}

New-Item -ItemType Directory -Force -Path (Split-Path $skillDest -Parent) | Out-Null
Copy-Item $skillSrc $skillDest -Force

Push-Location $mcpDir
npm install --omit=dev
if ($LASTEXITCODE -ne 0) {
    Pop-Location
    Write-Error "npm install failed in $mcpDir"
}
Pop-Location

Write-Host "ponytail MCP ready. Reload Cursor after linking mcp.json."
