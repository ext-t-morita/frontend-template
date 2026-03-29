export type UserSummary = {
  id: string;
  name: string;
  role: string;
  status: "active" | "invited" | "paused";
};

const userSummaries: UserSummary[] = [
  { id: "usr_1", name: "Ava Cole", role: "Product Ops", status: "active" },
  { id: "usr_2", name: "Jules Park", role: "Platform Lead", status: "active" },
  { id: "usr_3", name: "Nina Shaw", role: "Billing Admin", status: "invited" },
];

export async function getUserSummaries(): Promise<UserSummary[]> {
  return userSummaries;
}
