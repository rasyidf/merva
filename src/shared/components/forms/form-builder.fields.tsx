import { toTitleCase } from "@/shared/utils";
import { Button, Grid, Group, Title } from "@mantine/core";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { fields, type MetaField } from "./fields-list";
import type { EditorProps, RenderFieldProps } from "./form-builder.types";

/**
 * Render a field based on the field type and data
 * @param field - The field to render
 * @param data - The data to render
 * @param readonly - Whether the field should be readonly
 * @returns
 */
export const RenderField: React.FC<RenderFieldProps> = ({ field, data, readonly = false }) => {
  const fieldType = field.type || "text";

  // Ensure that fields.text exists to provide a fallback
  const fieldRender = fields[fieldType] || fields.text;

  // If fields.text is not defined, throw an error
  if (!fieldRender) {
    throw new Error(`No renderer found for field type "${fieldType}", and fallback "text" renderer is missing.`);
  }

  const defaultValue = data?.[field.name];

  const defaultReadonlyProps: Partial<EditorProps> = {
    variant: "unstyled",
    readOnly: true,
    optional: false,
    placeholder: "",
    disabled: false,
  };

  const editorProps: EditorProps = {
    ...field,
    label: field?.label || field.name,
    ...(readonly ? defaultReadonlyProps : {}),
    defaultValue,
  };

  // Handle custom fields
  if (field.type === "custom") {
    const customField = field;
    if (typeof customField.render !== "function") {
      throw new Error(`Custom field "${field.name}" does not have a render method.`);
    }
    return customField.render(editorProps);
  }

  // Use view renderer if available and readonly
  if (readonly && fieldRender.view) {
    return fieldRender.view(editorProps);
  }

  // Use editor renderer by default
  if (typeof fieldRender.editor === "function") {
    return fieldRender.editor(editorProps);
  }

  // If no suitable renderer is found, throw an error
  throw new Error(`No suitable renderer found for field type "${fieldType}".`);
};

export const FormFields = ({
  meta,
  data: initialData = {},
  loading,
  readonly,
  onCancel,
  mode = "create",
  gridColumn,
  withActionButton = true,
}: {
  data?: Record<string, unknown>;
  meta: MetaField[];
  readonly?: boolean;
  onCancel?: () => void;
  loading?: boolean;
  mode?: "create" | "update" | "detail";
  gridColumn?: number;
  withActionButton?: boolean;
}) => {
  const hooks = useFormContext();

  const data = hooks.getValues() ?? initialData;

  const groupedFields = meta.reduce(
    (groups, field) => {
      const { group = "" } = field;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(field);
      return groups;
    },
    {} as Record<string, MetaField[]>,
  );

  const renderGroupedFields = Object.entries(groupedFields).map(([group, fields]) => (
    <div key={group} style={{ marginBottom: "20px" }}>
      {group && (
        <Title order={6} my="sm" w="100%" size={18}>
          {toTitleCase(group?.replace(/-/g, " "))}
        </Title>
      )}
      <Grid columns={gridColumn ?? 2}>
        {fields.map((field) => (
          <Grid.Col key={field.name} span={field.colSpan ?? 1}>
            <RenderField field={field} data={data} readonly={readonly} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  ));

  return (
    <>
      {renderGroupedFields}
      {!readonly && withActionButton && (
        <Group mt="md" justify="end">
          <Button variant="light" disabled={hooks.formState.isSubmitting} onClick={onCancel}>
            Batal
          </Button>
          <Button
            type="submit"
            loading={hooks.formState.isSubmitting || loading}
            disabled={
              hooks.formState.isSubmitting ||
              !hooks.formState.isValid ||
              (mode === "update" && hooks.formState.isDirty === false)
            }
          >
            Simpan
          </Button>
        </Group>
      )}
    </>
  );
};
