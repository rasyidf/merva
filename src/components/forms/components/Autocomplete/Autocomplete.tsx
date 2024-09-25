import {
  type FieldValues,
  useController,
  type UseControllerProps
} from "react-hook-form";
import {
  Autocomplete as BaseAutocomplete,
  type AutocompleteProps as BaseAutocompleteProps
} from "@mantine/core";

export type AutocompleteProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseAutocompleteProps, "value" | "defaultValue">;

export function Autocomplete<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: AutocompleteProps<T>) {
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
    <BaseAutocomplete
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
