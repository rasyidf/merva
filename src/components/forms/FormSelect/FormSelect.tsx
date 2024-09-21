import { SvgIcon } from "@/components/ui/icon";
import { Select, SelectProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { useAutoComplete } from "./useAutoComplete";

type FormSelectType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
} & SelectProps;
export function FormSelect(props: FormSelectType) {
  const { control, name, label, onChange, searchable, ...selectProps } = props;
  const [opened, handlers] = useDisclosure(false);

  const searchableProps = useAutoComplete(searchable);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...searchableProps}
          {...selectProps}
          {...field}
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
          errorProps={{ mt: "0.5rem" }}
          searchable
          onChange={(val, option) => {
            field.onChange(val);
            onChange?.(val, option);
          }}
        />
      )}
    />
  );
}
