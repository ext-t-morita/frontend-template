# 実装ルール

## 新しい UI component を作る時

1. 既存の component や pattern で解決できないか確認する
2. 一般的な behavior なら shadcn/ui または既存 primitive を優先する
3. accessibility behavior が複雑なら Radix を直接検討する
4. style は tokens / semantic utility 経由にする
5. Storybook story を app integration より先、または同時に追加する
6. Playwright は route-level behavior や critical workflow に効く時だけ追加する

## 新しい page を作る時

1. 既存 page shell / layout から始める
2. まず shared component を組み合わせる
3. data fetching は可能な限り server に置く
4. interactivity は小さな client component に隔離する
5. 再利用できる page shell なら story を追加する
6. Playwright は critical workflow にだけ追加する

## style を編集する時

1. token にすべき変更かを先に考える
2. 再利用される、またはされそうなら昇格させる
3. raw arbitrary value は one-off で文脈がある時だけ使う
4. palette 直参照より semantic meaning を優先する

## dialog / menu / popover / tooltip を追加する時

- Radix-based pattern を優先する
- keyboard と focus behavior を守る
- custom accessibility behavior を一から発明しない

## form UI を追加する時

- schema と validation を明示する
- pending, success, error, field-level error を扱う
- Storybook には少なくとも次を含める
  - empty
  - invalid
  - pending
  - success representation

## table を追加する時

- shared table foundation を使う
- loading, empty, error, row action, overflow を明示的に扱う
- page-specific な table style fork は極力避ける
