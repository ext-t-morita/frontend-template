import preview from "#.storybook/preview";

import Dialog from "./Dialog";

const meta = preview.meta({
  title: "UI/Dialog",
  component: Dialog,
  args: {
    open: true,
    title: "確認",
    description: "この操作を実行してもよろしいですか？",
    onClose: () => {},
  },
});

export default meta;

export const Primary = meta.story({});

export const Destructive = meta.story({
  args: {
    tone: "destructive",
    confirmLabel: "削除する",
    onClose: () => {},
  },
});
