import { type UseControllerProps, useController, type FieldValues } from "react-hook-form";
import { Select as BaseSelect, type SelectProps as BaseSelectProps } from "@mantine/core";

export type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseSelectProps, "value" | "defaultValue">;

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
      value={value}
      onChange={(e, option) => {
        fieldOnChange(e);
        onChange?.(e, option);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
