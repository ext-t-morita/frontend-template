import preview from "../../.storybook/preview";
import { Skeleton } from "../../packages/ui/src/components/ui/Skeleton";

const meta = preview.meta({
  title: "UI/Skeleton",
  component: Skeleton,
});

export const Lines = meta.story({
  render: () => (
    <div className="max-w-md space-y-3">
      <Skeleton className="w-40" />
      <Skeleton className="w-full" />
      <Skeleton className="w-5/6" />
    </div>
  ),
});

export const Blocks = meta.story({
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Skeleton shape="block" />
      <Skeleton className="w-32" shape="pill" />
    </div>
  ),
});
