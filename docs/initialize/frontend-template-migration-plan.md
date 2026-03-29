# 移行計画

`frontend-template` からは、取り込む価値がある差分だけを移します。

このリポジトリは今の workspace-first / docs-first な形を維持します。  
tooling を取り込むために single-app starter へ戻しません。

## 取り込むもの

- lint, typecheck, test, build, Storybook build を回す GitHub Actions CI
- 明示的な `pnpm typecheck`
- Biome の上に乗る Next.js / Storybook 向け ESLint
- Storybook 側の QA baseline
- JSON source から generated CSS artifact へつなぐ token build automation
- `.env.example` と env 契約の文書化

## 取り込まないもの

- Chromatic
- single-app 前提の directory assumption
- repo 固有の product naming
- `docs/initialize/*` で auth を決める前の Auth.js 実装
- Turbopack に問題が出る前の webpack fallback build

## 実装順

### Phase 1: CI と validation contract

目的: local と CI の両方で同じ品質基準を強制する

作業:

1. `.github/workflows/ci.yml` を追加する
2. `pnpm typecheck` を追加する
3. `pnpm check` に `typecheck` を含める
4. `lint`, `format:check`, `test`, `typecheck`, `build`, `build-storybook` を CI で回す

先にやる理由: 後続の変更すべてに即座に regression protection を掛けられるため

### Phase 2: lint と Storybook QA

目的: framework-aware lint と component QA の不足を埋める

作業:

1. `eslint.config.mjs` を追加する
2. `eslint-config-next` を有効にする
3. `eslint-plugin-storybook` を有効にする
4. Storybook QA addon を追加する
5. `docs/workflows/qa-strategy.md` に責務分担を明記する

先にしすぎない理由: backend や product-specific choice に依存せず、component contract だけを強化できるため

### Phase 3: tokens と env contract

目的: setup と token generation を再現可能にする

作業:

1. `tokens:build` を追加する
2. token generation を hook または CI に組み込む
3. `.env.example` を追加する
4. env に関する decision point を `docs/initialize/*` に追加する

この順にする理由: Phase 1 の validation baseline が先に必要なため

### Phase 4: project-level integration

目的: project ごとに違う基盤は、初期化で決めるまで未決定のまま保つ

作業:

1. auth を決める
2. database と ORM を決める
3. billing と email を決める
4. 決定内容を `docs/decisions/` に記録する

最後にする理由: Auth.js, database, billing は starter に早く固定しすぎるべきではないため
