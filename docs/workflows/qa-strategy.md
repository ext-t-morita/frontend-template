# QA 戦略

このリポジトリでは、Chromatic は標準の QA stack に含めません。

標準の QA stack は次です。

- Storybook: component contract, isolated visual review, interaction coverage
- Playwright: durable visual regression と browser behavior contract
- E2E: critical route-level behavior
- framework-aware ESLint: Next.js と Storybook 固有の static check

## 役割分担

### Storybook

用途:

- component state と variant の確認
- 開発中の visual review
- play-function 相当の interaction check
- addon や test による accessibility smoke

標準 addon baseline には `@storybook/addon-a11y` を含めます。

shared UI work の最初の確認場所は Storybook です。  
shared component に story がなければ成熟した component と見なしません。

### Playwright

用途:

- stable page / stable state の visual regression
- route-level browser behavior
- modal, focus, form, navigation, table の integration check

tiny visual variant ごとに screenshot regression を増やしません。

### E2E

用途:

- app boot
- auth がある場合の entry flow
- primary create flow
- primary edit flow
- primary search / filter flow
- destructive confirmation flow

E2E suite は lean に保ちます。story 不足を E2E で置き換えません。

## Chromatic を標準にしない理由

この starter では、Storybook, Playwright, visual regression の組み合わせで標準品質を満たせるためです。

ただし、次が必要になったら導入を検討します。

- hosted PR visual diff review
- branch 間の baseline approval workflow
- 非エンジニアを含む UI diff review

その場合は `docs/decisions/` に decision を残します。

## 最低限の CI 期待値

handoff や merge 前に、少なくとも次が実行できる状態であるべきです。

```bash
pnpm lint:framework
pnpm lint
pnpm format:check
pnpm test
pnpm typecheck
pnpm tokens:build
pnpm build
pnpm --filter @repo/web build-storybook
pnpm --filter @repo/web test:e2e:list
```
