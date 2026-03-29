import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type PanelLayoutProps = {
  aside?: ReactNode;
  asidePosition?: "start" | "end";
  asideSticky?: boolean;
  children: ReactNode;
};

export function PanelLayout({
  aside,
  asidePosition = "end",
  asideSticky = false,
  children,
}: PanelLayoutProps) {
  const asideNode = aside ? (
    <aside className={cn("space-y-6", asideSticky && "xl:sticky xl:top-6")}>
      {aside}
    </aside>
  ) : null;

  const mainNode = <div className="min-w-0 space-y-6">{children}</div>;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
      {asidePosition === "start" ? asideNode : mainNode}
      {asidePosition === "start" ? mainNode : asideNode}
    </div>
  );
}
