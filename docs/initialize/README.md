# 初期化

## 目的

この section は、実装を固定する前に project の形を決めるために使います。

このリポジトリは、auth, database, billing, tenancy のような SaaS 基盤の選択を最初から固定しません。  
先にここで決め、採用した内容を `docs/decisions/` に記録してから実装へ進みます。

## 初期化フロー

1. [`technical-baseline.md`](./technical-baseline.md) を埋める
2. [`product-shape.md`](./product-shape.md) を埋める
3. 最終決定を `docs/decisions/` の ADR に落とす
4. その後に実装依存の dependency や infrastructure を固定する

## ルール

SaaS 基盤の重要項目が未決定なら、コードで推測せず `docs/initialize/*` を現在の source of truth として扱います。
