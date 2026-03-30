import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/Select",
});

export const Default = meta.story({
  render: () => (
    <div className="max-w-sm">
      <Select defaultValue="review">
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="review">In review</SelectItem>
          <SelectItem value="done">Ready to ship</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
});

export const Disabled = meta.story({
  render: () => (
    <div className="max-w-sm">
      <Select defaultValue="done" disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="done">Ready to ship</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
});
