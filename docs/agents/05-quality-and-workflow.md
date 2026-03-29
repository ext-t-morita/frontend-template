# 品質とワークフロー

## 必須 Storybook coverage

shared component では次を説明します。

- purpose
- 実際に重要な props
- variants
- states
- 必要なら responsive behavior
- 複雑な behavior なら accessibility note

最低限の stories:

- default
- disabled
- loading
- error
- destructive / warning
- long content
- dark mode

foundation 系も docs や story を持ちます。

- color tokens
- typography scale
- spacing scale
- radii
- elevation/shadow
- motion

## 必須 Playwright coverage

E2E を網羅的にしようとしません。重要な flow を押さえます。

最低限の対象例:

- app boot / authenticated landing
- sign in / sign out
- primary create flow
- primary edit flow
- search/filter/list flow
- destructive confirmation flow
- modal/dialog accessibility smoke flow
- stable page state ごとの screenshot regression

良い screenshot target:

- dashboard loaded
- table with data
- empty state
- form with validation errors
- destructive dialog
- dark mode key screen

## responsive / theming rule

- light/dark theme は token から出す
- theme switch で component fork を作らない
- responsive behavior は component/page 側にあってよいが、breakpoint の約束は shared convention に従う
- feature ごとに bespoke breakpoint を増やさない

## anti-pattern

明示的な理由がない限り次はやらない。

- 大きな route segment を不要に Client Component にする
- page に random な color/spacing を直書きする
- 急ぐために shared Button/Input/Dialog を bypass する
- tiny visual iteration の最初の手段として Playwright を使う
- business-domain logic を `components/ui` に入れる
- page-specific hack を `packages/ui` に入れる
- inaccessible な custom popover/menu/dialog を作る
- shadcn example を正規化せずそのまま使う
- one-off page quirk のために token を増やす
- Pencil mockup を実装の真実として扱う

## 期待する workflow

通常の流れ:

1. 必要なら Pencil で rough sketch
2. 必要な token / primitive / pattern を確認
3. token を実装または拡張
4. primitive または composite component を実装
5. Storybook story を追加・更新
6. Storybook で visual validation
7. Next.js page/feature に組み込む
8. critical path にだけ Playwright を追加
9. pattern が繰り返されたらすぐに共通化

AI agent 向け:

1. 既存 token/component/story/test を先に探す
2. 作る前に再利用する
3. 可能な限り低い layer に置く
4. 見た目の変更は tokens に揃える
5. 振る舞いの変更は shared primitive に揃える
6. code と一緒に stories/tests も更新する
7. AGENTS.md から外れる判断は task output や PR に残す

## review checklist

- React Compiler が有効な file で `useMemo`, `useCallback`, `React.memo` を新規追加していないか
- manual memoization を残す場合、profiler 根拠または stable reference requirement がコードや PR に明記されているか
- manual memoization を外した変更では、導出ロジックが pure helper または render-time calculation に寄っているか
- table, combobox, multiselect のような stateful primitive では、参照安定性を暗黙期待する third-party API を壊していないか

## 判断ガイド

`packages/ui` に置くべきか:

- 複数 page/feature で再利用する
- design system surface に含めたい
- 特定 route/domain に密結合ではない

`features/...` に置くべきか:

- domain-specific
- feature schema や server action に強く依存する
- cross-domain reuse が薄い

token にすべきか:

- 今すでに繰り返している
- 近いうちに繰り返しそう
- brand/theme/system intent を表す
- 複数 component で揃えたい

Storybook story を作るべきか:

- shared component
- non-trivial state
- visual regression risk
- isolated に見える behavior complexity

Playwright test を作るべきか:

- route-level behavior が重要
- critical user journey
- component 間の integration が重要
- page-level screenshot regression の価値が高い

## 最後のルール

短期的な速さのために system を飛ばさないこと。

このリポジトリでは:

- tokens が一貫性を守る
- shared components が再利用を守る
- Storybook が iteration quality を守る
- Playwright が integrated behavior を守る
- Next.js pages が product を組み立てる
- Pencil は初期検討だけを助ける
