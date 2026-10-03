import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const source = JSON.parse(readFileSync(join(root, 'skills-source.json'), 'utf8'));
if (source.repository !== 'https://github.com/orchestor-inc/skills.git' || !/^[a-f0-9]{40}$/.test(source.commit)) {
  throw new Error('Expected the Orchestor skills repository and a full commit SHA');
}
const temp = mkdtempSync(join(tmpdir(), 'orchestor-plugin-sync-'));
try {
  execFileSync('git', ['init', '--quiet', temp]);
  execFileSync('git', ['-C', temp, 'fetch', '--quiet', '--depth=1', source.repository, source.commit]);
  const bodies = Object.entries(source.skills).map(([name, expected]) => {
    if (!/^orchestor(?:-[a-z0-9]+)*$/.test(name)) throw new Error('Invalid skill name');
    const body = execFileSync('git', ['-C', temp, 'show', `${source.commit}:skills/${name}/SKILL.md`]);
    if (createHash('sha256').update(body).digest('hex') !== expected) throw new Error(`Hash mismatch: ${name}`);
    return [name, body];
  });
  for (const [name, body] of bodies) {
    mkdirSync(join(root, 'skills', name), { recursive: true });
    writeFileSync(join(root, 'skills', name, 'SKILL.md'), body);
  }
  console.log(`Synced ${bodies.length} skills from ${source.commit}`);
} finally {
  rmSync(temp, { recursive: true, force: true });
}
