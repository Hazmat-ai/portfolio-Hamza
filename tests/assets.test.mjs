import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const content = JSON.parse(fs.readFileSync('src/data/convergence/content.json', 'utf8'));
test('all projects and every document page have real local preview assets', () => {
  assert.equal(Object.keys(content.projectPreviews).length, 14);
  assert.equal(Object.keys(content.caseContent).length, 18);
  assert.equal(content.uxDocuments.length, 12);
  assert.equal(content.uxDocuments.reduce((n, doc) => n + doc.pages.length, 0), 202);
  const paths = [];
  const walk = value => { if (typeof value === 'string') { if (value.startsWith('/convergence/') && !value.includes('<')) paths.push(value); for (const match of value.matchAll(/(?:src|href)="(\/convergence\/[^"#]+)"/g)) paths.push(match[1]); } else if (value && typeof value === 'object') Object.values(value).forEach(walk); };
  walk(content);
  for (const file of new Set(paths)) assert.ok(fs.statSync(path.join('public', file)).isFile(), file);
  for (const file of ['intro-study.mp4', 'intro-mobile.mp4']) assert.ok(fs.statSync(`public/convergence/${file}`).size > 1_000_000);
});
