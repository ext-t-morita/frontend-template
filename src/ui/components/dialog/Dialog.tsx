"use client";

import { useEffect } from "react";

type DialogProps = {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "primary" | "destructive";
  onConfirm?: () => void;
};

export const Dialog = ({
  title,
  description,
  open,
  onClose,
  confirmLabel = "OK",
  cancelLabel = "キャンセル",
  tone = "primary",
  onConfirm,
}: DialogProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-card p-5 text-card-foreground shadow-xl ring-1 ring-border">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-lg">{title}</h3>
          {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            className="h-10 rounded-md border border-border bg-secondary px-3 font-semibold text-secondary-foreground text-sm ring-offset-background hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={onClose}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className={`h-10 rounded-md px-4 font-semibold text-primary-foreground text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              tone === "destructive"
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90"
            }`}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
