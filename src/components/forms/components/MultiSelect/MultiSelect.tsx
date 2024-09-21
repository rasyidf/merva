import {
  MultiSelect as CoreMultiSelect,
  type MultiSelectProps as CoreMultiSelectProps
} from "@mantine/core";
import {
  useController,
  type FieldValues,
  type UseControllerProps
} from "react-hook-form";

import styles from './MultiSelect.module.css';

export type MultiSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CoreMultiSelectProps, "value" | "defaultValue">;

export function MultiSelect<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: MultiSelectProps<T>) {
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
    <CoreMultiSelect
      value={value}
      classNames={{
        pillsList: styles.pillsList
      }}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
      placeholder={value?.length > 0 ? '' : props.placeholder}
    />
  );
}
