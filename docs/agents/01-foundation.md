# 基本方針

## 目的

このリポジトリは、server-first な Next.js アーキテクチャで商用品質の web application UI を作るための土台です。

source of truth は wireframe ではありません。優先順位は次の通りです。

1. Design tokens
2. UI primitives と shared components
3. Storybook stories
4. Playwright tests
5. App pages

Wireframe や mockup は参考情報です。

## Product / UI stack

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- UI primitives: 複雑な振る舞いには Radix Primitives
- Fast component bootstrap: shadcn/ui
- Component workbench: Storybook
- Story format: CSF Next
- Browser / E2E / screenshot regression: Playwright
- Token source of truth: DTCG-style token JSON
- Forms: React Hook Form + Zod を基本とする
- Tables: 特別な理由がない限り TanStack Table
- Icons: project standard icon set のみを使う

## コア原則

### 1. Server-first を基本にする

- Next.js では Server Components を基本にする
- `"use client"` は interaction, browser APIs, local state, imperative UI control が本当に必要な場所だけで使う
- 小さな interactive widget のために page 全体を Client Component にしない
- interactive islands は小さく保つ

### 2. Components より先に tokens

- page や app-local code に再利用される見た目の値を直書きしない
- colors, spacing, radii, typography, shadows, z-index, motion, breakpoints は tokens から出す
- palette 直結の名前より semantic token を優先する

Bad:

- `bg-blue-600`
- `rounded-[10px]`
- `px-[14px]`

Good:

- token 由来の semantic class または CSS variable
- 例: `bg-primary`, `text-muted-foreground`, `rounded-md`

### 3. Accessibility は必須

- dialog, popover, dropdown, tabs, tooltip, menu, select, navigation など複雑な振る舞いは Radix を優先する
- keyboard navigation, focus management, aria labeling, escape handling, screen-reader semantics を維持する
- div ベースの ad-hoc 実装で置き換えない

### 4. Storybook は component contract

- shared UI component には重要な state の story が必要
- story がない component は成熟した component とみなさない
- page に組み込む前に Storybook で component を作り、確認する
- `definePreview`, `preview.meta`, `meta.story` を使う

### 5. Playwright は統合確認に使う

- 細かな見た目調整の主戦場に Playwright を使わない
- critical flow, route-level regression, stable page の visual regression, auth/form/modal/table/navigation behavior に使う
- component 単位の反復は Storybook に寄せる

### 6. Pencil は optional で低権威

- low-fidelity wireframe
- information architecture
- flow sketch
- 初期の認識合わせ

に限って使う。spacing, color, tokens, responsive behavior, component variants の正本にはしない。
