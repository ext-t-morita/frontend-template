import preview from "../../.storybook/preview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../packages/ui/src/components/ui/AlertDialog";
import { Button } from "../../packages/ui/src/components/ui/Button";

const meta = preview.meta({
  title: "UI/AlertDialog",
});

export const Destructive = meta.story({
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button tone="destructive">Remove access</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke production access?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will interrupt the current
            workflow.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button tone="secondary">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button tone="destructive">Revoke</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
});
