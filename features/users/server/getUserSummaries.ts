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
  { id: "usr_4", name: "Theo Dunn", role: "Security Lead", status: "active" },
  { id: "usr_5", name: "Mira Patel", role: "Support Admin", status: "paused" },
  { id: "usr_6", name: "Iris Long", role: "Finance Ops", status: "active" },
  { id: "usr_7", name: "Rae Kim", role: "Workspace Admin", status: "invited" },
  { id: "usr_8", name: "Omar Reed", role: "Release Manager", status: "active" },
  { id: "usr_9", name: "Lena Hart", role: "Compliance Lead", status: "paused" },
  { id: "usr_10", name: "Alex Rivera", role: "Operator", status: "active" },
  { id: "usr_11", name: "Esme Boyd", role: "Reviewer", status: "invited" },
  {
    id: "usr_12",
    name: "Sora West",
    role: "Platform Engineer",
    status: "active",
  },
];

export async function getUserSummaries(): Promise<UserSummary[]> {
  return userSummaries;
}
