# ツーリング

## formatter / linter の分担

- TypeScript files（`*.ts`, `*.tsx`）は Biome
- TypeScript 以外は Prettier
- TypeScript に Prettier を使うのは、明示的な移行理由がある時だけ

## 必須 scripts

- `pnpm lint`: TypeScript 向けの Biome lint
- `pnpm lint:framework`: Next.js / Storybook-aware な ESLint
- `pnpm lint:fix`: Biome の安全な自動修正
- `pnpm format`: Biome と Prettier の両方を実行
- `pnpm format:check`: 書き込みなしで format を確認
- `pnpm test`: 自動テスト
- `pnpm typecheck`: workspace 全体の TypeScript validation
- `pnpm tokens:build`: JSON token source から CSS を再生成
- `pnpm build`: production build
- `pnpm check`: lint, format check, test, typecheck, build をまとめて実行
- `pnpm --filter @repo/web storybook`: Storybook dev
- `pnpm --filter @repo/web build-storybook`: Storybook build

## setup policy

- Node ベースの workflow では `make` より `pnpm` scripts を優先する
- 通常の local setup は `pnpm install`
- CI や厳密な再現性確認は `pnpm install --frozen-lockfile`
- `pnpm install` や `pnpm hooks:install` を包むだけの `make init` は作らない

## lefthook policy

- Git hook は `lefthook` で管理する
- Git work tree 内なら `prepare` で hook を自動導入する
- `pre-commit` は staged `*.ts` / `*.tsx` に Biome をかける
- `pre-commit` は staged の非 TypeScript file に Prettier をかけて再 stage する
- token source が変わったら `pre-commit` で token artifact を再生成する
- `pre-push` は `apps/web`, `stories`, `.storybook` に対する framework-aware ESLint を走らせる
- `pre-push` は `pnpm test` または `pnpm build` が落ちたら止める

## agent 向け期待値

- TypeScript 編集時は `pnpm lint:fix` と `pnpm format:biome` を優先する
- Markdown, JSON, CSS, HTML, YAML, config は `pnpm format:prettier` を優先する
- Storybook 編集時は `defineMain`, `definePreview`, `preview.meta`, `meta.story` を使う
- 一時的な browser exploration は `cdpb` と `agent-browser` を優先する
- durable regression coverage にしたい確認だけを Playwright spec へ昇格する
- 可能なら hook と同じ validation を完了前に回す
