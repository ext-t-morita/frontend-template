"use client";

import type { ReactNode } from "react";
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
} from "../ui/AlertDialog";
import { Button } from "../ui/Button";

type ConfirmDestructiveActionProps = {
  confirmLabel?: string;
  description: ReactNode;
  onConfirm?: () => void;
  title: ReactNode;
  triggerLabel?: string;
};

export function ConfirmDestructiveAction({
  confirmLabel = "Confirm",
  description,
  onConfirm,
  title,
  triggerLabel = "Delete",
}: ConfirmDestructiveActionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button tone="destructive">{triggerLabel}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
