import preview from "#.storybook/preview";

import { TextField } from "./TextField";

const meta = preview.meta({
  title: "UI/TextField",
  component: TextField,
  args: {
    label: "メールアドレス",
    placeholder: "user@example.com",
  },
});

export default meta;

export const Default = meta.story({});

export const WithDescription = meta.story({
  args: {
    description: "招待メール送信に使用されます",
  },
});

export const WithError = meta.story({
  args: {
    error: "正しいメールアドレスを入力してください",
  },
});
