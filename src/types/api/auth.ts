// Shared API contract for auth-related endpoints / server actions

export type InviteUserRequest = {
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
};

export type InviteUserResponse = {
  ok: true;
  invitationId: string;
};

export type ListUsersResponse = {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: "owner" | "admin" | "member" | "viewer";
    status: "active" | "invited" | "suspended";
  }>;
};
