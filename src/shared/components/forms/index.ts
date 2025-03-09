// Core form builder
export { FormBuilder } from "./form-builder";
export { FormFields } from "./form-builder.fields";
export { registry } from "./utils/field-registry";
export { fields } from "./form-builder.fields-list";

// Form components
export { FormWizard } from "./components/form-wizard";
export { RepeatableFields } from "./components/repeatable-fields";
export { FieldsLayout } from "./components/fields-layout";
export { DetailCard } from "./components/details-card";

// Hooks
export {
  useFieldConditions,
  useFieldDependencies,
  useFieldMask,
  useFieldOptions,
  useFieldValidation,
  useFormArray,
  useFormPersistence,
  useFormWizard,
} from "./hooks";

// Types
export type {
  BaseField,
  CustomField,
  EditorProps,
  Field,
  FieldRenderer,
  FieldType,
  FormBuilderProps,
  MetaField,
  RenderFieldProps,
  SelectOption,
  ValidationRule,
  ValidationRules,
  WizardStep,
} from "./form-builder.types";

// Utils
export {
  createFieldTransformer,
  createFieldValidator,
  createDynamicSchema,
  masks,
  messages,
  patterns,
  validators,
} from "./utils";
