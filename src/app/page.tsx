"use client";

import { useState } from "react";
import { Button, DataTable, Dialog, TextField } from "@/ui/components";

const cards = [
  {
    title: "ユーザー管理",
    body: "RBAC / ABAC をベースにした権限管理と監査ログを前提に設計。",
    tone: "primary",
  },
  {
    title: "セキュリティ",
    body: "OWASP Top 10 準拠、Server Actions も strict security。",
    tone: "emerald",
  },
  {
    title: "デザインシステム",
    body: "FSD-lite + Token 驚異対応。Storybook を真実のソースに。",
    tone: "sky",
  },
];

const users = [
  {
    name: "山田 太郎",
    email: "taro@example.com",
    role: "Owner",
    status: "Active",
  },
  {
    name: "佐藤 花子",
    email: "hanako@example.com",
    role: "Admin",
    status: "Invited",
  },
  {
    name: "田中 健",
    email: "ken@example.com",
    role: "Member",
    status: "Active",
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-12 pb-16 md:px-10">
        <header className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs">
            商用Ready
          </span>
          <div className="space-y-2">
            <h1 className="font-semibold text-3xl tracking-tight md:text-4xl">
              ユーザープロビジョニング基盤
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground">
              Next.js 16 / React 19 / Tailwind / Storybook 10 / Biome / Lefthook で構成。
              トークン主導の UI と TDD を前提にした SaaS スターターです。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="button-hover inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground text-sm shadow-md shadow-primary/25 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href="https://storybook.js.org/"
              target="_blank"
              rel="noreferrer"
            >
              Storybook を開く
            </a>
            <a
              className="button-hover inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 font-semibold text-secondary-foreground text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noreferrer"
            >
              ドキュメントを見る
            </a>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="card-hover rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sm"
                style={{
                  backgroundColor:
                    card.tone === "primary"
                      ? "#e5e7ff"
                      : card.tone === "emerald"
                        ? "#d1fae5"
                        : "#e0f2fe",
                  color:
                    card.tone === "primary"
                      ? "#4f46e5"
                      : card.tone === "emerald"
                        ? "#047857"
                        : "#0369a1",
                }}
              >
                {card.title.slice(0, 2)}
              </div>
              <h3 className="font-semibold text-foreground text-lg">{card.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 rounded-lg border border-border border-dashed bg-secondary/60 p-4 text-muted-foreground text-sm md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-semibold text-base text-foreground">トークンセット</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>ブランドカラー: コバルト系 primary とニュートラルグレー基調</li>
              <li>意味色: success / info / warning / danger</li>
              <li>Surface / Border / Shadow / Radius / Spacing / Typography</li>
              <li>Dark mode 対応済み（.dark クラス切替）</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-base text-foreground">次のステップ</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Storybook で UI を真実のソースに</li>
              <li>Biome + Lefthook でチーム規約を自動適用</li>
              <li>Auth / RBAC 構成を features 配下に追加</li>
            </ol>
          </div>
        </section>

        <section className="grid gap-6 rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">主要コンポーネント（トークン準拠）</h3>
              <p className="text-muted-foreground text-sm">
                Storybook で真実のソースとして管理し、Chromatic で VRT が可能です。
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setOpen(true)}>
                確認ダイアログ
              </Button>
              <Button>新規ユーザー</Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <TextField
                label="メールアドレス"
                placeholder="user@example.com"
                required
                description="招待リンク送付に使用します"
              />
              <TextField
                label="表示名"
                placeholder="山田 太郎"
                error="2 文字以上で入力してください"
              />
            </div>
            <div className="rounded-lg border border-border border-dashed p-4 text-muted-foreground text-sm">
              <p className="font-semibold">Button バリエーション</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button size="sm">Primary</Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="destructive" size="sm">
                  Destructive
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-base">メンバー一覧（DataTable）</h4>
            <DataTable
              data={users}
              columns={[
                { key: "name", header: "氏名", sortable: true },
                { key: "email", header: "メール" },
                { key: "role", header: "ロール", sortable: true },
                { key: "status", header: "ステータス", sortable: true },
              ]}
            />
          </div>
        </section>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="招待メールを再送しますか？"
          description="未参加ユーザーに再度招待リンクを送信します。"
        />
      </div>
    </main>
  );
}
