import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "h-full w-px shrink-0 bg-[var(--color-border-subtle)]",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <hr
      className={cn(
        "h-px w-full shrink-0 border-0 bg-[var(--color-border-subtle)]",
        className,
      )}
      {...props}
    />
  );
}
