import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

import {
  Badge as BaseBadge,
  Group,
  InputWrapper,
  type InputWrapperProps as CoreInputWrapperProps,
} from "@mantine/core";

export type BadgeGroupProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CoreInputWrapperProps, "value" | "defaultValue">;

export function BadgeGroup<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...props
}: BadgeGroupProps<T>) {
  const {
    field: { value },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <InputWrapper
      styles={{
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      }}
      size="md"
      label={props.label}
      required={props.required}
      error={fieldState.error?.message}
    >
      <Group>{value?.join(", ")}</Group>
    </InputWrapper>
  );
}
