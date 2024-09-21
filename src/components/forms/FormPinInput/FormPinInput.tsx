import { PinInput, PinInputProps } from "@mantine/core";
import React from "react";
import { Control, Controller } from "react-hook-form";

type FormPinInputType = {
  control: Control<any, any>;
  name: string;
} & PinInputProps;
export function FormPinInput(props: FormPinInputType) {
  const { control, name, onChange, ...selectProps } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <PinInput
          {...selectProps}
          {...field}
          placeholder="0"
          ref={field.ref}
          onChange={(val: any) => {
            field.onChange(val);
            onChange?.(val);
          }}
        />
      )}
    />
  );
}
