English | [日本語](README.ja.md)

# Orchestor Plugin

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Generate images, video and speech with [Orchestor](https://www.orchestor.io), the
AI creative platform, without leaving your coding agent. One install adds the
Orchestor skills and the hosted MCP connection.

## Installation

```bash
npx plugins add orchestor-inc/orchestor-plugin
```

Choose your agent when prompted. To target Claude Code explicitly:

```bash
npx plugins add orchestor-inc/orchestor-plugin --target claude-code
```

Or use Claude Code's native marketplace commands:

```bash
claude plugin marketplace add orchestor-inc/orchestor-plugin
claude plugin install orchestor@orchestor
```

Restart your agent, open `/mcp` and sign in to Orchestor to authorize a workspace.
Installation does not grant access on its own.

### Supported tools

| Tool | Status |
| --- | --- |
| Claude Code | Manifest validation and plugin installation verified |
| OpenAI Codex | Plugin installer registration verified; authenticated runtime not tested |
| Cursor | Manifest included; runtime not tested |
| GitHub Copilot CLI | Generic plugin manifest included; runtime not tested |
| Grok Build | Generic plugin manifest included; runtime not tested |
| Kimi Code | Manifest included; runtime not tested |

Requires Node.js 24+ for installation and the session hook.

## Usage

Describe what you want:

> Generate a product shot of a white sneaker on a concrete floor with gpt-image-2.

> Make a 5-second video of waves at dawn with seedance-2.5 and give me the URL.

> Read this script aloud with a calm Japanese voice.

The agent picks a model from the catalog, submits the job, waits for it and
returns the output. Each generation spends credits from the authorized workspace.

## What's inside

| Component | Description |
| --- | --- |
| **MCP** | `.mcp.json` connects to `https://mcp.orchestor.io/mcp` over OAuth. The plugin contains no credentials. |
| **Skills** | [orchestor-creative](skills/orchestor-creative/SKILL.md) for image, video and speech generation, plus Orchestor's earlier analysis skills, kept for existing workspaces. |
| **Session hook** | Adds a short pointer to the plugin's skills at session start. It reads only packaged files: no project scan, network call or credential access. |
| **Commands and agents** | `/orchestor:status` checks the CLI connection and workspace. The remaining commands and agents belong to the earlier analysis workflows. |

The skills also work with the `orc` CLI. Install it with
`curl -fsSL https://orchestor.io/install | sh`; CLI and MCP sign-ins are separate.

## Telemetry

This plugin does not send telemetry. Calls to Orchestor through the CLI or MCP
are product requests and follow the service's normal authentication.

## Skills source

The skills come from [orchestor-inc/skills](https://github.com/orchestor-inc/skills)
at the commit pinned in `skills-source.json`, verified by SHA-256. Do not edit
`skills/` here. To adopt a newer version, update the pin and run:

```bash
pnpm sync:skills
pnpm validate
pnpm test
```

To install the skills without the plugin, use the
[skills repository](https://github.com/orchestor-inc/skills). Pick one route so
the same skill is not installed twice.

## Development

```bash
pnpm validate
pnpm test
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
```

No build step. [BENCHMARK.md](BENCHMARK.md) records the pinned Vercel plugin reference.

## Documentation

- [MCP setup](https://www.orchestor.io/docs/en/mcp)
- [CLI reference](https://www.orchestor.io/docs/en/cli)
- [Models](https://www.orchestor.io/docs/en/models)

## License

[MIT](LICENSE).
