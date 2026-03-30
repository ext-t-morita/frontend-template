import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/Tooltip",
});

export const Default = meta.story({
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button tone="secondary">Hover target</Button>
        </TooltipTrigger>
        <TooltipContent>
          Keyboard and mouse users should get the same hint.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
});
