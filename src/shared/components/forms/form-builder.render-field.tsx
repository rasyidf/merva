import { Stack } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { fields } from "./form-builder.fields-list";
import type { EditorProps, RenderFieldProps } from "./form-builder.types";

export const RenderField = ({ field, data, readonly = false }: RenderFieldProps) => {
  const fieldType = field.type || "text";
  const fieldRender = fields[fieldType];

  if (!fieldRender) {
    console.warn(`No renderer found for field type "${fieldType}", falling back to text`);
    return <RenderField {...{ field: { ...field, type: "text" }, data, readonly }} />;
  }

  const { watch, formState: { errors }, control } = useFormContext();
  const error = errors[field.name]?.message as string;
  const watchedValue = watch(field.name);

  // Only compute dependencies if they exist
  const shouldShow = useMemo(() => {
    if (!field.dependencies?.length) return true;
    const dependencyValues = field.dependencies.map(dep => watch(dep));
    return field.validate?.(dependencyValues) ?? true;
  }, [field.dependencies, field.validate, watch]);

  if (!shouldShow) return null;

  // Memoize shared props to prevent unnecessary re-renders
  const sharedProps = useMemo(() => {
    const defaultValue = data?.[field.name];
    const baseProps: EditorProps = {
      name: field.name,
      control,
      defaultValue,
      label: field.label,
      placeholder: field.placeholder,
      error,
      disabled: field.disabled || readonly,
      description: field.description,
      ...(field.validation && { rules: field.validation }),
      options: field.options,
      searchable: field.searchable,
      allowDeselect: field.allowDeselect,
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
  }, [field, data, error, readonly, control]);

  // Apply value transformations
  const transformedValue = useMemo(() => {
    if (readonly && fieldRender.view) {
      return field.formatValue?.(watchedValue) ?? 
             fieldRender.format?.(watchedValue) ?? 
             watchedValue;
    }
    return field.transform?.(watchedValue) ?? 
           fieldRender.parse?.(watchedValue) ?? 
           watchedValue;
  }, [field, fieldRender, watchedValue, readonly]);

  // Render appropriate component
  const content = useMemo(() => {
    if (field.type === "custom" && typeof field.render === "function") {
      return field.render({ ...sharedProps, value: transformedValue });
    }

    return readonly && fieldRender.view 
      ? fieldRender.view({ ...sharedProps, value: transformedValue })
      : fieldRender.editor({ ...sharedProps, value: transformedValue });
  }, [field, fieldRender, sharedProps, transformedValue, readonly]);

  return <Stack gap={0}>{content}</Stack>;
};