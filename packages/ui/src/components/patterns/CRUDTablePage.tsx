import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import type { DataTableColumnDef } from "../ui/DataTable";
import { DataTable } from "../ui/DataTable";
import type { AppHeaderMetric } from "./AppHeader";
import { PageShell } from "./PageShell";
import { PanelLayout } from "./PanelLayout";
import { SectionHeader } from "./SectionHeader";
import { TopNav, type TopNavItem } from "./TopNav";

type CRUDTablePageProps<TData, TValue> = {
  actions?: ReactNode;
  columns: DataTableColumnDef<TData, TValue>[];
  data: TData[];
  description?: ReactNode;
  detailPanel?: ReactNode;
  emptyDescription?: string;
  emptyTitle?: string;
  eyebrow?: ReactNode;
  metrics?: AppHeaderMetric[];
  navItems?: TopNavItem[];
  searchKey?: string;
  searchPlaceholder?: string;
  sectionDescription?: ReactNode;
  sectionTitle?: ReactNode;
  sidebar?: ReactNode;
  status?: ReactNode;
  title: ReactNode;
  toolbarActions?: ReactNode;
};

export function CRUDTablePage<TData, TValue>({
  actions,
  columns,
  data,
  description,
  detailPanel,
  emptyDescription,
  emptyTitle,
  eyebrow,
  metrics,
  navItems,
  searchKey,
  searchPlaceholder,
  sectionDescription = "Review list state, filters, and inline actions before composing a full business page.",
  sectionTitle = "Records",
  sidebar,
  status,
  title,
  toolbarActions,
}: CRUDTablePageProps<TData, TValue>) {
  return (
    <PageShell
      actions={actions}
      description={description}
      eyebrow={eyebrow}
      metrics={metrics}
      navigation={navItems?.length ? <TopNav items={navItems} /> : null}
      sidebar={sidebar}
      status={status}
      title={title}
    >
      <PanelLayout aside={detailPanel} asideSticky={Boolean(detailPanel)}>
        <SectionHeader
          actions={<Button tone="secondary">Export CSV</Button>}
          description={sectionDescription}
          title={sectionTitle}
        />
        <DataTable
          columns={columns}
          data={data}
          emptyDescription={emptyDescription}
          emptyTitle={emptyTitle}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          toolbarActions={toolbarActions}
        />
      </PanelLayout>
    </PageShell>
  );
}
