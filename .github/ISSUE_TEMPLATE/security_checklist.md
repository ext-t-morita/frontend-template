---
name: "Security & Compliance Checklist"
about: "Rate limit / CSRF / XSS / secrets / audit log 確認用"
title: "[SEC] "
labels: ["security"]
---

- [ ] CSRF 対策：POST/PUT/PATCH/DELETE は CSRF safe（Auth.js / same-site cookies / double-submit 等）
- [ ] XSS 対策：UI はエスケープ済み・危険な `dangerouslySetInnerHTML` 不使用
- [ ] Rate Limit：外部向け Route Handler / Server Actions にレート制限適用
- [ ] 権限制御：Server Actions / Route Handler 側で RBAC/ABAC 判定を実施（Client 依存しない）
- [ ] 監査ログ：重要操作（招待、権限変更、削除）を記録
- [ ] Secrets：`.env.local` にのみ格納、`.env.example` にキーを追加、Git 追跡なしを確認
- [ ] テレメトリ：不要なら Next telemetry を無効化、必要なら開示
