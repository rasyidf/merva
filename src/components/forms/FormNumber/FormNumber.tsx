import { NumberInput, NumberInputProps } from "@mantine/core";
import React from "react";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

type FormNumberType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
} & NumberInputProps;

export function FormNumber(props: FormNumberType) {
  const { control, name, label, onChange, ...selectProps } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <NumberInput
          {...selectProps}
          {...field}
          ref={field.ref}
          label={label}
          labelProps={{ w: "100%" }}
          hideControls
          decimalSeparator=","
          thousandSeparator="."
          min={0}
          onChange={(val) => {
            field.onChange(val);
            onChange?.(val);
          }}
          onWheel={(event) => event.currentTarget.blur()}
          max={selectProps.max || Infinity}
        />
      )}
    />
  );
}
