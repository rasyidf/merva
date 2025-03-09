import { Stack, Text } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { fields } from "./form-builder.fields-list";
import type { EditorProps, RenderFieldProps } from "./form-builder.types";

export const RenderField = ({ field, data, readonly = false }: RenderFieldProps) => {
  const fieldType = field.type || "text";
  const fieldRender = fields[fieldType] || fields.text;

  if (!fieldRender) {
    throw new Error(`No renderer found for field type "${fieldType}"`);
  }

  const { watch, formState: { errors }, control } = useFormContext();
  const error = errors[field.name]?.message as string;
  const description = field.description;
  const watchedValue = watch(field.name);

  // Only compute these values if field has dependencies
  const shouldShow = useMemo(() => {
    if (!field.dependencies?.length) return true;
    const dependencyValues = field.dependencies.map(dep => watch(dep));
    return field.validate?.(dependencyValues) ?? true;
  }, [field.dependencies, field.validate, watch]);

  if (!shouldShow) return null;

  // Memoize shared props to prevent unnecessary re-renders
  const sharedProps = useMemo(() => {
    const defaultValue = data?.[field.name];
    const baseProps = {
      name: field.name,
      control,
      defaultValue,
      label: field.label,
      placeholder: field.placeholder,
      error,
      disabled: field.disabled || readonly,
      description,
      ...field.validation && { rules: field.validation },
    };

    if (readonly) {
      return {
        ...baseProps,
        variant: "unstyled" as const,
        readOnly: true,
        optional: false,
        placeholder: "",
        disabled: true,
      };
    }

    return baseProps;
  }, [field, data, error, readonly, control, description]);

  // Memoize rendering logic
  const content = useMemo(() => {
    if (field.type === "custom" && typeof field.render === "function") {
      return field.render(sharedProps);
    }

    if (readonly && fieldRender.view) {
      const formattedValue = field.formatValue?.(watchedValue) ?? 
                          fieldRender.format?.(watchedValue) ?? 
                          watchedValue;
      return fieldRender.view({ ...sharedProps, value: formattedValue });
    }

    const parsedValue = field.transform?.(watchedValue) ?? 
                     fieldRender.parse?.(watchedValue) ?? 
                     watchedValue;
    return fieldRender.editor({ ...sharedProps, value: parsedValue });
  }, [field, fieldRender, sharedProps, watchedValue, readonly]);

  return (
    <Stack gap={0}>
      {content}
    </Stack>
  );
};