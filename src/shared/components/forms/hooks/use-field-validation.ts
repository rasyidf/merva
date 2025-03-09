import { useCallback, useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useDebouncedValue } from '@mantine/hooks';

export interface ValidationConfig {
  field: string;
  validate: (value: any, formValues: Record<string, any>) => Promise<string | boolean> | string | boolean;
  dependencies?: string[];
  debounceMs?: number;
}

export const useFieldValidation = (
  form: UseFormReturn<any>,
  configs: ValidationConfig[]
) => {
  const [validating, setValidating] = useState<Record<string, boolean>>({});
  const { watch, trigger, setError, clearErrors } = form;

  const validateField = useCallback(async (config: ValidationConfig) => {
    const { field, validate, dependencies = [] } = config;
    const values = form.getValues();
    const value = values[field];
    const dependencyValues = dependencies.map(dep => values[dep]);

    try {
      setValidating(prev => ({ ...prev, [field]: true }));
      const result = await validate(value, { ...values, _deps: dependencyValues });

      if (result === true || result === undefined) {
        clearErrors(field);
      } else if (typeof result === 'string') {
        setError(field, { message: result });
      }
    } catch (error) {
      setError(field, {
        message: error instanceof Error ? error.message : 'Validation failed'
      });
    } finally {
      setValidating(prev => ({ ...prev, [field]: false }));
    }
  }, [form, setError, clearErrors]);

  useEffect(() => {
    const subscriptions = configs.map(config => {
      const fieldsToWatch = [config.field, ...(config.dependencies || [])];
      const [debouncedValidate] = useDebouncedValue(
        () => validateField(config),
        config.debounceMs || 300
      );

      const unsubscribe = watch(fieldsToWatch, () => {
        debouncedValidate();
      });
      return () => unsubscribe.forEach(fn => fn());
    });

    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
    };
  }, [configs, watch, validateField]);

  const validateFields = useCallback(async () => {
    const results = await Promise.all(
      configs.map(async config => {
        await validateField(config);
        return trigger(config.field);
      })
    );
    return results.every(Boolean);
  }, [configs, validateField, trigger]);

  return {
    validating,
    validateFields,
    validateField
  };
};