# User Provisioning SaaS Starter

Next.js 16 / React 19 / TypeScript strict / **Tailwind v4（CSS-first + tokens）** / Storybook 10 / Biome + ESLint / pnpm + Lefthook 構成の SaaS スターターです。フレームワークや実装規約は `AGENTS.md` を必ず参照してください。

---

## 1. 必須環境

| ツール  | バージョン                      | 備考                        |
| ------- | ------------------------------- | --------------------------- |
| Node.js | >= 20.18.0                      | Next.js 16 推奨 LTS         |
| pnpm    | 10.24.0 推奨                    | `packageManager` に合わせる |
| Git     | GitHub Flow 前提                | Lefthook は任意で有効化     |
| OS      | macOS 15+ / Ubuntu 22.04 / WSL2 | 上記で検証済み              |

React Compiler は未設定です。必要になったら `next.config.ts` で有効化してください。

---

## 2. 初期セットアップ

1. `cp .env.example .env`
2. `.env` に `AUTH_SECRET` / OAuth クライアント ID/Secret を投入
3. `pnpm install` （Lefthook を有効化したい場合は `pnpm approve-builds` を実行）
4. 開発サーバー: `pnpm dev` → http://localhost:3000  
   Storybook: `pnpm storybook` → http://localhost:6006
5. E2E 準備（任意）: Playwright smoke を走らせる場合は `BASE_URL=http://localhost:3000 pnpm exec playwright test`

---

## 3. 環境変数

| 変数名               | 用途                       | 備考                               |
| -------------------- | -------------------------- | ---------------------------------- |
| `NEXTAUTH_URL`       | Auth.js コールバック URL   | ローカルは `http://localhost:3000` |
| `AUTH_SECRET`        | Auth.js JWT 暗号鍵         | `openssl rand -base64 32` 推奨     |
| `AUTH_GITHUB_ID`     | GitHub OAuth Client ID     | `.env.example` を参照              |
| `AUTH_GITHUB_SECRET` | GitHub OAuth Client Secret | 同上                               |

Auth.js v5 はこれから組み込む想定です。導入時は `src/app/api/auth/[...nextauth]` などに配置し、型とテストを同居させてください。

---

## 4. スクリプト

| コマンド                                     | 説明                                                                                            |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `pnpm dev`                                   | 開発サーバー起動                                                                                |
| `pnpm build` / `pnpm start`                  | 本番ビルド / 実行（デフォは Turbopack）                                                         |
| `pnpm build:webpack`                         | Turbopack で問題が出る場合のフォールバックビルド                                                |
| `pnpm lint`                                  | Biome + ESLint の複合チェック                                                                   |
| `pnpm lint:biome` / `pnpm lint:eslint`       | 個別実行（高速確認/詳細確認）                                                                   |
| `pnpm format`                                | Prettier（md/json 等）→ Biome（TS/JS）の順で整形                                                |
| `pnpm format:prettier` / `pnpm format:biome` | 各整形のみ                                                                                      |
| `pnpm format:unsafe`                         | Biome の unsafe write                                                                           |
| `pnpm typecheck`                             | `tsc --noEmit`                                                                                  |
| `pnpm check`                                 | `pnpm lint` + `pnpm typecheck` セット                                                           |
| `pnpm tokens:build`                          | `src/ui/tokens/index.ts` をソースとして `variables.css` を生成（Lefthook pre-commit で自動実行） |
| `pnpm storybook` / `pnpm build-storybook`    | Storybook 起動 / ビルド                                                                         |
| `pnpm test`                                  | Vitest                                                                                          |
| `pnpm test:storybook`                        | Storybook Test Runner（別ターミナルで `pnpm storybook -- --ci --port 6006` を起動してから実行） |
| `pnpm prepare`                               | Lefthook install                                                                                |

---

## 5. ディレクトリとアーキテクチャ（FSD-lite）

```
src/
 ├─ app/            # App Router（RSC ベースの画面構造）
 ├─ features/       # ビジネス機能単位（components/actions/hooks/model を同居）
 ├─ entities/       # ドメインモデル
 ├─ shared/         # 共通ロジック（hooks/utils/lib）
 ├─ ui/             # Design System。tokens/primitives/components/layout
 ├─ widgets/        # 小規模 UI 集合体
 ├─ processes/      # 複数 feature を横断する業務フロー
 └─ tests/          # 統合/ユニット/visual/E2E
```

トークンは `src/ui/tokens` で管理し、Tailwind v4 では `@config` / `@source` を `globals.css` に記述して設定ファイルを明示的に読み込みます。`app/` には複雑ロジックを置かず、`features/` か `shared/` に寄せてください。

### Design System / Typography
- フォントSOOT: `src/ui/tokens/index.ts` → `pnpm tokens:build` で `variables.css` 生成。
- ベース: **Noto Sans JP + Inter + system UI**（body / 標準テキスト）。
- 見出し: **Noto Serif JP** を優先（`font-heading` ユーティリティ、または h1–h3 のベース指定済み）。
- Tailwind拡張: `font-sans` / `font-serif` / `font-heading` は CSS変数を参照するよう `tailwind.config.ts` で再定義。

### ビルドのトラブルシュート
- Turbopack パニックや環境依存エラーが出る場合は `pnpm build:webpack` を使用（`NEXT_BUILDER=webpack next build`）。CI ではデフォルトの Turbopack を使用。

## 9. 初期スキャフォールド / CDD の入り口
- `features/auth` に Server Action（`invite-user`）、Client コンポーネント（`InviteForm`）、ドメインモデルを配置済み。
- API 契約は `types/api/auth.ts` から共有。Server/Client と Storybook で同じ型を利用する方針。
- 認可ポリシーの初期 ADR: `docs/ADR-0001-authz.md`。

### 配置とインポートの原則（FSD-lite）
- 汎用 UI（Design System）: `@/ui/components` / `@/ui/tokens` を参照し、feature 固有の props を持たない。
- 機能固有のロジック・UI 組み立て: `src/features/<name>/...` に閉じる。例: `@features/auth/components/InviteForm`.
- ドメインモデルが複数機能で共有されると判断した時点で `src/entities` または `src/types` へ昇格させる。
- API 契約は `src/types/api/<feature>.ts` に置き、Server Actions / Route Handlers / Client で共通利用する。

### CDD チェックリスト（最小版）
1. 課題を Issue 化（対象 feature、必要な環境変数、Server Action/Route を明記）
2. ADR が必要なら `docs/ADR-xxxx.md` を追加し、AGENTS/README と整合性確認
3. `features/<name>` に実装（Server Action + Client UI + 型 + テストを同居）
4. Storybook を更新（CSF Factories 形式、Docs/Controls 確認）
5. `pnpm tokens:build`（自動）、`pnpm lint`、`pnpm typecheck` を実行
6. PR では UI 変更なら Chromatic / VRT を添付、セキュリティはチェックリストを参照

---

## 6. 開発フロー / 品質ゲート

- TDD + Storybook を真実のソースとし、UI 変更は Chromatic（CI で publish）を通す。
- Push 前推奨: `pnpm check`（lint + typecheck）。UI 変更時は `pnpm test:storybook` も。
- Lefthook は導入済みですがコマンドはコメントアウトされています。必要なら `lefthook.yml` を編集して有効化してください。
- シークレットは `.env` / `.env.local` に置き、`.env.example` を随時更新すること。

---

## 7. CI

`.github/workflows/ci.yml` で以下を実行します。

1. pnpm 10.24.0 / Node 20 でセットアップ、`pnpm install --frozen-lockfile`
2. Playwright ブラウザをインストール（Storybook tests 用）
3. `pnpm lint`（Biome + ESLint） → `pnpm typecheck`
4. `pnpm test:storybook`
5. Chromatic へ publish（`CHROMATIC_PROJECT_TOKEN` が必要）

---

## 8. ヒント / FAQ

- ESLint を常時走らせたい場合は `lefthook.yml` のコメントを外して `next lint` などを追加してください。コミット時間が延びる点に注意。
- デザイントークンの単一ソースは `src/ui/tokens/index.ts`。`pnpm tokens:build`（Lefthook pre-commit）が `variables.css` を自動再生成します。`tailwind.config.ts` 拡張も忘れずに。
- Auth Provider を追加するときは `.env.example` にプレースホルダーを忘れず追加し、Server Actions での権限制御を徹底してください。

---

この README はプロジェクト固有情報をまとめています。規約やアーキテクチャの詳細は必ず `AGENTS.md` も併せて参照してください。
