---
name: storybook-design-polisher
description: Storybook を `cdpb` で起動した Chrome dev browser と CDP 経由で監査し、component-first で UI を改善する skill。`$storybook-design-polisher` または正確な skill 名が明示されたときだけ使い、`pnpm storybook` の起動、`localhost:6006` の確認、指定 story または story 一覧の監査、primitive/shared-component と composed-story の修正分離、改善案の実装と再確認を行う。
---

# Storybook Design Polisher

Storybook をレビュー面にし、design-system の階層を正本として扱う。まず最小の再利用コンポーネントから見て、primitive や shared component の修正で解決しない場合だけ上位 composition へ進む。

## クイックスタート

1. 監査対象を確定する。指定 story のみか、sidebar 全体かを先に決める。
2. 起動と接続の具体手順は [references/session-bootstrap.md](references/session-bootstrap.md) を読む。
3. story 名の指定がなければ、sidebar を最小 primitive から上位 composition へ順にたどる。
4. 最小責務レイヤの判断と監査観点は [references/review-flow.md](references/review-flow.md) を読む。
5. 最小責務レイヤだけを直し、直後に同じ story を再確認する。

## スコープと順序

- user が story を指定した場合は、その story だけを監査する。ただし upstream primitive に原因があるのが明白ならそこまでは遡る。
- scope が "all" の場合は、sidebar を次の順で見る:
  1. primitive と単機能の shared component
  2. 同一 component の variant と state
  3. 複数 component を束ねた shared block
  4. app-level composition
- 再利用 component の修正と composed story の修正は別 workstream として扱い、先に再利用 component 側を終える。

## 監査ループ

1. story の現状を確認し、客観的な問題を列挙する。
2. 問題を token、shared component、composition、fixture に分類する。
3. 編集前に story source、実装 file、周辺 token を確認する。
4. 客観的な defect なら red-first を優先する。自動 assertion に落とせない純 visual issue はその制約を明記する。
5. 変更後に同じ story を開き直して比較する。
6. 再利用 component 側がきれいになってから、まだ違和感が残る composed story を調整する。

## 指摘と報告

- full pass をするとき、または原因がはっきりしないときは [references/visual-audit-checklist.md](references/visual-audit-checklist.md) を読む。
- facts と speculation を分けて報告する:
  - facts: Storybook または code から直接確認できた内容。story 名と file path を付ける
  - speculation: `Possibly` または `Likely` を付け、何を確認すれば確定できるかを書く
- 典型的な違和感の詳細は [references/visual-audit-checklist.md](references/visual-audit-checklist.md) に寄せる。

## 検証

- 意味のある変更 batch ごとに、対象 story を CDP 経由で再確認する。
- code 変更後は関連する自動チェックを回す。
- この repo の推奨 verify commands は [references/review-flow.md](references/review-flow.md) に置く。
- 実行しなかった command があれば理由を明記する。

## 必要なときだけ読む

- layer ownership の判断には `docs/design-system/source-of-truth.md` を使う。
- Storybook と Playwright の責務分離には `docs/workflows/qa-strategy.md` を使う。
- 修正先が `packages/ui/` か app-local code か迷ったら `docs/architecture/repository-map.md` を使う。
