"use client";

import { inviteUser } from "@features/auth/actions/invite-user";
import { useState, useTransition } from "react";
import type { InviteUserRequest } from "@/types/api/auth";
import { Button, TextField } from "@/ui/components";

const roles: InviteUserRequest["role"][] = ["admin", "member", "viewer"];

export function InviteForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InviteUserRequest["role"]>("member");
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(null);
        startTransition(async () => {
          const res = await inviteUser({ email, role });
          if (res.ok) {
            setMessage("招待メールを送信しました");
            setEmail("");
          }
        });
      }}
    >
      <TextField
        label="メールアドレス"
        required
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="user@example.com"
      />
      <label className="flex flex-col gap-1 text-foreground text-sm">
        <span className="font-medium">ロール</span>
        <select
          className="h-10 rounded-md border border-border bg-card px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={role}
          onChange={(e) => setRole(e.target.value as InviteUserRequest["role"])}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "送信中..." : "招待メールを送る"}
        </Button>
        {message ? <p className="text-primary text-sm">{message}</p> : null}
      </div>
    </form>
  );
}
