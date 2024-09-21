import { SvgIcon } from "@/components/ui/icon";
import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { useAutoComplete } from "../FormSelect/useAutoComplete";

type FormMultiSelectType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
} & MultiSelectProps;
export function FormMultiSelect(props: FormMultiSelectType) {
  const { control, name, label, onChange, searchable, ...selectProps } = props;
  const [opened, handlers] = useDisclosure(false);
  const searchAbleProps = useAutoComplete(searchable);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MultiSelect
          {...selectProps}
          {...field}
          {...searchAbleProps}
          ref={field.ref}
          onDropdownOpen={handlers.open}
          onDropdownClose={handlers.close}
          rightSection={
            opened ? (
              <SvgIcon name="caret-up" width={16} height={16} />
            ) : (
              <SvgIcon name="caret-down" width={16} height={16} />
            )
          }
          label={label}
          size="sm"
          onChange={(val) => {
            field.onChange(val);
            onChange?.(val);
          }}
        />
      )}
    />
  );
}
