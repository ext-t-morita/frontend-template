"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import { CrossIcon } from "./icons";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-[rgba(3,7,18,0.72)] backdrop-blur-sm",
      className,
    )}
    {...props}
  />
));

DrawerOverlay.displayName = "DrawerOverlay";

type DrawerContentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  side?: "right" | "bottom";
};

export const DrawerContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ children, className, side = "right", ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-surface)]",
        side === "right" &&
          "inset-y-0 right-0 w-[min(92vw,32rem)] border-l p-6",
        side === "bottom" &&
          "bottom-0 left-0 right-0 rounded-t-[var(--radius-card)] border-t p-6",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        aria-label="Close drawer"
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)] text-[var(--color-fg-muted)] transition hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--color-fg-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary-bg)]"
        type="button"
      >
        <CrossIcon />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DrawerPortal>
));

DrawerContent.displayName = "DrawerContent";

export function DrawerHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2 pr-10", className)} {...props} />;
}

export function DrawerFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export const DrawerTitle = DialogPrimitive.Title;
export const DrawerDescription = DialogPrimitive.Description;
