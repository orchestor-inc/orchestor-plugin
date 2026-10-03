import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const json = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const pkg = json('package.json');
for (const dir of ['.claude-plugin', '.cursor-plugin', '.plugin', '.kimi-plugin']) {
  const manifest = json(`${dir}/plugin.json`);
  assert.equal(manifest.name, 'orchestor');
  assert.equal(manifest.version, pkg.version);
  assert.equal(manifest.repository, 'https://github.com/orchestor-inc/orchestor-plugin');
}
const manifest = json('.claude-plugin/plugin.json');
for (const path of [...manifest.commands, ...manifest.agents]) {
  assert.ok(existsSync(resolve(root, path)), `Missing component: ${path}`);
}
const market = json('.claude-plugin/marketplace.json');
assert.equal(market.plugins[0].name, manifest.name);
assert.equal(market.plugins[0].source, './');
const source = json('skills-source.json');
assert.match(source.commit, /^[a-f0-9]{40}$/);
assert.equal(source.repository, 'https://github.com/orchestor-inc/skills.git');
assert.deepEqual(readdirSync(resolve(root, 'skills')).sort(), Object.keys(source.skills).sort());
for (const [name, digest] of Object.entries(source.skills)) {
  assert.match(name, /^orchestor(?:-[a-z0-9]+)*$/);
  const path = resolve(root, 'skills', name, 'SKILL.md');
  const body = readFileSync(path, 'utf8');
  assert.equal(createHash('sha256').update(body).digest('hex'), digest, `Skill drift: ${name}`);
  for (const [, link] of body.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(link)) continue;
    const target = resolve(dirname(path), link);
    assert.ok(target.startsWith(root), `Escaping link: ${link}`);
    assert.ok(existsSync(target), `Missing link: ${link}`);
  }
}
for (const path of ['.mcp.json', 'mcp.json']) {
  assert.deepEqual(json(path), {mcpServers:{orchestor:{type:'http',url:'https://mcp.orchestor.io/mcp'}}});
}
assert.equal(json('.kimi-plugin/plugin.json').mcpServers.orchestor.url, 'https://mcp.orchestor.io/mcp');
console.log(`Validated ${Object.keys(source.skills).length} pinned skills, 4 manifests, commands, agents, and MCP settings`);
