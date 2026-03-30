import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/Drawer",
});

export const RightRail = meta.story({
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold text-[var(--color-fg-default)]">
            Team settings
          </DrawerTitle>
          <DrawerDescription className="text-sm leading-6 text-[var(--color-fg-muted)]">
            Review contextual controls without leaving the current page.
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-6 space-y-3 text-sm text-[var(--color-fg-muted)]">
          <p>Notifications</p>
          <p>Audit export</p>
          <p>Danger zone</p>
        </div>
        <DrawerFooter>
          <Button tone="secondary">Cancel</Button>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
});
