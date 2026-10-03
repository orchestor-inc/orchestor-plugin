---
description: Create or update a requested monitoring question.
---

# Set up monitoring

User request: $ARGUMENTS

## Preflight

Read the matching SKILL.md files under this plugin’s `skills/` directory.
Confirm the intended workspace and use only authorized data.

## Procedure

Read orchestor-cli, orchestor-prompts. Resolve the workspace, exact question, and requested settings. Check for an existing matching prompt before creating one. Create a draft unless the user explicitly requested monitoring or a run. Preserve unrelated settings. Read back the prompt and return its ID and state. Use orchestor-runs only for an explicitly requested measurement.

## Return

State scope, result, evidence, and any unresolved limitation.
