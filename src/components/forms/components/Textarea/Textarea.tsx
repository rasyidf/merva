import { type UseControllerProps, useController, type FieldValues } from "react-hook-form";
import { Textarea as BaseTextarea, type TextareaProps as BaseTextareaProps } from "@mantine/core";

export type TextareaProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseTextareaProps, "value" | "defaultValue">;

export function Textarea<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: TextareaProps<T>) {
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
    <BaseTextarea
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      resize="vertical"
      {...field}
      {...props}
    />
  );
}
