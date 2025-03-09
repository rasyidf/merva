import { Button, Group } from "@mantine/core";
import type React from "react";
import { useFormContext } from "react-hook-form";
import type { EditorProps, MetaField } from "./form-builder.types";
import { FieldsLayout } from "./components/fields-layout";

interface FormFieldsProps {
  meta: MetaField[];
  data?: Record<string, unknown>;
  readonly?: boolean;
  onCancel?: () => void;
  loading?: boolean;
  mode?: "create" | "update" | "detail";
  layout?: "grid" | "stack" | "sections";
  columns?: number | { base: number; sm?: number; md?: number; lg?: number };
  spacing?: number;
  sectionStyle?: "card" | "divider" | "none";
  withActionButton?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  meta,
  data: initialData = {},
  loading,
  readonly,
  onCancel,
  mode = "create",
  layout = "grid",
  columns = { base: 12, sm: 6 },
  spacing = "md",
  sectionStyle = "none",
  withActionButton = true,
  submitLabel,
  cancelLabel = "Cancel",
}) => {
  const hooks = useFormContext();
  const data = hooks.getValues() ?? initialData;

  return (
    <>
      <FieldsLayout
        fields={meta}
        data={data}
        readonly={readonly}
        layout={layout}
        columns={columns}
        spacing={spacing}
        sectionStyle={sectionStyle}
      />


    </>
  );
};
