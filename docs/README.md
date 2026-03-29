# リポジトリドキュメント

## 正本

この `docs/` ツリーが、リポジトリ文書の正本です。

判断に迷ったら、次の順で権威を持つものとして扱います。

1. `docs/design-system/*`
2. `docs/initialize/*`
3. `docs/architecture/*`
4. `docs/workflows/*`
5. `docs/decisions/*`
6. `docs/agents/*`
7. `README.md`
8. Pencil files, wireframes, mockups

`AGENTS.md` はこの文書群への入口であり、置き換えではありません。

## ドキュメント一覧

- [`docs/architecture/repository-map.md`](./architecture/repository-map.md): 現在のリポジトリ構成と今後の基本方針
- [`docs/initialize/README.md`](./initialize/README.md): 実装を固定する前に決めるべき項目
- [`docs/initialize/frontend-template-migration-plan.md`](./initialize/frontend-template-migration-plan.md): `frontend-template` から取り込む差分だけを整理した移行計画
- [`docs/design-system/source-of-truth.md`](./design-system/source-of-truth.md): tokens, primitives, components の権威順
- [`docs/workflows/change-workflow.md`](./workflows/change-workflow.md): 日常の実装と検証の流れ
- [`docs/workflows/qa-strategy.md`](./workflows/qa-strategy.md): Chromatic なし前提の QA 方針
- [`docs/decisions/README.md`](./decisions/README.md): ADR の置き場と運用方針
- [`docs/agents/`](./agents): agent 向けの要約ルール

## 運用ルール

- 継続的に参照される知識は `docs/` に残します。task output や PR 文面だけに閉じ込めません。
- 実装変更で既存ドキュメントが偽になったら、同じ変更で `docs/` も更新します。
- 新しい定常ルールが生まれたら、最も近い文書に追記し、必要なら index からリンクします。
- `README.md` は短く保ち、継続的に参照される詳細は `docs/` へ移します。
