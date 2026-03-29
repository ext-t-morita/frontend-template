import preview from "../../.storybook/preview";
import { Button } from "../../packages/ui/src/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../packages/ui/src/components/ui/Tooltip";

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
