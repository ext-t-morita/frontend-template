# Review Flow

## レイヤ判断

- token の問題 -> `packages/design-tokens/`
- shared primitive / shared component の問題 -> `packages/ui/`
- app-local composition の問題 -> `components/`, `features/`, `app/`

同じ defect が複数 story に出るなら、できるだけ下位レイヤへ fix を降ろす。

## 監査の見方

1. story の現状を確認する。
2. 問題を token、shared component、composition、fixture に分類する。
3. story source と実装 file を読み、原因が最小レイヤのどこにあるか確定する。
4. red-first にできる defect なら test か story coverage を先に足す。
5. 最小変更で直し、同じ story を再確認する。
6. shared component 側が整ってから composed story を触る。

## verify commands

```bash
pnpm lint:framework
pnpm lint
pnpm format:check
pnpm test
pnpm typecheck
pnpm build
pnpm build-storybook
```

実行しなかった command があれば理由を書く。
