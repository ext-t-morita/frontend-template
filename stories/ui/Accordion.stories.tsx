import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/Accordion",
});

export const Default = meta.story({
  render: () => (
    <Accordion className="space-y-3" collapsible type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>Deployment checklist</AccordionTrigger>
        <AccordionContent>
          Validate tokens, shared API, stories, and framework-aware lint.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Rollback plan</AccordionTrigger>
        <AccordionContent>
          Keep release notes and fallback branch references visible to
          operators.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
});
