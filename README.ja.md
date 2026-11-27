[English](README.md) | 日本語

# Orchestor Plugin

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

AI クリエイティブプラットフォーム [Orchestor](https://www.orchestor.io)（オーケスター）で、コーディングエージェントから離れずに画像・動画・音声を生成・編集できます。1 回のインストールで、Orchestor のスキルとホスト型 MCP 接続が追加されます。

## インストール

```bash
npx plugins add orchestor-inc/orchestor-plugin
```

表示される一覧からエージェントを選びます。Claude Code を明示する場合:

```bash
npx plugins add orchestor-inc/orchestor-plugin --target claude-code
```

Claude Code のマーケットプレイスコマンドも使えます。

```bash
claude plugin marketplace add orchestor-inc/orchestor-plugin
claude plugin install orchestor@orchestor
```

エージェントを再起動し、`/mcp` を開いて Orchestor にログインし、ワークスペースへのアクセスを許可します。インストールだけではアクセス権は付与されません。

### 対応ツール

| ツール | 状況 |
| --- | --- |
| Claude Code | マニフェストの検証とプラグインのインストールを確認済み |
| OpenAI Codex | プラグインインストーラーへの登録を確認済み。認証後の動作は未検証 |
| Cursor | マニフェストを同梱。動作は未検証 |
| GitHub Copilot CLI | 汎用プラグインマニフェストを同梱。動作は未検証 |
| Grok Build | 汎用プラグインマニフェストを同梱。動作は未検証 |
| Kimi Code | マニフェストを同梱。動作は未検証 |

インストールとセッションフックには Node.js 24 以上が必要です。

## 使い方

作りたいものを伝えます。

> gpt-image-2 で、コンクリートの床に置いた白いスニーカーの商品写真を作って。

> seedance-2.5 で夜明けの波の動画を 5 秒作って、URL を教えて。

> この原稿を落ち着いた日本語の声で読み上げて。

エージェントはスキルとカタログのモデルを選び、ジョブを送信して完了を待ち、成果物を返します。生成には、許可したワークスペースのクレジットを消費します。

## 含まれるもの

| コンポーネント | 内容 |
| --- | --- |
| **MCP** | `.mcp.json` が OAuth で `https://mcp.orchestor.io/mcp` に接続します。プラグインに資格情報は含まれません。 |
| **スキル** | [`orchestor-generate`](skills/orchestor-generate/SKILL.ja.md)（画像と動画）、[`orchestor-video-edit`](skills/orchestor-video-edit/SKILL.ja.md)（アップスケール、背景削除、字幕、リフレーム、リップシンク）、[`orchestor-audio`](skills/orchestor-audio/SKILL.ja.md)（音声合成、ボイスチェンジ、文字起こし）、[`orchestor-product-photoshoot`](skills/orchestor-product-photoshoot/SKILL.ja.md)（商品画像）。 |
| **セッションフック** | セッション開始時に、プラグインのスキルへの短い案内を追加します。読むのは同梱ファイルだけで、プロジェクトの走査、ネットワーク通信、資格情報へのアクセスは行いません。 |

スキルは `orc` CLI でも動きます。`curl -fsSL https://orchestor.io/install | sh` でインストールしてください。CLI と MCP のログインは別々です。

## テレメトリー

このプラグインはテレメトリーを送信しません。CLI や MCP を通じた Orchestor への呼び出しは製品へのリクエストであり、通常の認証に従います。

## スキルの取得元

スキルは [orchestor-inc/skills](https://github.com/orchestor-inc/skills) から、`skills-source.json` に固定したコミットで取り込み、SHA-256 で検証しています。ここで `skills/` を編集しないでください。新しいバージョンを取り込むときは、固定値を更新して次を実行します。

```bash
pnpm sync:skills
pnpm validate
pnpm test
```

プラグインを使わずにスキルだけを入れる場合は、[skills リポジトリ](https://github.com/orchestor-inc/skills)を使います。同じスキルを二重にインストールしないよう、どちらか一方を選んでください。

## 開発

```bash
pnpm validate
pnpm test
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
```

ビルドは不要です。[BENCHMARK.md](BENCHMARK.md) に、参照した Vercel プラグインの固定バージョンを記録しています。

## ドキュメント

- [MCP のセットアップ](https://www.orchestor.io/docs/mcp)
- [CLI リファレンス](https://www.orchestor.io/docs/cli)
- [モデル](https://www.orchestor.io/docs/models)

## ライセンス

[MIT](LICENSE)。

<!-- translation-source-sha256: 57bbf03ded22df0b81894e59ba4d03580f61d55f8cedfe647b33f22ce9d7ab2a -->
