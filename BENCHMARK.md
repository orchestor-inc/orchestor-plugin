# Distribution reference

Primary: [vercel/vercel-plugin@f0a392d164e4ee1a834008fe455220aec6c8895c](https://github.com/vercel/vercel-plugin/tree/f0a392d164e4ee1a834008fe455220aec6c8895c).

The directory layout and component roles follow the primary reference:

| Vercel element | Orchestor element |
| --- | --- |
| Multi-tool plugin manifests | Same manifest directories |
| Skills | 16 pinned Orchestor skills |
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
