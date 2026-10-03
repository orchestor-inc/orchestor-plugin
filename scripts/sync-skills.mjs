import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const source = JSON.parse(readFileSync(join(root, 'skills-source.json'), 'utf8'));
if (source.repository !== 'https://github.com/orchestor-inc/skills.git' || !/^[a-f0-9]{40}$/.test(source.commit)) {
  throw new Error('Expected the Orchestor skills repository and a full commit SHA');
}
const temp = mkdtempSync(join(tmpdir(), 'orchestor-skills-sync-'));
try {
  execFileSync('git', ['init', '--quiet', temp]);
  execFileSync('git', ['-C', temp, 'fetch', '--quiet', '--depth=1', source.repository, source.commit]);
  const files = [];
  for (const [name, entries] of Object.entries(source.skills)) {
    if (!/^orchestor(?:-[a-z0-9]+)*$/.test(name) || !entries['SKILL.md']) throw new Error('Invalid skill');
    for (const [path, expected] of Object.entries(entries)) {
      if (!/^[a-zA-Z0-9_./-]+$/.test(path) || path.startsWith('/') || path.split('/').some(p => !p || p === '.' || p === '..')) throw new Error('Invalid skill path');
      const body = execFileSync('git', ['-C', temp, 'show', `${source.commit}:skills/${name}/${path}`]);
      if (createHash('sha256').update(body).digest('hex') !== expected) throw new Error(`Hash mismatch: ${name}/${path}`);
      files.push([`${name}/${path}`, body]);
    }
  }
  if (!process.argv.includes('--dry-run')) {
    rmSync(join(root, 'skills'), { recursive: true, force: true });
    for (const [path, body] of files) {
      const dest = join(root, 'skills', path);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, body);
    }

  }
  console.log(`Verified ${files.length} files in ${Object.keys(source.skills).length} skills from ${source.commit}`);
} finally {
  rmSync(temp, { recursive: true, force: true });
}
