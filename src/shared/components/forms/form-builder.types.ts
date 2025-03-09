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

export type ValidationRule<T = any> = 
  | boolean 
  | number 
  | string 
  | RegExp 
  | ((value: T, formValues: Record<string, any>) => boolean | string);

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  fields: MetaField[];
  dependencies?: string[];
  validate?: (data: Record<string, any>) => Promise<boolean> | boolean;
  canSkip?: boolean;
}

export interface FormWizardOptions {
  steps: WizardStep[];
  initialStep?: string;
  onStepChange?: (from: string, to: string) => void;
  onComplete?: (data: Record<string, any>) => void;
}

export interface ValidationRules<T = any> {
  required?: ValidationRule<T>;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: T, formValues: Record<string, any>) => boolean | string | Promise<boolean | string>;
  deps?: string[];
}

export interface BaseField<T = any> {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  group?: string;
  colSpan?: number | { base: number; sm?: number; md?: number; lg?: number };
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  validation?: ValidationRules<T>;
  defaultValue?: T;
  transform?: (value: T) => any;
  formatValue?: (value: T) => any;
  dependencies?: string[];
  searchable?: boolean;
  allowDeselect?: boolean;
  options?: SelectOption[];
  [key: PropertyKey]: any;
}

export type EditorProps<T = any> = Omit<BaseField<T>, "type"> & {
  error?: string;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  value?: T;
  control?: UseFormReturn<any>["control"];
};

export interface CustomField<T = any> extends BaseField<T> {
  type: "custom";
  render: (props: EditorProps<T>) => ReactNode;
  parseValue?: (value: T) => any;
}

export type Field<T = any> = BaseField<T> | CustomField<T>;

export interface FieldRenderer<T = any> {
  editor: (props: EditorProps<T>) => ReactNode;
  view?: (props: EditorProps<T>) => ReactNode;
  parse?: (value: T) => any;
  format?: (value: T) => any;
}

export type Fields = {
  [K in FieldType]: FieldRenderer;
};

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
  data?: any;
}

export type BaseFieldMeta = BaseField & {
  options?: ComboboxItem[];
};

export type MetaField = BaseFieldMeta & {
  type: FieldType;
  group?: string;
  colSpan?: number | { base: number; sm?: number; md?: number; lg?: number };
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
  showNotifications?: boolean;
  validate?: (values: any) => Record<string, string> | Promise<Record<string, string>>;
}
