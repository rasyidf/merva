import {
  Badge as BaseBadge,
  InputWrapper,
  type InputWrapperProps as CoreInputWrapperProps
} from "@mantine/core";
import {
  useController,
  type FieldValues,
  type UseControllerProps
} from "react-hook-form";

export type BadgeProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CoreInputWrapperProps, "value" | "defaultValue">;

export function Badge<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...props
}: BadgeProps<T>) {
  const state = {
    active: {
      background: 'green',
      text: 'green.9',
      label: 'Aktif'
    },
    inactive: {
      background: 'red',
      text: 'red.9',
      label: 'Tidak Aktif'
    }
  };
  const {
    field: { value, onChange: fieldOnChange },
    fieldState
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister
  });

  return (
    <InputWrapper
      styles={{
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }
      }}
      size="md"
      label={props.label}
      required={props.required}
      error={fieldState.error?.message}
    >
      <BaseBadge variant="light"
        color={state[value]?.background ?? 'blue'}
        c={state[value]?.text ?? 'blue.3'}
      >
        {state[value]?.label ?? value}
      </BaseBadge>
    </InputWrapper>


  );
}
