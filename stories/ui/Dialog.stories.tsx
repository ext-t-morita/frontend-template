import preview from "../../.storybook/preview";
import { Button } from "../../packages/ui/src/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../packages/ui/src/components/ui/Dialog";

const meta = preview.meta({
  title: "UI/Dialog",
});

export const Default = meta.story({
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review deployment window</DialogTitle>
          <DialogDescription>
            Confirm the rollout details before promoting the shared package.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button tone="secondary">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
});

export const LongContent = meta.story({
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button tone="secondary">Inspect detail</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extended review</DialogTitle>
          <DialogDescription>
            This story keeps longer content visible for spacing review.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm leading-6 text-[var(--color-fg-muted)]">
          <p>
            Shared primitives need stable spacing and readable long-form copy.
          </p>
          <p>
            Use this state to review close affordance, focus ring, and footer
            layout.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  ),
});
