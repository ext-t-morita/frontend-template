# AGENTS.md

本ドキュメントはエンジニア・デザイナー・AI エージェント向けの **共通ルールと開発コンテキスト** です。  
環境変数やデプロイ手順などプロジェクト固有の情報は必ず `README.md` を参照してください。

---

## 0. 基本姿勢

- 最終アウトプットは常に日本語で提供する（英語が必要な場合は理由を明記）。
- すぐに実装へ入らず、方針・代替案・メリデメを提示してから進める。
- TDD を徹底し、UI 変更は Storybook + Chromatic による VRT を経てマージする。
- 定期的に品質スコア（Lint/Format 遵守、Story カバレッジ、型安全性、RSC/Client 境界、セキュリティ診断）を算出し可視化する。
- SaaS 公開前提でセキュリティを最重要とし、OWASP Top 10・RBAC/ABAC・GDPR/APPI を遵守する。
- 調査（GET）に関する web_search は許可するのでいつでも実施可能です。

---

## 1. Tech Stack Snapshot (2025-11)

| Layer       | Choice                                  | Notes                                                                   |
| ----------- | --------------------------------------- | ----------------------------------------------------------------------- |
| Runtime     | Node.js >= 20.18 / pnpm >= 9.12         | `package.json` の `engines` / `packageManager` で固定                   |
| Framework   | Next.js 16 App Router                   | React 19 + React Compiler v1.0 常時有効 (`next.config.ts`)              |
| Auth        | Auth.js v5 (NextAuth 5 beta)            | `src/auth.config.ts` / `src/auth.ts` / `src/app/api/auth/[...nextauth]` |
| Styling     | Tailwind CSS v4 (PostCSS preset)        | `src/app/globals.css`、`@theme inline` を Biome で許容                  |
| Language    | TypeScript strict                       | ES2022、path alias `@/*`                                                |
| Lint/Format | Biome (既定)                            | ESLint/`next lint` は必要時のみ                                         |
| Git Hooks   | Lefthook                                | `pnpm prepare` で install、pre-commit で Biome autofix                  |
| Docs        | `README.md` (ops) / `AGENTS.md` (rules) | VS Code workspace: `user-flow-orchestrator.code-workspace`              |

**Branch / Workflow**

- Default: `main`（GitHub Flow 推奨）。Feature branch は push 前に `pnpm typecheck` か `pnpm check` を実行。
- ESLint (`pnpm lint:next`) は重いため必要時のみ。CI に入れる場合は単独ジョブにする。

---

## 2. ディレクトリとアーキテクチャ（FSD-lite + Vertical Slice）

```
src/
 ├─ app/                  # Next.js 16 App Router: レイアウト・ルート・handler のみ
 │  ├─ (routes|groups)/   # Route Group。UI 構造に集中
 │  ├─ api/               # Route handlers（薄い制御層）
 │  └─ proxy.ts           # Next 16 proxy(旧 middleware)。軽い認可・リダイレクトのみ
 ├─ features/             # ビジネス機能単位 (auth, billing, dashboard ...)
 │  └─ <feature>/         # components/actions/hooks/model を同居させ責務を閉じる
 ├─ entities/ or model/   # ドメインモデル
 ├─ ui/ or components/    # Design System (primitives + components)。feature 特化 props は持たない
 ├─ shared/ or lib/       # cross-cutting: db/auth/observability/config
 ├─ widgets/processes/    # 小規模 UI 集合体 / 複数 feature 横断プロセス
 └─ tests/                # 統合/ユニット/visual/E2E
```

- `app/` は UI 構造とルーティングに限定し、複雑ロジックは `features/` か `lib/` へ。
- Code ownership を `features/<name>` 単位で持ち、テストも同居させる。
- API 契約は `types/api/<feature>.ts` 等で型を共有しバージョン管理。

---

## 3. RSC / Client 境界ポリシー

**RSC に置くもの**: データ取得、非公開ロジック（権限判定・料金計算）、SEO 必須構造、キャッシュ可能な静的内容。  
**Client に置くもの**: フォームやモーダルなどの UI インタラクション、Hooks、リアルタイム更新、ローカル状態。  
迷ったら「UI イベントが必要なら Client、それ以外は RSC」。

---

## 4. TypeScript / Next.js / React Compiler ルール

1. `strict` / `noUncheckedIndexedAccess` / `exactOptionalPropertyTypes` / `noImplicitOverride` / `verbatimModuleSyntax` を維持。`allowJs: false`。
2. 基本は Server Component。クライアント状態が必要なときだけ `"use client"` を付与。
3. Next 16 では `await cookies() / headers() / params / searchParams` を必須で呼ぶ。
4. React Compiler 前提: 不要な `useMemo`/`useCallback` は避け、入れる場合は理由コメントを残す。
5. Server Actions: `"use server"` + `updateTag("feature:resource")` でキャッシュ整合性を担保。Form から呼ぶ際は `useFormStatus` などで UX を確保。
6. Data fetching: `cacheLife` / `cacheTag` を明示し、動的データは `cacheLife("zero")` や `unstable_noStore()` で無制限キャッシュを避ける。
7. Proxy (`src/proxy.ts`): 軽量ロジックのみ。重い処理は Route Handler へ。

---

## 5. Design System / Styling

- Tailwind v4 + PostCSS。`globals.css` から design token を `@theme inline` で export。Biome の `useSortedClasses` に従いユーティリティ順序を整える。
- デザイントークンの単一ソースは `src/ui/tokens/index.ts`。`pnpm tokens:build`（Lefthook pre-commit が自動実行）で `variables.css` を再生成し、Tailwind v4 から参照する。
- Design System は `ui/` or `components/` に配置。再利用前提で feature 特化 props を避ける。
- Token 原則: フラット命名・Light/Dark 両対応・WCAG 準拠コントラスト。
- コンポーネント原則: ARIA 遵守、Radix UI ポリシーに準拠、Control と Presentation を分離。
- フォント方針: Body=**Noto Sans JP + Inter + system-ui**、Heading=**Noto Serif JP**（h1〜h3 はベースで serif 指定、Tailwind `font-heading` も用意）。
- CDD 入口: `features/<name>` に Server Action / Client Component / model / types を同居させ、API 契約は `types/api/<name>.ts` に置く。初期サンプルとして `features/auth` + `types/api/auth.ts` を配置。
- 配置/インポート原則: 汎用 UI は `@/ui`（feature 特化 props は持たせない）。機能固有の組み立て・ロジックは `src/features/<name>` に閉じ、複数機能で共有すると判断した段階で `src/entities` または `src/types` へ昇格させる。API 契約は `src/types/api/<feature>.ts` に集約。

---

## 6. Auth / セキュリティ

- Auth.js v5 設定は `src/auth.config.ts` を起点にし、Node 固有ロジックは `src/auth.ts` で注入。Guard したいパスは `guardedRoutes` などで定義。
- Server Action での権限制御を徹底し、API には Rate Limit を適用。
- Secret は Git に含めない。`.env.example` を更新し、実値は `.env.local` に置く。
- Cookie は Secure / HttpOnly / SameSite=strict。CSRF/XSS/SQLi を必ず防御。
- 重要操作には監査ログを残し、エラーメッセージで攻撃者に情報を与えない。

---

## 7. Tooling & Automation

- **Biome**: `pnpm lint` / `pnpm lint:biome` / `pnpm format`。`lefthook` pre-commit で `biome check --write` が走る。
- **ESLint**: `eslint.config.mjs` は Next 公式 config。`pnpm lint:next` は必要時のみ。
- **Lefthook**: `pnpm prepare` で install。追加 hook は `lefthook.yml` へ記載し、重い処理は pre-push/CI に逃がす。
- **Scripts**: `pnpm dev`（React Compiler 有効）、`pnpm build`（typecheck 付き）、`pnpm typecheck`、`pnpm check`（Biome + TypeScript）、`pnpm tokens:build`（tokens→variables.css 生成）。

---

## 8. テスト / 品質ゲート

- Unit/Feature: `features/<name>/__tests__` に併置。Vitest などを利用。
- Visual: Storybook + Chromatic を真実のソースとし、UI 変更は必ず VRT を通す。
- Integration: RSC + Client の組み合わせを重点的に。
- E2E: Playwright（予定含む）。
- Push 前チェック例: `pnpm lint` → `pnpm check` or `pnpm typecheck`。必要に応じ `pnpm lint:next`。

---

## 9. コラボレーションとドキュメント更新

- 新規参加者や AI には「AGENTS.md → README.md → 対象 feature ディレクトリ」の順で読んでもらう。
- Issue/PR には対象 `features/<name>`、追加/変更する Server Action or Route、必要な環境変数を明記。Next.js 16 仕様（async params, proxy 等）を満たすかも記載。
- 大規模改修は `docs/ADR-<number>.md` で意思決定を残し、AGENTS/README との整合を保つ。
- 実装で必要と判断した場合は AGENTS.md / README.md を適宜更新する。

---

## 10. クイックチェックリスト

1. `pnpm install` → 必要なら `pnpm approve-builds` で lefthook を許可。
2. `cp .env.example .env` してシークレットを `.env.local` に設定。
3. 作業は `features/<name>` または design system (`ui/`/`components/`) に追加。`app/` では UI 構造に限定。
4. 新規 API / Server Action は型とテストを同ディレクトリに置く。
5. コミット前に `pnpm lint`、push 前に `pnpm check` or `pnpm typecheck`。UI 変更は Storybook + Chromatic で確認。

---

この `AGENTS.md` を常に最新・簡潔に保ち、`README.md` と役割を分離することで、AI / 人間どちらも高速かつ安全に開発できます。
