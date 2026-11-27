# Orchestor Plugin

This repository distributes the Orchestor plugin. Keep manifests in
`.claude-plugin/`, `.cursor-plugin/`, `.plugin/`, and `.kimi-plugin/` aligned.
The session hook lives in `hooks/`. `orchestor.md` maps tasks to skills.

Skills are imported from the commit and hashes in `skills-source.json`.
Update that pin and run `pnpm sync:skills`; do not edit imported bodies here.
Run `pnpm validate` and `pnpm test` after changing distribution files.

Do not add credentials, workspace exports, or customer answers to this repository.
The repository remains private until the owner explicitly authorizes publication.
