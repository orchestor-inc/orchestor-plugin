# Distribution reference

Primary: [vercel/vercel-plugin@f0a392d164e4ee1a834008fe455220aec6c8895c](https://github.com/vercel/vercel-plugin/tree/f0a392d164e4ee1a834008fe455220aec6c8895c).

The directory layout and component roles follow the primary reference:

| Vercel element | Orchestor element |
| --- | --- |
| Multi-tool plugin manifests | Same manifest directories |
| Skills | 13 pinned Orchestor skills with 64 references |
| Three specialist agents | Visibility, monitoring, and integration specialists |
| Four commands | status, visibility, monitor, improve |
| vercel.md and vercel-session.md | orchestor.md and orchestor-session.md |
| Session-start injection | Packaged, thin Orchestor context |
| MCP configuration | Hosted Orchestor MCP with OAuth |
| Upstream skill sync | Pinned Skills repository and SHA-256 verification |
| CI and validation | Manifest/content validation and hook execution tests |

Vercel's project profiler detects local deployment projects. Orchestor tasks can
operate on remote workspaces without a local project, so the hook supplies a
short introduction when this plugin is enabled and loads task skills on demand.
Telemetry, deployment hosting, Vercel's opt-in ranking engine, and its Bun build
pipeline are not carried over. No runtime dependencies are needed for our hook.
These are explicit scope differences, not claims of full implementation parity.

The implementation and Orchestor prose are original; no Vercel source code is
vendored. Manifest conventions and the SessionStart output contract were checked
against https://code.claude.com/docs/en/plugins-reference and
https://code.claude.com/docs/en/hooks on 2026-10-03.

## English default and Japanese sidecars

English remains the default installed instruction set. Japanese uses `SKILL.ja.md`
and `*.ja.md` supporting documents; these are not additional discoverable skills.
Both languages retain the same commands, code, identifiers and authorization boundaries.
Japanese documents record the SHA-256 of their English source so changed source text
requires a translation refresh. The plugin receives both languages through its existing
commit-pinned, per-file hash sync. Native command and agent translations live under
`docs/ja/` to avoid registering extra commands or agents.

Mechanisms used:

- [Graphify language links and sidecar documents](https://github.com/Graphify-Labs/graphify/blob/0a8cd4e1e342235fe53e881fb5d591bf0460071f/docs/translations/README.zh-TW.md#L9-L14).
- [Lingo source/target locales and preserved keys](https://github.com/lingodotdev/lingo.dev/blob/28435298ec34473cc689f5ac9609be01c8653d0b/packages/cli/src/cli/cmd/run/_types.ts#L21-L35). This distribution uses static Markdown, not a translation runtime.
- [Matt's versioned plugin distribution from canonical skills](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/.agents/adr/0002-ship-as-a-claude-code-plugin.md#L1-L53).
- [Superpowers native manifest validation](https://github.com/obra/superpowers/blob/bb92a77741419a4ab5f06e711a283343f1ada0c3/tests/antigravity/test-plugin-manifest.sh#L65-L107).
- [Claude Code skill discovery and supporting files](https://code.claude.com/docs/en/skills): retain the canonical `SKILL.md`, name, and description contract.
