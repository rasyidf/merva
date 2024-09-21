import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

type FormTextType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
} & TextInputProps;
export function FormText(props: FormTextType) {
  const { control, name, label, onChange, defaultValue, labelProps, ...selectProps } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextInput
          {...selectProps}
          label={label}
          labelProps={{ w: "100%" }}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
        />
      )}
    />
  );
}
