import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { MetaField } from '../form-builder.types';

export interface DependencyRule {
  field: string;
  dependsOn: string[];
  effect: (values: any[], form: UseFormReturn<any>) => void;
}

export interface FieldDependency {
  sourceField: string;
  targetField: string;
  rule: (sourceValue: any) => boolean;
  effect: 'show' | 'hide' | 'enable' | 'disable' | 'require' | ((form: UseFormReturn<any>) => void);
}

export const useFieldDependencies = (
  form: UseFormReturn<any>,
  fields: MetaField[],
  dependencies: FieldDependency[]
) => {
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set(fields.map(f => f.name)));
  const [enabledFields, setEnabledFields] = useState<Set<string>>(new Set(fields.map(f => f.name)));
  const [requiredFields, setRequiredFields] = useState<Set<string>>(
    new Set(fields.filter(f => f.validation?.required).map(f => f.name))
  );

  const { watch, setValue, clearErrors } = form;
  
  // Use refs to store mutable state that won't trigger re-renders
  const visibleFieldsRef = useRef(visibleFields);
  const enabledFieldsRef = useRef(enabledFields);
  const requiredFieldsRef = useRef(requiredFields);

  // Update refs when state changes
  useEffect(() => {
    visibleFieldsRef.current = visibleFields;
    enabledFieldsRef.current = enabledFields;
    requiredFieldsRef.current = requiredFields;
  }, [visibleFields, enabledFields, requiredFields]);

  const applyEffect = useCallback((
    targetField: string,
    effect: FieldDependency['effect'],
    form: UseFormReturn<any>
  ) => {
    if (typeof effect === 'function') {
      effect(form);
      return;
    }

    switch (effect) {
      case 'show':
        setVisibleFields(prev => {
          const next = new Set(prev);
          next.add(targetField);
          return next;
        });
        break;
      case 'hide':
        setVisibleFields(prev => {
          const next = new Set(prev);
          next.delete(targetField);
          return next;
        });
        setValue(targetField, undefined, { shouldValidate: false });
        clearErrors(targetField);
        break;
      case 'enable':
        setEnabledFields(prev => {
          const next = new Set(prev);
          next.add(targetField);
          return next;
        });
        break;
      case 'disable':
        setEnabledFields(prev => {
          const next = new Set(prev);
          next.delete(targetField);
          return next;
        });
        break;
      case 'require':
        setRequiredFields(prev => {
          const next = new Set(prev);
          next.add(targetField);
          return next;
        });
        break;
    }
  }, [setValue, clearErrors]);

  useEffect(() => {
    const subscriptions = dependencies.map(dependency => {
      const { sourceField, targetField, rule, effect } = dependency;
      
      return watch(sourceField, (value: any) => {
        if (rule(value)) {
          applyEffect(targetField, effect, form);
        } else {
          // Reset to default state using refs to avoid triggering re-renders
          if (effect === 'show' && visibleFieldsRef.current.has(targetField)) {
            applyEffect(targetField, 'hide', form);
          }
          if (effect === 'hide' && !visibleFieldsRef.current.has(targetField)) {
            applyEffect(targetField, 'show', form);
          }
          if (effect === 'enable' && enabledFieldsRef.current.has(targetField)) {
            applyEffect(targetField, 'disable', form);
          }
          if (effect === 'disable' && !enabledFieldsRef.current.has(targetField)) {
            applyEffect(targetField, 'enable', form);
          }
          if (effect === 'require' && requiredFieldsRef.current.has(targetField)) {
            setRequiredFields(prev => {
              const next = new Set(prev);
              next.delete(targetField);
              return next;
            });
          }
        }
      });
    });

    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
    };
  }, [dependencies, watch, form, applyEffect]);

  return {
    isVisible: useCallback((fieldName: string) => visibleFields.has(fieldName), [visibleFields]),
    isEnabled: useCallback((fieldName: string) => enabledFields.has(fieldName), [enabledFields]), 
    isRequired: useCallback((fieldName: string) => requiredFields.has(fieldName), [requiredFields]),
  };
};