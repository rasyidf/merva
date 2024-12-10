import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";
import {
  DatePickerInput as CoreDatePickerInput,
  type DatePickerType,
  type DatePickerInputProps as BaseDatePickerInputProps,
} from "@mantine/dates";

export type DatePickerInputProps<T extends FieldValues, V extends DatePickerType = "default"> = UseControllerProps<T> &
  Omit<BaseDatePickerInputProps<V>, "value" | "defaultValue">;

export function DatePickerInput<T extends FieldValues, V extends DatePickerType = "default">({
  type,
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: DatePickerInputProps<T, V>) {
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
    <CoreDatePickerInput<V>
      error={fieldState.error?.message}
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
}
