import { useCallback } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { MetaField } from '../form-builder.types';

export interface FormArrayOptions {
  name: string;
  fields: MetaField[];
  min?: number;
  max?: number;
  defaultValues?: Record<string, any>;
}

export const useFormArray = (
  form: UseFormReturn<any>,
  options: FormArrayOptions
) => {
  const { name, fields, min = 0, max = Infinity, defaultValues = {} } = options;
  const { getValues, setValue, watch } = form;

  const items = watch(name) || [];

  const append = useCallback((values = defaultValues) => {
    const currentItems = getValues(name) || [];
    if (currentItems.length >= max) return;
    
    setValue(name, [...currentItems, values], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [name, defaultValues, max, getValues, setValue]);

  const remove = useCallback((index: number) => {
    const currentItems = getValues(name) || [];
    if (currentItems.length <= min) return;

    const newItems = [...currentItems];
    newItems.splice(index, 1);
    
    setValue(name, newItems, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [name, min, getValues, setValue]);

  const move = useCallback((from: number, to: number) => {
    const currentItems = getValues(name) || [];
    if (
      from < 0 || 
      from >= currentItems.length || 
      to < 0 || 
      to >= currentItems.length
    ) return;

    const newItems = [...currentItems];
    const [item] = newItems.splice(from, 1);
    newItems.splice(to, 0, item);
    
    setValue(name, newItems, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [name, getValues, setValue]);

  const replace = useCallback((index: number, value: Record<string, any>) => {
    const currentItems = getValues(name) || [];
    if (index < 0 || index >= currentItems.length) return;

    const newItems = [...currentItems];
    newItems[index] = value;
    
    setValue(name, newItems, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [name, getValues, setValue]);

  const insert = useCallback((index: number, value = defaultValues) => {
    const currentItems = getValues(name) || [];
    if (currentItems.length >= max || index < 0 || index > currentItems.length) return;

    const newItems = [...currentItems];
    newItems.splice(index, 0, value);
    
    setValue(name, newItems, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [name, defaultValues, max, getValues, setValue]);

  return {
    fields,
    items,
    append,
    remove,
    move,
    replace,
    insert,
    isAtMin: items.length <= min,
    isAtMax: items.length >= max,
  };
};