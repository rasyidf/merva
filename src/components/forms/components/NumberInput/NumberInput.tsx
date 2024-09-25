import {
  type UseControllerProps,
  useController,
  type FieldValues
} from 'react-hook-form';
import {
  NumberInput as BaseNumberInput,
  type NumberInputProps as BaseNumberInputProps
} from '@mantine/core';

export type NumberInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseNumberInputProps, 'value' | 'defaultValue'>;

export function NumberInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: NumberInputProps<T>) {
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
    <BaseNumberInput
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      hideControls
      {...field}
      {...props}
    />
  );
}
