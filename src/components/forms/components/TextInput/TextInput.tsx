import {
  type UseControllerProps,
  useController,
  type FieldValues
} from "react-hook-form";
import {
  TextInput as BaseTextInput,
  type TextInputProps as BaseTextInputProps
} from "@mantine/core";

export type TextInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseTextInputProps, "value" | "defaultValue">;

export function TextInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: TextInputProps<T>) {
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
    <BaseTextInput
      value={value}
      onChange={(e) => {
        e.target.value = e.target.value.trimStart();
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
