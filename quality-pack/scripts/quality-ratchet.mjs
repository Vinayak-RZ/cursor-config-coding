#!/usr/bin/env node
/**
 * Language-agnostic quality ratchet.
 * Reads quality_baseline.json from cwd (or QUALITY_BASELINE path).
 * Fails when any metric count exceeds ceiling; --update lowers ceilings to current counts.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const baselinePath =
  process.env.QUALITY_BASELINE ?? path.join(repoRoot, 'quality_baseline.json');
const update = process.argv.includes('--update');
const writeBaseline = process.argv.includes('--write-baseline');

function loadBaseline() {
  if (!fs.existsSync(baselinePath)) {
    console.error(
      `ratchet/missing-baseline: no file at ${baselinePath}\nFix: copy quality-pack/scripts/quality_baseline.json to the repo root and run --write-baseline once.`,
    );
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
}

function rgAvailable() {
  const r = spawnSync('rg', ['--version'], { encoding: 'utf8' });
  return r.status === 0;
}

function countMetric(metric, root) {
  const patterns = metric.patterns ?? [];
  const glob = metric.glob ?? '**/*';
  let total = 0;

  if (!rgAvailable()) {
    console.error(
      'ratchet/missing-rg: ripgrep (rg) is required.\nFix: install ripgrep or run in CI image that includes it.',
    );
    process.exit(1);
  }

  for (const pattern of patterns) {
    const args = [
      '--glob',
      glob,
      '--glob',
      '!node_modules/**',
      '--glob',
      '!.git/**',
      '-e',
      pattern,
      root,
    ];
    const r = spawnSync('rg', args, { encoding: 'utf8' });
    if (r.status === 0) {
      const lines = r.stdout.trim().split('\n').filter(Boolean);
      total += lines.length;
    } else if (r.status === 1) {
      // no matches
    } else {
      console.error(`ratchet/rg-error: pattern ${pattern}\n${r.stderr}`);
      process.exit(1);
    }
  }
  return total;
}

function main() {
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