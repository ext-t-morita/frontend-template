export type UserRole = "owner" | "admin" | "member" | "viewer";

export type UserStatus = "active" | "invited" | "suspended";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
};
