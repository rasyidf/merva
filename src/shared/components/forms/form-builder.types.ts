import { ComboboxItem } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { z } from "zod";

export type FieldType = 
  | "text" 
  | "number" 
  | "date" 
  | "datetime"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "textarea"
  | "password"
  | "email"
  | "phone"
  | "custom"
  | "badge"
  | "tags";

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;
}

export interface BaseField {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  group?: string;
  colSpan?: number;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  validation?: ValidationRules;
  defaultValue?: any;
  transform?: (value: any) => any;
  formatValue?: (value: any) => any;
  dependencies?: string[];
  [key: PropertyKey]: any;
}

export type EditorProps = Omit<BaseField, "type"> & {
  error?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  value?: any;
};

export interface CustomField extends BaseField {
  type: "custom";
  render: (props: EditorProps) => ReactNode;
  parseValue?: (value: any) => any;
}

export type Field = BaseField | CustomField;

export type FieldRenderer = {
  editor: (props: EditorProps) => ReactNode;
  view?: (props: EditorProps) => ReactNode;
  parse?: (value: any) => any;
  format?: (value: any) => any;
};

export type Fields = {
  [K in FieldType]: FieldRenderer;
};

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type BaseFieldMeta = BaseField & {
  options?: ComboboxItem[];
};

export type MetaField = BaseFieldMeta & {
  type: FieldType;
  group?: string;
  colSpan?: number;
};

export interface RenderFieldProps {
  field: MetaField;
  data?: Record<string, any>;
  readonly?: boolean;
}

export interface FormBuilderProps extends PropsWithChildren {
  schema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
  loading?: boolean;
  initialData?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>, form: UseFormReturn<FieldValues>) => void | Promise<void>;
  onError?: (error: Error) => void;
  mode?: "create" | "update" | "detail";
  readonly?: boolean;
  id?: string;
  persistData?: boolean;
  excludeFromPersistence?: string[];
  showSuccessNotification?: boolean;
  showErrorNotification?: boolean;
  validate?: (values: any) => Record<string, string> | Promise<Record<string, string>>;
}
