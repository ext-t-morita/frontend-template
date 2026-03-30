import { AuditLogList } from "@repo/ui";
import preview from "../../.storybook/preview";
import { auditEntries } from "../support/layoutPatternFixtures";

const meta = preview.meta({
  title: "Patterns/AuditLogList",
});

export const Default = meta.story({
  render: () => (
    <div className="max-w-3xl">
      <AuditLogList entries={auditEntries} />
    </div>
  ),
});
