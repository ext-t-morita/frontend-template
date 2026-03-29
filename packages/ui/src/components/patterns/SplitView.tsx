import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type SplitViewProps = {
  detail: ReactNode;
  detailSticky?: boolean;
  master: ReactNode;
};

export function SplitView({
  detail,
  detailSticky = false,
  master,
}: SplitViewProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
      <div className="min-w-0 space-y-6">{master}</div>
      <aside className={cn("space-y-6", detailSticky && "xl:sticky xl:top-6")}>
        {detail}
      </aside>
    </div>
  );
}
