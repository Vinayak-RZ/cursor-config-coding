#!/usr/bin/env node
/**
 * Language-agnostic quality ratchet.
 * Reads quality_baseline.json from cwd (or QUALITY_BASELINE path).
 * Fails when any metric count exceeds ceiling; --update lowers ceilings to current counts.
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const baselinePath =
  process.env.QUALITY_BASELINE ?? path.join(repoRoot, 'quality_baseline.json');

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  'coverage',
]);

function loadBaseline() {
  if (!fs.existsSync(baselinePath)) {
    console.error(
      `ratchet/missing-baseline: no file at ${baselinePath}\nFix: copy quality-pack/scripts/quality_baseline.json to the repo root and run --write-baseline once.`,
    );
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
}

function parseGlob(glob) {
  const brace = glob.match(/^\*\*\/\*\.\{([^}]+)\}$/);
  if (brace) {
    return brace[1].split(',').map((e) => `.${e.trim()}`);
  }
  if (glob === '**/*.py') return ['.py'];
  if (glob === '**/*') return null;
  return null;
}

function walkFiles(dir, out) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(name.name)) continue;
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walkFiles(p, out);
    else out.push(p);
  }
}

function fileMatchesGlob(filePath, exts) {
  if (!exts) return true;
  return exts.some((ext) => filePath.endsWith(ext));
}

function countMetric(metric, root) {
  const patterns = (metric.patterns ?? []).map((p) => new RegExp(p));
  const exts = parseGlob(metric.glob ?? '**/*');
  const files = [];
  walkFiles(root, files);
  let total = 0;

  for (const file of files) {
    const rel = path.relative(root, file);
    if (!fileMatchesGlob(rel, exts)) continue;
    let content;
    try {
      content = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    const lines = content.split('\n');
    for (const line of lines) {
      for (const re of patterns) {
        if (re.test(line)) total += 1;
      }
    }
  }
  return total;
}

function main() {
  const writeBaseline = process.argv.includes('--write-baseline');
  const update = process.argv.includes('--update');
  const baseline = loadBaseline();
  const metrics = baseline.metrics ?? {};
  const results = {};
  let failed = false;

  for (const [key, metric] of Object.entries(metrics)) {
    const count = countMetric(metric, repoRoot);
    results[key] = count;
    const ceiling = metric.ceiling ?? 0;
    if (count > ceiling) {
      failed = true;
      console.error(
        `ratchet/${key}: count ${count} exceeds baseline ${ceiling} (+${count - ceiling})\nFix: remove the new debt (${metric.description ?? key}); do not raise the baseline without team approval.`,
      );
    }
  }

  if (writeBaseline) {
    for (const key of Object.keys(metrics)) {
      metrics[key].ceiling = results[key];
    }
    fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
    console.log(`Wrote baselines to ${baselinePath}`);
    return;
  }

  if (update) {
    let changed = false;
    for (const [key, metric] of Object.entries(metrics)) {
      const count = results[key];
      if (count < (metric.ceiling ?? 0)) {
        metrics[key].ceiling = count;
        changed = true;
        console.log(`ratchet/${key}: lowered ceiling to ${count}`);
      }
    }
    if (changed) {
      fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
    }
  }

  if (!failed) {
    console.log('ratchet: all metrics within baseline');
    for (const [key, count] of Object.entries(results)) {
      const ceiling = metrics[key].ceiling ?? 0;
      console.log(`  ${key}: ${count} / ${ceiling}`);
    }
  }

  process.exit(failed ? 1 : 0);
}

main();