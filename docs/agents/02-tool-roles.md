# ツールの役割分担

## Pencil

使うのは次の場合だけです。

- rough wireframe
- 画面棚卸し
- page flow
- 実装前の business layout の議論

次には使いません。

- final design spec
- component API definition
- token definition
- responsive behavior の正本
- accessibility decisions

## Design tokens

見た目の正本は tokens です。

必須 token group:

- color
- spacing
- radius
- typography
- shadow
- border
- motion
- zIndex
- breakpoint

推奨の分け方:

- primitive/base tokens
- semantic tokens
- theme tokens

## shadcn/ui

一般的な component の立ち上げを速くするために使います。

使う場面:

- よくある component が既に存在する
- target behavior が一般的
- opaque dependency wrapper ではなく local source ownership を持ちたい

やること:

- project の token system に合わせて調整する
- naming と variants を揃える
- demo-only code を削る

やらないこと:

- そのまま貼り付けて design system 完了とみなす
- page-specific hack を shared component へ逆流させる

## Radix Primitives

次のときは Radix を直接使います。

- accessibility behavior が複雑
- shadcn abstraction が硬すぎる
- true platform primitive にしたい

例:

- dialog
- dropdown menu
- popover
- tooltip
- tabs
- accordion
- navigation menu
- select-like custom controls

## Storybook

用途:

- isolated component development
- variant review
- loading / empty / error / disabled states
- long-text や edge case の確認
- page integration 前の visual QA
- 他の人間や AI への component docs

shared component の最低限の stories:

- default
- disabled
- destructive / warning
- loading
- error
- long content / overflow
- dark mode
- responsive case

## Playwright

用途:

- route-level smoke test
- critical user journey
- auth-required flow
- modal の open/close と focus return
- form validation と submission
- search/filter/table interaction
- stable page の screenshot regression

やらないこと:

- tiny visual variant ごとに bloated suite を作る
- story 不足を E2E で代替する

## App pages

pages は既存の building block を組み合わせる場所です。新しい styling rule を気軽に発明しません。

page の責務:

- layout composition
- data fetching
- route params / search params
- permission-aware branching
- feature orchestration

page が持たないもの:

- base button/input style
- repeated status badge logic
- raw overlay/menu/focus logic
- duplicated skeleton/empty/error pattern
