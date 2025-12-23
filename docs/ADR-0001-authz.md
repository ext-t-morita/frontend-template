# ADR-0001: 認可・ID 管理の初期方針

## 文脈
- 業務 SaaS の多テナント想定。情シス/管理者がユーザーを招待し、RBAC で制御する。
- Next.js 16 (App Router, RSC ベース) + Auth.js v5 を予定。
- トークンは `src/ui/tokens` に集約済み。Design System と一貫した UX を保つ。

## 決定
1. **RBAC 基本ロール**: `owner / admin / member / viewer` を最小セットとして採用。特定機能で ABAC 拡張を許容。
2. **ID プロバイダ**: 初期は Email+Link 招待（Magic Link）をベースにし、後続で SAML/OIDC (Google, Azure AD) をオプション追加。
3. **サーバ境界**: 認可判定は RSC/Server Actions 側で行い、Client では UI 制御のみ（ボタン非活性などの補助）。
4. **API 契約**: 認可関連の API 型は `types/api/auth.ts` に集約し、Server Actions/Route Handler で共用する。
5. **キャッシュ整合性**: Server Actions は `revalidateTag("feature:auth")` を基本とし、一覧取得はタグ付きフェッチを前提にする。

## 影響
- features/auth 配下にドメインモデル/型/Server Action/Client UI を同居（FSD-lite）。  
- Storybook のコンポーネントは CSF Factories で運用し、auth UI は mocks ベースで可視化する。
- 環境変数: `AUTH_SECRET`, `NEXTAUTH_URL`, `DATABASE_URL` を必須。SAML/OIDC 追加時は各 IDP 用を `.env.example` に追加。

## オープン項目
- 監査ログの保存先と保持期間（要: セキュリティ/コンプラ要件確認）。
- Rate Limit 実装レイヤ（Edge / Route Handler / 逆Proxy）とツール選定。
- OIDC/SAML 実装優先度と対象 IDP。
