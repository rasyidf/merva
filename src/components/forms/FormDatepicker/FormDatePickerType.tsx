import { DatePickerInputProps, DatePickerType } from "@mantine/dates";
import { ReactNode } from "react";
import { Control } from "react-hook-form";

export type FormDatePickerType<Type extends DatePickerType = "default"> = {
  control: Control<any, any>;
  name: string;
  label?: ReactNode;
  optional?: boolean;
} & DatePickerInputProps<Type>;
