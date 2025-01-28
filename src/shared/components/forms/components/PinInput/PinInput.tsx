import { type UseControllerProps, useController, type FieldValues } from "react-hook-form";
import { PinInput as BasePinInput, type PinInputProps as BasePinInputProps } from "@mantine/core";

export type PinInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BasePinInputProps, "value" | "defaultValue">;

export function PinInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: PinInputProps<T>) {
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
    <BasePinInput
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={!(fieldState.error?.message == null)}
      {...field}
      {...props}
    />
  );
}
