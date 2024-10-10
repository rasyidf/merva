import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";
import { Checkbox as BaseCheckbox, type CheckboxProps as BaseCheckboxProps } from "@mantine/core";
import { CheckboxGroup } from "./checkBoxGroup";

export type CheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseCheckboxProps, "checked" | "defaultValue">;

export const Checkbox = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: CheckboxProps<T>) => {
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
    <BaseCheckbox
      error={fieldState.error?.message}
      value={value}
      checked={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
};

Checkbox.Group = CheckboxGroup;
Checkbox.Item = BaseCheckbox;
