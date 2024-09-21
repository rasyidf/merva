import { PropsWithChildren, ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type FieldType = 'text' | 'number' | 'date' | 'custom';

export interface BaseField {
  name: string;
  type: FieldType;
  group?: string;
  colSpan?: number;
}

export type EditorProps = {
  name: string;
  label: string;
  [key: PropertyKey]: any;
};

export interface CustomField extends BaseField {
  type: 'custom';
  group?: string;
  render: (props: EditorProps) => JSX.Element;
}

export type Field = BaseField | CustomField;


export type FieldRenderer = {
  editor: (props: EditorProps) => ReactNode;
  view?: (props: EditorProps) => ReactNode;
};
export interface Fields {
  [key: string]: {
    editor: (props: EditorProps) => JSX.Element;
    view?: (props: EditorProps) => JSX.Element;
  };
}


export type BaseFieldMeta = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  optional?: boolean;
  group?: string;
  options?: string[] | {
    label: string;
    value: string;
    imageUrl?: string;
  }[];
  colSpan?: number;
};


export type FormBuilderProps = PropsWithChildren<{
  schema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
  loading?: boolean;
  initialData?: Record<string, unknown>;
  action?: (data: Record<string, unknown>, form: UseFormReturn<FieldValues, unknown, undefined>) => void;
}>;


export interface RenderFieldProps {
  field: Field;
  data?: Record<string, any>;
  readonly?: boolean;
}