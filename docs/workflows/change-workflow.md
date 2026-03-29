# 変更ワークフロー

## 通常の実装フロー

1. 新しい pattern を作る前に `docs/` と既存 code を確認する
2. system-level change なら先に `packages/design-tokens` または `packages/ui` を更新する
3. page-level behavior は root app の既存 building block から組み立てる
4. 継続的なルールを追加したら `docs/` も更新する
5. handoff 前に validation を回す
6. direct external dependency を触る時は range ではなく exact version を優先する
7. manual memoization を減らす変更では、導出ロジックを pure helper とテストへ寄せてから `useMemo` / `useCallback` / `React.memo` を外す

## validation baseline

handoff 前に次を回します。

```bash
pnpm lint:framework
pnpm lint
pnpm format:check
pnpm test
pnpm typecheck
pnpm build
```

全部まとめて回したい時は `pnpm check` を使います。  
ただし `pnpm check` does not include `pnpm lint:framework` です。

Storybook や browser regression を含む時は追加で次を使います。

```bash
pnpm tokens:build
pnpm build-storybook
pnpm test:e2e:list
```

Storybook, Playwright, E2E の責務分担は [`qa-strategy.md`](./qa-strategy.md) を正本とします。

一時的な browser check は local dev mode の `cdpb` + `agent-browser` を優先します。  
CI や恒久的な regression coverage にしたいものだけを Playwright spec にします。  
`app`, `components`, `features`, `packages`, `stories`, `.storybook` を触った変更では、push 前に `pnpm lint:framework` を回します。

## ドキュメントルール

実装変更で既存ドキュメントが偽になったら、同じ変更で `docs/` を更新します。
