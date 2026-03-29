import preview from "../../.storybook/preview";
import { HomePageView } from "../../apps/web/components/layouts/HomePageView";

const meta = preview.meta({
  title: "Pages/Home Page",
  component: HomePageView,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    users: [
      { id: "usr_1", name: "Ava Cole", role: "Product Ops", status: "active" },
      {
        id: "usr_2",
        name: "Jules Park",
        role: "Platform Lead",
        status: "active",
      },
      {
        id: "usr_3",
        name: "Nina Shaw",
        role: "Billing Admin",
        status: "invited",
      },
    ],
  },
});

export const Default = meta.story();
