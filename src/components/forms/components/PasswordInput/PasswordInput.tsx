import {
  type UseControllerProps,
  useController,
  type FieldValues
} from "react-hook-form";
import {
  PasswordInput as BasePasswordInput,
  type PasswordInputProps as BasePasswordInputProps
} from "@mantine/core";

export type PasswordInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BasePasswordInputProps, "value" | "defaultValue">;

export function PasswordInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: PasswordInputProps<T>) {
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
    <BasePasswordInput
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
