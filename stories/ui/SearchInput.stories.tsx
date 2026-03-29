import { useState } from "react";
import preview from "../../.storybook/preview";
import { SearchInput } from "../../packages/ui/src/components/ui/SearchInput";

const meta = preview.meta({
  title: "UI/SearchInput",
});

function SearchInputPreview(props: {
  disabled?: boolean;
  invalid?: boolean;
  initialValue?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(props.initialValue ?? "");

  return (
    <div className="max-w-md">
      <SearchInput
        disabled={props.disabled}
        invalid={props.invalid}
        onChange={(event) => setValue(event.target.value)}
        onClear={() => setValue("")}
        placeholder={props.placeholder ?? "Search channels"}
        value={value}
      />
    </div>
  );
}

export const Default = meta.story({
  render: () => <SearchInputPreview initialValue="atlas" />,
});

export const ErrorState = meta.story({
  render: () => (
    <SearchInputPreview
      initialValue="!"
      invalid
      placeholder="Use a searchable alias"
    />
  ),
});

export const Disabled = meta.story({
  render: () => <SearchInputPreview disabled initialValue="deployments" />,
});
