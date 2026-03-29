# 技術ベースライン

この checklist は、実装を固定する前に project ごとの技術選択を決めるためのものです。

## core platform

- deployment platform
- runtime region strategy
- edge vs node execution boundary
- cache / invalidation approach

## application concerns

- auth
- session model
- database
- ORM / query layer
- migrations
- env schema / secret management
- background jobs
- file storage
- search

## commercial / communication concerns

- billing
- invoicing model
- email provider
- notification channel

## reliability / operations

- observability
- error tracking
- analytics
- feature flags
- CI/CD
- backup / recovery expectation

## decision template

各項目で記録するもの:

- current choice
- その選択が project に合う理由
- 制約や open question
- 実装前に必要な follow-up
