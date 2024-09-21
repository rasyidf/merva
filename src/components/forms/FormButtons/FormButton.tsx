import { Button, ButtonProps, Group, GroupProps } from "@mantine/core";
import { ButtonHTMLAttributes } from "react";

export type FormButtonProps = {
  cancelText?: string;
  submitText?: string;
  onBackClick?: () => void;
  onSubmitClick?: () => void;
  cancelProps?: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
  submitProps?: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
  containerProps?: GroupProps;
};

export function FormButton(props: Readonly<FormButtonProps>) {
  const { cancelText = "Batal", submitText = "Simpan", cancelProps, submitProps, containerProps, onBackClick } = props;
  return (
    <Group justify="end" mt="md" {...containerProps}>
      <Button
        variant="light"
        onClick={() => {
          onBackClick?.();
        }}
        {...cancelProps}
      >
        {cancelText || "Kembali"}
      </Button>
      <Button
        {...submitProps}
        onClick={() => {
          props.onSubmitClick?.();
        }}
      >
        {submitText || "Simpan"}
      </Button>
    </Group>
  );
}
