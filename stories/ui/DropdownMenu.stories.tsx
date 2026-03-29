import preview from "../../.storybook/preview";
import { Button } from "../../packages/ui/src/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../packages/ui/src/components/ui/DropdownMenu";

const meta = preview.meta({
  title: "UI/DropdownMenu",
});

export const Default = meta.story({
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button tone="secondary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>View options</DropdownMenuLabel>
        <DropdownMenuItem>Rename workspace</DropdownMenuItem>
        <DropdownMenuItem>Duplicate template</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Compact density
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
});
