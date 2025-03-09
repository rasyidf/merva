import { z } from 'zod';
import type { ValidationRules, FieldType } from '../form-builder.types';

type ValidatorType = z.ZodType<any, any, any>;

const getBaseValidator = (type: FieldType): ValidatorType => {
  switch (type) {
    case 'number':
      return z.number();
    case 'date':
    case 'datetime':
      return z.date();
    case 'checkbox':
      return z.boolean();
    case 'multiselect':
    case 'tags':
      return z.array(z.string());
    case 'text':
    case 'email':
    case 'password':
    case 'textarea':
    case 'select':
    case 'radio':
    case 'phone':
    case 'badge':
    default:
      return z.string();
  }
};

export const createFieldValidator = (rules: ValidationRules & { type?: FieldType }): ValidatorType => {
  const baseValidator = getBaseValidator(rules.type || 'text');
  let schema = baseValidator;

  if (rules.required) {
    schema = baseValidator.superRefine((val, ctx) => {
      if (val === undefined || val === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'This field is required'
        });
        return;
      }
      if (typeof val === 'string' && val.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'This field is required'
        });
        return;
      }
      if (Array.isArray(val) && val.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'This field is required'
        });
        return;
      }
    });
  } else {
    schema = schema.optional().nullable();
  }

  if (typeof rules.min === 'number' && baseValidator instanceof z.ZodNumber) {
    schema = schema.superRefine((val, ctx) => {
      if (val !== undefined && val !== null && val < rules.min!) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Value must be greater than or equal to ${rules.min}`
        });
      }
    });
  }

  if (typeof rules.max === 'number' && baseValidator instanceof z.ZodNumber) {
    schema = schema.superRefine((val, ctx) => {
      if (val !== undefined && val !== null && val > rules.max!) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Value must be less than or equal to ${rules.max}`
        });
      }
    });
  }

  if (typeof rules.minLength === 'number' && baseValidator instanceof z.ZodString) {
    schema = schema.superRefine((val, ctx) => {
      if (val !== undefined && val !== null && val.length < rules.minLength!) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Must be at least ${rules.minLength} characters`
        });
      }
    });
  }

  if (typeof rules.maxLength === 'number' && baseValidator instanceof z.ZodString) {
    schema = schema.superRefine((val, ctx) => {
      if (val !== undefined && val !== null && val.length > rules.maxLength!) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Must be at most ${rules.maxLength} characters`
        });
      }
    });
  }

  if (rules.pattern instanceof RegExp && baseValidator instanceof z.ZodString) {
    schema = schema.superRefine((val, ctx) => {
      if (val !== undefined && val !== null && !rules.pattern!.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid format'
        });
      }
    });
  }

  if (typeof rules.validate === 'function') {
    schema = schema.superRefine((val, ctx) => {
      const result = rules.validate!(val);
      if (!result) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: typeof result === 'string' ? result : 'Validation failed'
        });
      }
    });
  }

  return schema;
};

export const createDynamicSchema = (fields: Record<string, ValidationRules & { type?: FieldType }>) => {
  const shape = Object.entries(fields).reduce((acc, [field, rules]) => {
    acc[field] = createFieldValidator(rules);
    return acc;
  }, {} as Record<string, ValidatorType>);

  return z.object(shape);
};