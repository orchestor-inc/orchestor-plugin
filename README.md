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

The plugin combines Orchestor product context, 17 resource and workflow skills, three specialist
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

### Skills

| Skill | Covers |
| --- | --- |
| [orchestor](skills/orchestor/SKILL.md) | Choose an Orchestor workflow |
| [orchestor-aeo-best-practices](skills/orchestor-aeo-best-practices/SKILL.md) | AEO analysis best practices |
| [orchestor-aeo-workflows](skills/orchestor-aeo-workflows/SKILL.md) | Run an evidence-to-action AEO workflow |
| [orchestor-agentic-web](skills/orchestor-agentic-web/SKILL.md) | Evaluate an agent-facing website |
| [orchestor-answers](skills/orchestor-answers/SKILL.md) | Work with saved answers |
| [orchestor-brands](skills/orchestor-brands/SKILL.md) | Work with brands and domains |
| [orchestor-cli](skills/orchestor-cli/SKILL.md) | Operate the Orchestor CLI |
| [orchestor-integrations](skills/orchestor-integrations/SKILL.md) | Connect agents and external services |
| [orchestor-manage-issues](skills/orchestor-manage-issues/SKILL.md) | Manage Orchestor Issues |
| [orchestor-perception](skills/orchestor-perception/SKILL.md) | Analyze attributed brand characteristics |
| [orchestor-prompts](skills/orchestor-prompts/SKILL.md) | Work with prompts and their context |
| [orchestor-reports](skills/orchestor-reports/SKILL.md) | Work with aggregate reports |
| [orchestor-research](skills/orchestor-research/SKILL.md) | Research public sources with Orchestor |
| [orchestor-runs](skills/orchestor-runs/SKILL.md) | Work with measurement runs |
| [orchestor-shopping](skills/orchestor-shopping/SKILL.md) | Analyze products and AI shopping evidence |
| [orchestor-sources](skills/orchestor-sources/SKILL.md) | Work with sources and citations |
| [orchestor-workspace](skills/orchestor-workspace/SKILL.md) | Organize an Orchestor workspace |

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

## Create and improve skills

For editable skill files through skills.sh, use the
[Skills repository](https://github.com/orchestor-inc/skills). Choose one install
route for the same skills to avoid duplicates. Follow its composition example
and upstream skill-creator guidance. Plugin updates use the native client; in
Claude Code run `claude plugin update orchestor@orchestor`.

## Upstream Skill Sync

The skills come from [orchestor-inc/skills](https://github.com/orchestor-inc/skills)
at the commit in `skills-source.json`. SHA-256 hashes preserve the exact imported
entry points and references. Plugin commands, agents, context, and hooks live in this repository.

To reproduce the import:

```bash
pnpm sync:skills
pnpm validate
pnpm test
```

Update the
commit and hashes deliberately when adopting a newer skill version. Do not
edit imported `skills/` files here.

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

[MIT](LICENSE).
