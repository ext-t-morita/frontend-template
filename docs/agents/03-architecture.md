# アーキテクチャ

## 想定するリポジトリ構成

特別な理由がなければ、次を基本構成とします。

```text
.
├─ AGENTS.md
├─ app/
├─ components/
├─ features/
├─ public/
├─ package.json
├─ pnpm-workspace.yaml
├─ packages/
│  ├─ design-tokens/
│  ├─ ui/
│  ├─ eslint-config/
│  ├─ typescript-config/
│  └─ test-utils/
├─ .storybook/
├─ stories/
├─ tests/
└─ docs/
```

## Layer definitions

### `packages/design-tokens`

token source と generation logic を持ちます。

ルール:

- 見た目の土台にする
- app-specific hack を入れない
- DTCG-like naming を優先する
- 生成物は CSS variables, JSON, TS maps, Tailwind-consumable artifacts を含んでよい

推奨構成:

- `base/`: raw scale と primitives
- `semantic/`: role-based meaning
- `themes/`: light/dark/brand themes

### `packages/ui`

再利用可能な code component を置きます。

下位レイヤ:

- `components/ui/`: low-level primitives
- `components/composite/`: 中くらいの複雑さの reusable combinations
- `components/patterns/`: 高レベルの繰り返しパターン

### `components`

app-local component だけを置きます。

ここに置く条件:

- 本当に app-specific
- app 外での再利用が薄い
- route-local assumption に依存する

`packages/ui` を one-off page hack で汚さないこと。

### `features`

feature-oriented domain code を置きます。

各 feature が持つもの:

- server call と action
- schema
- mapper
- feature-local component
- feature-local hook
- 必要なら permission/guard

### `stories`

Storybook stories と docs-only fixture を置きます。

- colocate するか `stories/` に集約するかは揃える
- 両方を無秩序に混ぜない

### `tests`

Playwright と test helper を置きます。

- `e2e/`: critical user journey
- `visual/`: screenshot regression
- `fixtures/`: seeded data や auth/session helper
- `utils/`: shared Playwright helper

## Naming conventions

### Components

- file name と export は PascalCase
- primary component は原則 1 file 1 component

### Hooks

- `useXxx.ts`
- 属する layer の近くに置く

### Server code

- server-only code は `server/` へ寄せる
- client code から import しない

### Tokens

stable で boring な名前にする。

推奨:

- `color.bg.surface`
- `color.fg.default`
- `space.4`
- `radius.md`
- `shadow.overlay`
- `motion.fast`
