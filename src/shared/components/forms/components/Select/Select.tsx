import { type UseControllerProps, useController, type FieldValues } from "react-hook-form";
import { Select as BaseSelect, type SelectProps as BaseSelectProps, type ComboboxItem } from "@mantine/core";

export type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseSelectProps, "value" | "defaultValue"> & {
    onChange?: (value: string, item: ComboboxItem) => void;
  };

export function Select<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: SelectProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <BaseSelect
      value={value ?? ""}
      onChange={(val, item) => {
        fieldOnChange(val);
        if (onChange) {
          onChange(val, item);
        }
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
