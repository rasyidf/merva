import {
  type UseControllerProps,
  useController,
  type FieldValues
} from "react-hook-form";
import {
  RadioGroup as BaseRadioGroup,
  type RadioGroupProps as BaseRadioGroupProps
} from "@mantine/core";

export type RadioGroupProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseRadioGroupProps, "value" | "defaultValue">;

export function RadioGroup<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: RadioGroupProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister
  });

  return (
    <BaseRadioGroup
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
