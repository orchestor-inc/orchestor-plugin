#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// SessionStart/additionalContext contract: Vercel Plugin and Claude Code hooks.
// Read only packaged context. No project scan, credential read, or network request.
const root = fileURLToPath(new URL('../', import.meta.url));
const context = readFileSync(new URL('../orchestor-session.md', import.meta.url), 'utf8');
process.stdout.write(JSON.stringify({ hookSpecificOutput: {
  hookEventName: 'SessionStart',
  additionalContext: `Orchestor plugin root: ${root}\n${context}`,
} }) + '\n');
