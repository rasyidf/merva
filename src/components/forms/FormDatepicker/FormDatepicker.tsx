import { SvgIcon } from "@/components/ui/icon";
import { DatePickerInput, DatePickerInputProps, DateValue } from "@mantine/dates";
import { Controller } from "react-hook-form";
import { FormDatePickerType } from "./FormDatePickerType";

export function FormDatePicker(props: FormDatePickerType) {
  const { control, name, label, onChange, error, ...selectProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <DatePickerInput
            {...field}
            leftSection={<SvgIcon name="calendar" width={16} height={16} />}
            size="sm"
            {...(selectProps as DatePickerInputProps)}
            w="100%"
            label={label}
            error={error}
            labelProps={{ w: "100%" }}
            locale="id-ID"
            weekdayFormat="ddd"
            valueFormat="DD/MM/YYYY"
            onChange={(value) => {
              field.onChange(value as any);
              (props as DatePickerInputProps).onChange?.(value as DateValue);
            }}
          />
        );
      }}
    />
  );
}
