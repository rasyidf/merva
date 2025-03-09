import { z } from 'zod';
import type { ValidationRule, ValidationRules } from '../form-builder.types';
import { patterns } from './validation-patterns';
import { createFieldValidator } from './validation';

type ValidatorFn = (value: any, formValues: Record<string, any>) => string | boolean | Promise<string | boolean>;

const composeValidators = (...validators: ValidatorFn[]) => {
  return async (value: any, formValues: Record<string, any>): Promise<string | boolean> => {
    for (const validator of validators) {
      const result = await Promise.resolve(validator(value, formValues));
      if (result !== true) return result;
    }
    return true;
  };
};

class ValidationComposer<T = any> {
  private rules: ValidationRules<T> = {};

  constructor(initialRules?: ValidationRules<T>) {
    if (initialRules) {
      this.rules = { ...initialRules };
    }
  }

  required(message?: string | boolean): ValidationComposer<T> {
    this.rules.required = message || true;
    return this;
  }

  min(value: number, message?: string): ValidationComposer<T> {
    this.rules.min = value;
    if (message) {
      this.rules.validate = composeValidators(
        (this.rules.validate as ValidatorFn) || (() => true),
        (val) => (typeof val === 'number' && val >= value) || message
      );
    }
    return this;
  }

  max(value: number, message?: string): ValidationComposer<T> {
    this.rules.max = value;
    if (message) {
      this.rules.validate = composeValidators(
        (this.rules.validate as ValidatorFn) || (() => true),
        (val) => (typeof val === 'number' && val <= value) || message
      );
    }
    return this;
  }

  minLength(value: number, message?: string): ValidationComposer<T> {
    this.rules.minLength = value;
    if (message) {
      this.rules.validate = composeValidators(
        (this.rules.validate as ValidatorFn) || (() => true),
        (val) => (typeof val === 'string' && val.length >= value) || message
      );
    }
    return this;
  }

  maxLength(value: number, message?: string): ValidationComposer<T> {
    this.rules.maxLength = value;
    if (message) {
      this.rules.validate = composeValidators(
        (this.rules.validate as ValidatorFn) || (() => true),
        (val) => (typeof val === 'string' && val.length <= value) || message
      );
    }
    return this;
  }

  pattern(regex: RegExp, message?: string): ValidationComposer<T> {
    this.rules.pattern = regex;
    if (message) {
      this.rules.validate = composeValidators(
        (this.rules.validate as ValidatorFn) || (() => true),
        (val) => (typeof val === 'string' && regex.test(val)) || message
      );
    }
    return this;
  }

  email(message = 'Invalid email address'): ValidationComposer<T> {
    return this.pattern(patterns.email, message);
  }

  phone(message = 'Invalid phone number'): ValidationComposer<T> {
    return this.pattern(patterns.phone, message);
  }

  url(message = 'Invalid URL'): ValidationComposer<T> {
    return this.pattern(patterns.url, message);
  }

  custom(fn: ValidationRule<T>): ValidationComposer<T> {
    this.rules.validate = composeValidators(
      (this.rules.validate as ValidatorFn) || (() => true),
      fn as ValidatorFn
    );
    return this;
  }

  dependsOn(...fields: string[]): ValidationComposer<T> {
    this.rules.deps = fields;
    return this;
  }

  toZod(): z.ZodType<T> {
    return createFieldValidator(this.rules);
  }

  toRules(): ValidationRules<T> {
    return this.rules;
  }
}

export const validate = <T = any>(initialRules?: ValidationRules<T>) => {
  return new ValidationComposer<T>(initialRules);
};