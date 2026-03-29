import { HomePageView } from "../components/layouts/HomePageView";
import { getUserSummaries } from "../features/users/server/getUserSummaries";

export default async function HomePage() {
  const users = await getUserSummaries();
  return <HomePageView users={users} />;
}
