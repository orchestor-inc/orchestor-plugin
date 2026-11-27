[English](orchestor.md) | 日本語

# Orchestor

Orchestor は AI クリエイティブプラットフォームです。`orc` CLI またはホスト型 MCP サーバーを通じて、画像・動画・音声をワークスペース内の非同期ジョブとして生成します。

## スキルを選ぶ

| タスク | スキル |
| --- | --- |
| 画像や動画の生成、画像の編集、写真を動かす、ジョブの確認 | [orchestor-generate](skills/orchestor-generate/SKILL.ja.md) |
| アップスケール、背景削除、字幕、リフレーム、リップシンク、トーキングアバター、モーションコントロール | [orchestor-video-edit](skills/orchestor-video-edit/SKILL.ja.md) |
| テキスト読み上げ、ボイスチェンジ、文字起こし | [orchestor-audio](skills/orchestor-audio/SKILL.ja.md) |
| 商品写真から作る商品画像 | [orchestor-product-photoshoot](skills/orchestor-product-photoshoot/SKILL.ja.md) |

## インターフェース

CLI（`orc`）とホスト型 MCP サーバー（`https://mcp.orchestor.io/mcp`）は別々の接続です。使うものそれぞれで認証してください。このプラグインをインストールしても、ワークスペースへのアクセス権は付与されません。

## ジョブとクレジット

生成はすべてジョブで、`COMPLETED`、`FAILED`、`CANCELED` のいずれかで終わります。生成にはワークスペースのクレジットを消費します。ユーザーが頼んだものだけを送信し、同じリクエストを再送するときは idempotency key を再利用してください。

<!-- translation-source-sha256: d7b8e07859dbb2761f0379154ece593674badfd05f55da37bd74861d8d7fc012 -->
