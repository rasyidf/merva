import {
  type UseControllerProps,
  useController,
  type FieldValues
} from "react-hook-form";
import { Radio as BaseRadio, type RadioProps as BaseRadioProps } from "@mantine/core";
import { RadioGroup } from "./RadioGroup";

export type RadioProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<BaseRadioProps, "value" | "defaultValue">;

export function Radio<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: RadioProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field }
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister
  });

  return (
    <BaseRadio
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

Radio.Group = RadioGroup;
Radio.Item = BaseRadio;
