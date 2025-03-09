import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import type { FormBuilderProps } from "./form-builder.types";
import { LoadingOverlay } from "./form-builder";
import { z } from "zod";
import { useFormPersistence } from "./hooks/use-form-persistence";
import { useCallback, useEffect, useMemo } from "react";
import { notifications } from "@mantine/notifications";

interface ValidationError extends Error {
  errors?: { [key: string]: string };
}

/**
 * To use the FormBuilder, you need to provide the schema and the meta data
 * for the fields. The schema is used for validation and the meta data is used
 * to render the form fields.
 *
 * The FormBuilder also accepts an action function that will be called when the
 * form is submitted. The initialData is used to populate the form fields with
 * the initial data.
 *
 * The readonly prop is used to disable the form fields.
 *
 * @param schema - The schema for the form fields
 * @param meta - The meta data for the form fields
 * @param initialData - The initial data for the form fields
 * @param action - The action to be called when the form is submitted
 * @param readonly - Whether the form fields should be readonly
 *
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * const schema = z.object({
 *  name: z.string().min(3).max(50),
 *  email: z.string().email(),
 *  age: z.number().min(18).max(100),
 * });
 *
 * const meta = [
 * { name: 'name', label: 'Name', placeholder: 'Enter your name' },
 * { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
 * { name: 'age', type: 'number', label: 'Age', placeholder: 'Enter your age' },
 *
 * <FormBuilder schema={schema} meta={meta} />
 * ```
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
  showSuccessNotification = true,
  showErrorNotification = true,
}: Readonly<FormBuilderProps>) => {
  // Memoize the form configuration to prevent unnecessary re-renders
  const formConfig = useMemo(() => ({
    resolver: zodResolver(schema),
    mode: "onTouched" as const,
    defaultValues: initialData,
  }), [schema, initialData]);

  const hooks = useForm(formConfig);
  const { handleSubmit, setError, clearErrors, formState } = hooks;

  // Form persistence
  const formKey = useMemo(() => `form_${id || window.location.pathname}`, [id]);
  const { clearPersistedData } = useFormPersistence(hooks, {
    enabled: persistData,
    key: formKey,
    exclude: excludeFromPersistence,
  });

  // Clear form data when component unmounts if form was submitted successfully
  useEffect(() => {
    return () => {
      if (formState.isSubmitSuccessful) {
        clearPersistedData();
      }
    };
  }, [formState.isSubmitSuccessful, clearPersistedData]);

  // Show validation errors in notifications
  useEffect(() => {
    if (!showErrorNotification) return;
    
    const errors = Object.entries(formState.errors);
    if (errors.length > 0) {
      notifications.show({
        title: "Validation Errors",
        message: errors.map(([field, error]) => `${field}: ${error?.message}`).join("\n"),
        color: "red",
      });
    }
  }, [formState.errors, showErrorNotification]);

  const handleFormSubmit: SubmitHandler<Record<string, unknown>> = useCallback(async (data) => {
    try {
      clearErrors();
      // Transform data before submission if needed
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

        if (field?._def?.transform) {
          acc[key] = field._def.transform(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, unknown>);

      await onSubmit?.(transformedData, hooks);
      
      if (showSuccessNotification) {
        notifications.show({
          title: mode === "create" ? "Created Successfully" : "Updated Successfully",
          message: "Your changes have been saved.",
          color: "green",
        });
      }

      clearPersistedData();
    } catch (error) {
      if (error instanceof Error) {
        // Handle validation errors
        const validationError = error as ValidationError;
        if (validationError.name === 'ValidationError' && validationError.errors) {
          Object.entries(validationError.errors).forEach(([field, message]) => {
            if (typeof message === 'string' && field !== 'name') {
              setError(field, { type: 'manual', message });
            }
          });
        }
        onError?.(error);

        if (showErrorNotification) {
          notifications.show({
            title: "Error",
            message: error.message || "An error occurred while saving",
            color: "red",
          });
        }
      }
    }
  }, [schema, onSubmit, hooks, mode, showSuccessNotification, clearPersistedData, setError, onError, showErrorNotification, clearErrors]);

  const handleFormError = useCallback((errors: typeof formState.errors) => {
    if (!showErrorNotification) return;
    
    const errorMessages = Object.entries(errors)
      .map(([field, error]) => `${field}: ${error?.message}`)
      .join("\n");

    notifications.show({
      title: "Validation Failed",
      message: errorMessages,
      color: "red",
    });
  }, [showErrorNotification]);

  return (
    <FormProvider {...hooks}>
      <LoadingOverlay visible={formState.isSubmitting} />
      <form 
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};
