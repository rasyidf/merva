import { PasswordInput, PasswordInputProps } from "@mantine/core";
import React from "react";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

type FormPasswordType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
} & PasswordInputProps;
export function FormPassword(props: FormPasswordType) {
  const { control, name, label, onChange, ...selectProps } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <PasswordInput
          {...selectProps}
          {...field}
          ref={field.ref}
          label={label}
          labelProps={{ w: "100%" }}
          onChange={(val) => {
            field.onChange(val);
            onChange?.(val);
          }}
        />
      )}
    />
  );
}
