# デザインシステムの正本

## 見た目の権威順

見た目に関する決定は、次の順で権威を持ちます。

1. token source files
2. reusable primitives と shared components
3. component stories
4. route-level tests と screenshots
5. page composition

Mockup や Pencil sketch は参考情報です。

## 現在の実装

- token source of truth: [`packages/design-tokens/src/index.json`](../../packages/design-tokens/src/index.json)
- generated token CSS: [`packages/design-tokens/dist/tokens.css`](../../packages/design-tokens/dist/tokens.css)
- shared primitives: `packages/ui/src/components/*`

## ルール

- page-level code に再利用される見た目の値を直書きしない
- 繰り返す spacing, color, typography, radius, shadow は token に昇格する
- palette 由来の名前より semantic token name を優先する
- light / dark の差分は theme token で吸収し、component 側で `rgba(...)` や palette 値を直書きしない
- hover, selected, focus, danger など interaction/state 色も semantic token に揃える
- accessibility-sensitive な interaction logic は page-local の ad-hoc 実装ではなく shared primitive に置く
