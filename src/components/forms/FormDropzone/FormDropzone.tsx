import Dropzone from "@/components/ui/Dropzone";
import { DropzoneProps } from "@mantine/dropzone";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

type FormDropzoneType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
  onDrop?: DropzoneProps["onDrop"];
} & DropzoneProps;

export function FormDropzone(props: FormDropzoneType) {
  const { control, name, label, onDrop, ...dropzoneProps } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Dropzone
          {...dropzoneProps}
          {...field}
          label={label}
          onDrop={(file) => onDrop?.(file)}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
