import {
  CheckboxProps,
  ComboboxProps,
  FlexProps,
  GroupProps,
  MultiSelectProps,
  NumberInputProps,
  PasswordInputProps,
  PinInputProps,
  RadioProps,
  RatingProps,
  SelectProps,
  TextInputProps,
  TextareaProps,
} from "@mantine/core";
import { DatePickerInputProps, DateTimePickerProps } from "@mantine/dates";
import { DropzoneProps } from "@mantine/dropzone";
import React, { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

type BaseFormField =
  | ({ formType: "text"; } & TextInputProps)
  | ({ formType: "number"; } & NumberInputProps)
  | ({ formType: "password"; } & PasswordInputProps)
  | ({ formType: "checkbox"; } & CheckboxProps)
  | ({ formType: "select"; } & SelectProps)
  | ({ formType: "multiselect"; } & MultiSelectProps)
  | ({ formType: "radio"; } & RadioProps & { orientation?: "horizontal" | "vertical"; })
  | ({ formType: "textarea"; } & TextareaProps)
  | ({ formType: "pininput"; } & PinInputProps)
  | ({ formType: "date"; } & DatePickerInputProps<"default"> & { placeholder?: string; disabled?: boolean; })
  | ({ formType: "datetime"; } & DateTimePickerProps)
  | ({ formType: "daterange"; } & DatePickerInputProps<"range"> & { placeholder?: string; disabled?: boolean; })
  | ({ formType: "createableSelect"; } & ComboboxProps & SelectProps)
  | ({ formType: "dropzone"; } & Omit<DropzoneProps, "onDrop"> & { onDrop?: DropzoneProps["onDrop"]; })
  | ({ formType: "rating"; } & RatingProps)
  | { formType: "custom"; }
  | { formType: "hidden"; };

export type FormField = {
  name: string;
  label?: ReactNode;
  options?: { label: ReactNode; value: string; }[];
  columnSize?: number;
  group?: string;
  component?: ReactNode;
  optional?: ReactNode;
  inputGroupProps?: GroupProps;
  singleRow?: boolean;
  offset?: number;
  actionButton?: ReactNode;
  gridFieldProps?: FlexProps;
} & BaseFormField;

export type FormBuilderProps<T extends object> = {
  fields: FormField[];
  hooks: UseFormReturn<T>;
  isDetail?: boolean;
  devTool?: boolean;
  bodyProps?: React.HTMLAttributes<HTMLDivElement> & GroupProps;
  labels?: {
    group?: {
      [key: string]: ReactNode;
    };
    groupDescription?: {
      [key: string]: ReactNode;
    };
  };
};
