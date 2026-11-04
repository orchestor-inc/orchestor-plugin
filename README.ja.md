[English](README.md) | 日本語

# orchestor-plugin

## はじめに

AI 可視性の調査、ブランドのモニタリング、および引用エビデンスに基づく改善を行うための Orchestor ワークフロー。

### サポートされているツール

| ツール | 配布状況 |
| --- | --- |
| Claude Code | マニフェストの検証およびプラグインのインストールを確認済み |
| OpenAI Codex | プラグインインストーラーの登録を確認済み。認証済みランタイムは未テスト |
| Cursor | マニフェスト同梱。ランタイムは未テスト |
| GitHub Copilot CLI | 汎用プラグインマニフェスト同梱。ランタイムは未テスト |
| Grok Build | 汎用プラグインマニフェスト同梱。ランタイムは未テスト |
| Kimi Code | マニフェスト同梱。ランタイムは未テスト |

### 前提条件

- 上記に記載されているエージェントクライアント。
- インストールおよびセッションフック用の Node.js 24+。
- 同梱されているタスクワークフロー用の Orchestor ワークスペースおよび認証済み CLI。

### インストール

```bash
npx plugins add orchestor-inc/orchestor-plugin
```

プロンプトが表示されたらエージェントを選択します。Claude Code を明示的に対象とする場合:

```bash
npx plugins add orchestor-inc/orchestor-plugin --target claude-code
```

または、Claude Code ネイティブのマーケットプレイスコマンドを使用します:

```bash
claude plugin marketplace add orchestor-inc/orchestor-plugin
claude plugin install orchestor@orchestor
```

エージェントを再起動します。Claude Code では、`/mcp` を開いて Orchestor を承認し、対象のワークスペースを選択します。CLI ワークフローについては、[CLI セットアップガイド](https://orchestor.io/docs/cli) に従い、その後 `orc status` を実行してください。
MCP と CLI の認証は分かれています。インストールによってデータへのアクセス権が付与されることはありません。

## 機能概要

本プラグインは、Orchestor のプロダクトコンテキスト、17 のリソースおよびワークフロースキル、3 つのスペシャリストエージェント、4 つのコマンド、セッション開始フック、およびホストされた MCP 接続を統合します。エージェントがワークフローを選択し、定義されたスコープのエビデンスを返すのを支援します。

## 使い方

期待する結果を説明します。例:

- 「過去 30 日間の当社の可視性をこれらの競合他社と比較して。」
- 「競合他社が引用されていて、当社が引用されていない質問を見つけて。」
- 「この質問を下書きとして追加して。測定はまだ実行しないで。」

エージェントはワークスペースを確認し、関連するスキルを読み込み、利用可能な接続を使用します。書き込みやクレジットを消費する測定は、お客様のリクエストに従って行われます。

## コンポーネント

### エコシステムグラフ (`orchestor.md`)

ワークスペース、ブランド、プロンプト、回答、レポート、ドメイン、および Issues を結び付けるコンパクトなガイドです。決定表により、目標がタスクスキルに対応付けられます。

### スキル

| スキル | 説明 |
| --- | --- |
| [orchestor](skills/orchestor/SKILL.ja.md) | Orchestor ワークフローの選択 |
| [orchestor-aeo-best-practices](skills/orchestor-aeo-best-practices/SKILL.ja.md) | AEO 分析のベストプラクティス |
| [orchestor-aeo-workflows](skills/orchestor-aeo-workflows/SKILL.ja.md) | エビデンスからアクションへとつなげる AEO ワークフローの実行 |
| [orchestor-agentic-web](skills/orchestor-agentic-web/SKILL.ja.md) | エージェント向け Web サイトの評価 |
| [orchestor-answers](skills/orchestor-answers/SKILL.ja.md) | 保存された回答の操作 |
| [orchestor-brands](skills/orchestor-brands/SKILL.ja.md) | ブランドおよびドメインの操作 |
| [orchestor-cli](skills/orchestor-cli/SKILL.ja.md) | Orchestor CLI の操作 |
| [orchestor-integrations](skills/orchestor-integrations/SKILL.ja.md) | エージェントと外部サービスの接続 |
| [orchestor-manage-issues](skills/orchestor-manage-issues/SKILL.ja.md) | Orchestor Issues の管理 |
| [orchestor-perception](skills/orchestor-perception/SKILL.ja.md) | 帰属するブランド特性の分析 |
| [orchestor-prompts](skills/orchestor-prompts/SKILL.ja.md) | プロンプトとそのコンテキストの操作 |
| [orchestor-reports](skills/orchestor-reports/SKILL.ja.md) | 集計レポートの操作 |
| [orchestor-research](skills/orchestor-research/SKILL.ja.md) | Orchestor を使用した公開ソースの調査 |
| [orchestor-runs](skills/orchestor-runs/SKILL.ja.md) | 測定実行の操作 |
| [orchestor-shopping](skills/orchestor-shopping/SKILL.ja.md) | 製品および AI ショッピングエビデンスの分析 |
| [orchestor-sources](skills/orchestor-sources/SKILL.ja.md) | ソースおよび引用の操作 |
| [orchestor-workspace](skills/orchestor-workspace/SKILL.ja.md) | Orchestor ワークスペースの整理 |

### エージェント (3 つのスペシャリスト)

| エージェント | 専門分野 |
| --- | --- |
| `visibility-analyst` | 競合比較、引用、およびエビデンスに裏付けられた推奨事項 |
| `monitoring-specialist` | モニタリングの質問、トピック、タグ、および測定スコープ |
| `integration-expert` | MCP のセットアップおよび CLI 接続のトラブルシューティング |

### コマンド (4 つのコマンド)

| コマンド | 目的 |
| --- | --- |
| `/orchestor:status` | CLI 接続および対象のワークスペースを確認する |
| `/orchestor:visibility` | 可視性を比較し、裏付けとなる回答を調査する |
| `/orchestor:monitor` | 要求されたモニタリング質問を作成または更新する |
| `/orchestor:improve` | エビデンスに基づいて改善事項の優先順位を付ける |

### フック

SessionStart フックは、プラグインの場所、共有ルール、およびワークフローのエントリポイントを含む短い導入文を追加します。パッケージ化されたコンテキストのみを読み取り、プロジェクトのスキャン、ネットワークの呼び出し、認証情報へのアクセスは行いません。フックの可用性とコマンド構文はクライアントに依存します。JSON 出力コントラクトは Claude Code でテストされています。

### MCP

`.mcp.json` および `mcp.json` は `https://mcp.orchestor.io/mcp` を指しています。
クライアントの OAuth フローを使用してください。本プラグインには認証情報は含まれていません。

## 使用方法

Claude Code での使用:

```text
/orchestor:status
/orchestor:visibility Compare our brand with competitors for the last 30 days
/orchestor:monitor Add this question as a draft
```

クライアントが名前空間付きコマンドではなくスキルを公開している場合は、対応するスキルを直接使用してください。クライアントのセットアップについては https://orchestor.io/docs/agent-setup を確認してください。

## テレメトリ

本プラグインはテレメトリを送信しません。CLI または MCP を介した Orchestor への呼び出しは製品リクエストであり、サービスの通常の認証および動作に従います。

## スキルの作成と改善

skills.sh を介して編集可能なスキルファイルを利用する場合は、[Skills リポジトリ](https://github.com/orchestor-inc/skills) を使用してください。重複を避けるため、同一スキルに対しては 1 つのインストール経路を選択してください。その構成例およびアップストリームの skill-creator ガイダンスに従ってください。プラグインの更新にはネイティブクライアントを使用します。Claude Code では `claude plugin update orchestor@orchestor` を実行してください。

## アップストリームスキルの同期

スキルは `skills-source.json` のコミット時点の [orchestor-inc/skills](https://github.com/orchestor-inc/skills) から取得されています。SHA-256 ハッシュにより、インポートされた正確なエントリポイントと参照が保持されます。プラグインのコマンド、エージェント、コンテキスト、およびフックは本リポジトリに存在します。

インポートを再現するには:

```bash
pnpm sync:skills
pnpm validate
pnpm test
```

新しいスキルバージョンを採用する場合は、コミットとハッシュを慎重に更新してください。ここでインポートされた `skills/` ファイルを直接編集しないでください。

## 開発

```bash
pnpm validate
pnpm test
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
```

依存関係のインストールやビルドステップは不要です。ランタイムファイルは直接コミットされています。[BENCHMARK.md](BENCHMARK.md) には、固定された Vercel のリファレンスと Orchestor に適応されたコンポーネントが記録されています。

## ライセンス

[MIT](LICENSE)。

<!-- translation-source-sha256: 455f38b818da44e60f67992dfefa7fa038113d203f077821e13ccd423e8bb4b1 -->
