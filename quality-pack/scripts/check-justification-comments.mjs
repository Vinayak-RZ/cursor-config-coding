#!/usr/bin/env node
/**
 * Rejects comments that excuse slop instead of fixing root cause.
 */
import fs from 'node:fs';
import path from 'node:path';

const JUSTIFICATION =
  /\b(workaround|hack|for\s+now|temporary\s+(fix|hack|solution|workaround))\b/i;
const TODO_BAD = /\bTODO\b(?!\s*[:#]?\s*(?:#\d+|https?:\/\/\S+issues\/\d+))/i;

const EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.py',
  '.go',
  '.rs',
  '.css',
  '.scss',
]);

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  'coverage',
  'quality-pack',
]);

function walk(dir, out) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(name.name)) continue;
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(name.name))) out.push(p);
  }
}

function stripStrings(line) {
  return line
    .replace(/'[^'\\]*(?:\\.[^'\\]*)*'/g, "''")
    .replace(/"[^"\\]*(?:\\.[^"\\]*)*"/g, '""')
    .replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g, '``');
}

function commentSegments(line) {
  const stripped = stripStrings(line);
  const segs = [];
  const slash = stripped.indexOf('//');
  if (slash !== -1) segs.push(stripped.slice(slash));
  const hash = stripped.indexOf('#');
  if (hash !== -1 && !stripped.trimStart().startsWith('#!')) {
    segs.push(stripped.slice(hash));
  }
  return segs;
}

function main() {
  const root = process.cwd();
  const files = [];
  walk(root, files);
  let failed = false;

  for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const seg of commentSegments(line)) {
        if (JUSTIFICATION.test(seg)) {
          failed = true;
          console.error(
            `comments/no-justification: forbidden phrase in ${file}:${i + 1}\nFix: remove the comment and fix root cause, or track as TODO #<issue>.`,
          );
        }
        if (TODO_BAD.test(seg)) {
          failed = true;
          console.error(
            `comments/todo-needs-issue: TODO without issue link in ${file}:${i + 1}\nFix: use TODO #123 or TODO: https://github.com/org/repo/issues/123.`,
          );
        }
      }
    });
  }

  if (!failed) console.log('check-justification-comments: ok');
  process.exit(failed ? 1 : 0);
}

main();