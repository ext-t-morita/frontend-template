# リポジトリマップ

## 現在の構成

現在のリポジトリは workspace 指向の構成を取っています。

- `apps/web/`: Next.js App Router application
- `packages/design-tokens/`: token source と生成物
- `packages/ui/`: shared UI primitives と layout pattern
- `packages/typescript-config/`: shared TypeScript configuration
- `packages/test-utils/`: shared testing helper
- `docs/`: 正本ドキュメント
- `tests/`: repository-level policy / structure check

## 構造ルール

新しい file を追加する時は、可能な限り低い正しい layer に置きます。

- token や visual foundation の変更: `packages/design-tokens/`
- reusable primitive や shared pattern: `packages/ui/`
- app-specific composition: `apps/web/components/` または `apps/web/features/`
- route composition と data fetching の入口: `apps/web/app/`
- repository policy や process: `docs/`

繰り返し始めた app-local pattern は、重複させず shared package へ昇格させます。
