import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
const script = fileURLToPath(new URL('../hooks/inject-claude-md.mjs', import.meta.url));

test('session hook returns packaged context even from an unrelated project', t => {
  const cwd = mkdtempSync(join(tmpdir(), 'orchestor-hook-'));
  t.after(() => rmSync(cwd, {recursive: true, force: true}));
  const output = execFileSync(process.execPath, [script], {
    cwd, input: JSON.stringify({hook_event_name:'SessionStart',cwd,prompt:'PRIVATE_SENTINEL'}),
    env: {...process.env, ORCHESTOR_API_KEY:'SECRET_SENTINEL'}, encoding:'utf8',
  });
  const parsed = JSON.parse(output);
  assert.equal(parsed.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.match(parsed.hookSpecificOutput.additionalContext, /orchestor-shared/);
  assert.match(parsed.hookSpecificOutput.additionalContext, /Installation\nis not authentication/);
  assert.ok(!output.includes('SECRET_SENTINEL'));
  assert.ok(!output.includes('PRIVATE_SENTINEL'));
  assert.ok(!output.includes(cwd));
});
