import {
  TextInput as BaseTextInput,
  InputWrapper,
  Text,
  type InputWrapperProps as CoreInputWrapperProps
} from "@mantine/core";
import {
  useController,
  type FieldValues,
  type UseControllerProps
} from "react-hook-form";

export type TextViewProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CoreInputWrapperProps, "value" | "defaultValue">;

export function TextView<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...props
}: TextViewProps<T>) {

  const {
    field: { value }
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
      error={undefined}
    >
      <Text>
        {value}
      </Text>
    </InputWrapper>


  );
}
