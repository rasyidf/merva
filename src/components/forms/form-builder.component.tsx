import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider, SubmitHandler, useForm
} from 'react-hook-form';
import { FormBuilderProps } from './form-builder.types';
import { LoadingOverlay } from './form-builder';

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
  action,
  children,
  initialData
}: Readonly<FormBuilderProps>) => {
  const hooks = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: initialData
  });

  const { handleSubmit } = hooks;

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    action?.(data, hooks);
  };

  return (
    <FormProvider {...hooks}>
      <LoadingOverlay visible={hooks.formState.isSubmitting} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
