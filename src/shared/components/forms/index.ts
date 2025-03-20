// Core form components
export * from './components';

// Form builder & fields
export { FormBuilder } from "./form-builder";
export { FormFields } from "./form-builder.fields";
// export { fields } from "./form-builder.fields-list";
// export { registry } from "./utils/field-registry";

// // Re-export form hooks for easier imports
// export {
//   useFieldConditions,
//   useFieldDependencies,
//   useFieldMask,
//   useFieldOptions,
//   useFieldValidation,
//   useFormArray,
//   useFormPersistence,
//   useFormWizard,
// } from "./hooks";

// // Export form utilities
// export {
//   createFieldTransformer,
//   createFieldValidator,
//   createDynamicSchema,
//   masks,
//   messages,
//   patterns,
//   validators,
// } from "./utils";

// Export form types
export type {
  BaseField,
  CustomField,
  EditorProps,
  Field,
  FieldRenderer,
  FieldType,
  FormBuilderProps,
  // MetaField,
  RenderFieldProps,
  // SelectOption,
  // ValidationRule,
  // ValidationRules,
  // WizardStep,
} from "./form-builder.types";
