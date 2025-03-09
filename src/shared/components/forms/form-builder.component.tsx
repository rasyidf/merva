import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import type { FormBuilderProps } from "./form-builder.types";
import { LoadingOverlay } from "./form-builder";
import { z } from "zod";
import { useFormPersistence } from "./hooks/use-form-persistence";
import { useCallback, useEffect, useMemo } from "react";
import { notifications } from "@mantine/notifications";

/**
 * FormBuilder provides a comprehensive form building solution with:
 * - Zod validation
 * - Form state persistence
 * - Flexible layouts
 * - Field dependencies
 * - Custom field types
 * - Form wizards
 * - Array fields
 */
export const FormBuilderComponent = ({ 
  schema, 
  onSubmit, 
  onError,
  children, 
  initialData,
  mode = "create",
  id,
  persistData = true,
  excludeFromPersistence = [],
  showNotifications = true,
}: Readonly<FormBuilderProps>) => {
  // Initialize form with schema validation
  const formConfig = useMemo(() => ({
    resolver: zodResolver(schema),
    mode: "onTouched" as const,
    defaultValues: initialData,
  }), [schema, initialData]);

  const form = useForm(formConfig);
  const { handleSubmit, setError, clearErrors, formState } = form;

  // Setup form persistence
  const formKey = useMemo(() => `form_${id || window.location.pathname}`, [id]);
  const { clearPersistedData } = useFormPersistence(form, {
    enabled: persistData,
    key: formKey,
    exclude: excludeFromPersistence,
  });

  // Cleanup on successful submit
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      clearPersistedData();
    }
  }, [formState.isSubmitSuccessful, clearPersistedData]);

  // Show validation errors
  useEffect(() => {
    if (!showNotifications) return;
    
    const errors = Object.entries(formState.errors);
    if (errors.length > 0) {
      notifications.show({
        title: "Validation Errors",
        message: errors.map(([field, error]) => `${field}: ${error?.message}`).join("\n"),
        color: "red",
      });
    }
  }, [formState.errors, showNotifications]);

  // Handle form submission
  const handleFormSubmit: SubmitHandler<Record<string, unknown>> = useCallback(async (data) => {
    try {
      clearErrors();
      
      // Transform data through schema
      const transformedData = Object.entries(data).reduce((acc, [key, value]) => {
        let field: z.ZodTypeAny | undefined;
        
        if (schema instanceof z.ZodEffects) {
          const innerSchema = schema._def.schema;
          if (innerSchema instanceof z.ZodObject) {
            field = innerSchema.shape[key];
          }
        } else if (schema instanceof z.ZodObject) {
          field = schema.shape[key];
        }

        acc[key] = field?._def?.transform ? field._def.transform(value) : value;
        return acc;
      }, {} as Record<string, unknown>);

      await onSubmit?.(transformedData, form);
      
      if (showNotifications) {
        notifications.show({
          title: `${mode === "create" ? "Created" : "Updated"} Successfully`,
          message: "Your changes have been saved.",
          color: "green",
        });
      }

      clearPersistedData();
    } catch (error) {
      if (error instanceof Error) {
        // Handle validation errors
        if ('errors' in error && typeof error.errors === 'object') {
          Object.entries(error.errors as Record<string, string>).forEach(([field, message]) => {
            setError(field, { type: 'manual', message });
          });
        }
        
        onError?.(error);

        if (showNotifications) {
          notifications.show({
            title: "Error",
            message: error.message || "An error occurred while saving",
            color: "red",
          });
        }
      }
    }
  }, [schema, onSubmit, form, mode, showNotifications, clearPersistedData, setError, onError, clearErrors]);

  return (
    <FormProvider {...form}>
      <LoadingOverlay visible={formState.isSubmitting} />
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};
