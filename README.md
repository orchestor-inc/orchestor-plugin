# orchestor-plugin

## Getting Started

Orchestor workflows for investigating AI visibility, monitoring brands, and
turning citation evidence into improvements.

### Supported Tools

| Tool | Distribution status |
| --- | --- |
| Claude Code | Manifest validation and plugin installation verified |
| OpenAI Codex | Plugin installer registration verified; authenticated runtime not tested |
| Cursor | Manifest included; runtime not tested |
| GitHub Copilot CLI | Generic plugin manifest included; runtime not tested |
| Grok Build | Generic plugin manifest included; runtime not tested |
| Kimi Code | Manifest included; runtime not tested |

### Prerequisites

- Git access to this private repository.
- An agent client listed above.
- Node.js 24+ for installation and the session hook.
- An Orchestor workspace and authenticated CLI for the bundled task workflows.

### Installation

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

Restart your agent. In Claude Code, open `/mcp` to authorize Orchestor and select
the intended workspace. For the CLI workflows, follow the
[CLI setup guide](https://orchestor.io/docs/cli), then run `orc status`.
MCP and CLI authentication are separate. Installation does not grant data access.

## What It Does

The plugin combines Orchestor product context, 16 task skills, three specialist
agents, four commands, a session-start hook, and the hosted MCP connection.
It helps agents choose a workflow and return evidence with a defined scope.

## How Do I Use This?

Describe an outcome, for example:

- “Compare our visibility with these competitors for the last 30 days.”
- “Find questions where competitors are cited and we are not.”
- “Add this question as a draft; do not run a measurement yet.”

The agent confirms the workspace, reads the relevant skill, and uses the
available connection. Writes and credit-consuming measurements follow your request.

## Components

### Ecosystem Graph (`orchestor.md`)

A compact guide connects workspaces, brands, prompts, answers, reports, domains,
and Issues. A decision table maps goals to task skills.

### Skills (16 skills)

| Skill | Covers |
| --- | --- |
| [orchestor](skills/orchestor/SKILL.md) | Orchestor |
| [orchestor-account](skills/orchestor-account/SKILL.md) | Inspect account access and usage |
| [orchestor-answer](skills/orchestor-answer/SKILL.md) | Inspect saved AI answers |
| [orchestor-brand](skills/orchestor-brand/SKILL.md) | Manage brands and competitors |
| [orchestor-build-mcp-integration](skills/orchestor-build-mcp-integration/SKILL.md) | Connect an agent to Orchestor MCP |
| [orchestor-domain](skills/orchestor-domain/SKILL.md) | Manage tracked domains |
| [orchestor-manage-issues](skills/orchestor-manage-issues/SKILL.md) | Orchestor Issue管理 |
| [orchestor-prompt](skills/orchestor-prompt/SKILL.md) | Manage monitoring questions |
| [orchestor-prompt-create](skills/orchestor-prompt-create/SKILL.md) | Create a monitoring prompt |
| [orchestor-prompt-run](skills/orchestor-prompt-run/SKILL.md) | Collect a new AI answer |
| [orchestor-report](skills/orchestor-report/SKILL.md) | Analyze AI visibility and citations |
| [orchestor-report-visibility](skills/orchestor-report-visibility/SKILL.md) | Compare brand visibility |
| [orchestor-shared](skills/orchestor-shared/SKILL.md) | Shared setup and evidence rules |
| [orchestor-status](skills/orchestor-status/SKILL.md) | Check the Orchestor connection |
| [orchestor-tag](skills/orchestor-tag/SKILL.md) | Organize prompts with tags |
| [orchestor-topic](skills/orchestor-topic/SKILL.md) | Organize monitoring topics |

### Agents (3 specialists)

| Agent | Expertise |
| --- | --- |
| `visibility-analyst` | Competitor comparisons, citations, and evidence-backed recommendations |
| `monitoring-specialist` | Monitoring questions, topics, tags, and measurement scope |
| `integration-expert` | MCP setup and CLI connection troubleshooting |

### Commands (4 commands)

| Command | Purpose |
| --- | --- |
| `/orchestor:status` | Check the CLI connection and intended workspace |
| `/orchestor:visibility` | Compare visibility and inspect supporting answers |
| `/orchestor:monitor` | Create or update the requested monitoring question |
| `/orchestor:improve` | Prioritize improvements from evidence |

### Hooks

The SessionStart hook adds a short introduction with the plugin location,
shared rules, and workflow entry point. It reads only packaged context and does
not scan your project, call the network, or access credentials. Hook availability
and command syntax depend on the client; the JSON output contract is tested for
Claude Code.

### MCP

`.mcp.json` and `mcp.json` point to `https://mcp.orchestor.io/mcp`.
Use your client's OAuth flow. The plugin contains no credentials.

## Usage

In Claude Code:

```text
/orchestor:status
/orchestor:visibility Compare our brand with competitors for the last 30 days
/orchestor:monitor Add this question as a draft
```

Use the matching skills directly when your client exposes skills instead of
namespaced commands. Check https://orchestor.io/docs/agent-setup for client setup.

## Telemetry

This plugin does not send telemetry. Calls to Orchestor through the CLI or MCP
are product requests and follow the service's normal authentication and behavior.

## Upstream Skill Sync

The 16 skills come from [orchestor-inc/skills](https://github.com/orchestor-inc/skills)
at the commit in `skills-source.json`. SHA-256 hashes preserve the exact imported
bodies. Plugin commands, agents, context, and hooks live in this repository.

To reproduce the import:

```bash
pnpm sync:skills
pnpm validate
pnpm test
```

The sync command requires access to the private Skills repository. Update the
commit and hashes deliberately when adopting a newer skill version. Do not
edit imported `skills/*/SKILL.md` files here.

## Development

```bash
pnpm validate
pnpm test
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
```

No dependency installation or build step is required. The runtime files are
committed directly. [BENCHMARK.md](BENCHMARK.md) records the pinned Vercel reference
and the components adapted to Orchestor.

## License

UNLICENSED. See [LICENSE](LICENSE). This repository is private for owner review.
