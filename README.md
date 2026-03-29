# ワークスペース概要

商用 UI を前提にした `pnpm workspace + Next.js App Router` の土台です。

リポジトリ運用と設計の正本は [docs/README.md](./docs/README.md) です。  
`AGENTS.md` は agent 向けの入口であり、正規ドキュメント本体ではありません。

## 前提

- CI は Node.js `24.14.1` を使います。ローカルも `Node.js 24.x` を推奨します
- `pnpm` は [`package.json`](./package.json) の `packageManager` で固定しています。初回は `corepack enable` を実行してください

## セットアップ

```bash
corepack enable
pnpm install
# 必要なら .env.example を .env.local にコピー
pnpm tokens:build
pnpm dev
```

CI や厳密な再現性確認では次を使います。

```bash
pnpm install --frozen-lockfile
```

## 検証

日常の確認:

```bash
pnpm lint
pnpm format:check
pnpm test
pnpm typecheck
```

handoff 前や CI 相当の確認:

```bash
pnpm lint:framework
pnpm tokens:build
pnpm test
pnpm build
pnpm build-storybook
pnpm test:e2e:list
```

`pnpm check` は `lint`, `format:check`, `test`, `typecheck`, `build` をまとめて回します。  
`pnpm check` does not include `pnpm lint:framework` なので、`app`, `components`, `features`, `stories`, `.storybook` を触った時は別で実行してください。

## Starter の使い始め方

1. [docs/initialize/README.md](./docs/initialize/README.md) を開き、初期化フローを確認する
2. [technical-baseline.md](./docs/initialize/technical-baseline.md) と [product-shape.md](./docs/initialize/product-shape.md) を埋める
3. 決まった内容を `docs/decisions/` に記録してから、具体実装を固定する

## コマンド早見表

| Command                | 使う場面                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `pnpm dev`             | ローカル開発サーバーを hot reload 付きで起動する                                    |
| `pnpm tokens:build`    | token JSON を変更した                                                               |
| `pnpm lint`            | 普段の速い lint を回す                                                              |
| `pnpm lint:fix`        | Biome で自動修正したい                                                              |
| `pnpm lint:framework`  | `app`, `components`, `features`, `stories`, `.storybook` を触って push 前確認したい |
| `pnpm test`            | unit / docs / structure test を回す                                                 |
| `pnpm typecheck`       | packages と app の型検査をしたい                                                    |
| `pnpm build`           | production build を確認したい                                                       |
| `pnpm check`           | 最終確認をまとめて回したい。`lint:framework` は別で回す                             |
| `pnpm storybook`       | Storybook 開発サーバーを起動して UI を確認したい                                    |
| `pnpm build-storybook` | Storybook build を確認したい                                                        |
| `pnpm test:e2e:list`   | Playwright spec 一覧を見たい                                                        |
| `pnpm test:e2e`        | Playwright を実行したい                                                             |
| `pnpm hooks:install`   | lefthook を入れ直したい                                                             |

- TypeScript files: Biome
- TypeScript 以外のファイル: Prettier
- Framework-aware lint: `Next.js` と `Storybook` 用の ESLint を `pre-push` と CI で実行
- Git hooks: lefthook（`prepare` で自動導入。必要なら `pnpm hooks:install`）
- 生成される token CSS: `pnpm tokens:build`

## ワークスペース構成

- `app`, `components`, `features`, `public`: root-level Next.js App Router application
- `packages/design-tokens`: token source files と生成物
- `packages/ui`: shared UI primitives と patterns
- `packages/typescript-config`: shared TypeScript configuration
- `stories/`: Storybook stories
- `tests/`: repository policy / structure / browser regression の入口
- `docs/`: 正本ドキュメント

## Shared UI と QA

- shared primitives には `Button`, `Badge`, `Input`, `SurfaceCard` を含みます
- Storybook は `stories/` 配下の CSF Next stories を使います
- Playwright config は `playwright.config.ts` にあります
- app-level browser coverage は `tests/e2e/` と `tests/visual/` から始めます
- 一時的な画面確認は `cdpb` + `agent-browser` を優先し、恒久的な回帰確認だけを Playwright spec に上げます
