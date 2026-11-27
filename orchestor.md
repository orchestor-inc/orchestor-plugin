English | [日本語](orchestor.ja.md)

# Orchestor

Orchestor is an AI creative platform. It generates images, video and audio as
asynchronous jobs in a workspace, through the `orc` CLI or the hosted MCP server.

## Choose a skill

| Task | Skill |
| --- | --- |
| Generate an image or video, edit an image, animate a photo, check a job | [orchestor-generate](skills/orchestor-generate/SKILL.md) |
| Upscale, remove the background, caption, reframe, lip sync, talking avatar, motion control | [orchestor-video-edit](skills/orchestor-video-edit/SKILL.md) |
| Text to speech, voice change, transcription | [orchestor-audio](skills/orchestor-audio/SKILL.md) |
| Product images from a product photo | [orchestor-product-photoshoot](skills/orchestor-product-photoshoot/SKILL.md) |

## Interfaces

The CLI (`orc`) and the hosted MCP server (`https://mcp.orchestor.io/mcp`) are
separate connections. Authenticate each one you use. Installing this plugin does
not grant workspace access.

## Jobs and credits

Every generation is a job that ends as `COMPLETED`, `FAILED` or `CANCELED`.
Generation spends the workspace's credits: submit only what the user asked for,
and reuse an idempotency key when resending the same request.
