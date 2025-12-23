import type { ComponentProps } from "react";
import preview from "#.storybook/preview";

import { Button } from "./Button";

const meta = preview.meta({
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
  args: {
    children: "保存",
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
});

export default meta;

export const Primary = meta.story({});

export const Secondary = meta.story({
  args: {
    variant: "secondary",
    children: "キャンセル",
  },
});

export const Destructive = meta.story({
  args: {
    variant: "destructive",
    children: "削除",
  },
});

export const Ghost = meta.story({
  args: {
    variant: "ghost",
    children: "詳細を見る",
  },
});

export const Sizes = meta.story({
  render: (args: ComponentProps<typeof Button>) => (
    <div className="flex w-64 flex-col gap-3">
      <Button {...args} size="sm">
        小サイズ
      </Button>
      <Button {...args} size="md">
        標準サイズ
      </Button>
      <Button {...args} size="lg">
        大サイズ
      </Button>
    </div>
  ),
});

export const FullWidth = meta.story({
  args: {
    fullWidth: true,
  },
});
