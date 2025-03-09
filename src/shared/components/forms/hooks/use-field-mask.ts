import { useCallback } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export interface MaskConfig {
  field: string;
  mask: string | ((value: string) => string);
  unmasked?: (value: string) => string;
  onChange?: (value: string) => void;
}

const createMaskFunction = (mask: string) => (value: string) => {
  if (!value) return '';
  
  let result = '';
  let valueIndex = 0;
  
  for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
    if (mask[i] === '#') {
      if (/\d/.test(`${value[valueIndex]}`)) {
        result += value[valueIndex];
        valueIndex++;
      }
    } else if (mask[i] === 'A') {
      if (/[a-zA-Z]/.test(`${value[valueIndex]}`)) {
        result += value[valueIndex];
        valueIndex++;
      }
    } else if (mask[i] === '*') {
      result += value[valueIndex];
      valueIndex++;
    } else {
      result += mask[i];
      if (value[valueIndex] === mask[i]) {
        valueIndex++;
      }
    }
  }
  
  return result;
};

const defaultUnmask = (value: string) => value.replace(/[^a-zA-Z0-9]/g, '');

export const masks = {
  phone: '(###) ###-####',
  date: '##/##/####',
  creditCard: '#### #### #### ####',
  cpf: '###.###.###-##',
  cnpj: '##.###.###/####-##',
  cep: '#####-###',
  currency: (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const numberLength = numbers.length;

    if (numberLength === 0) return '';
    if (numberLength === 1) return `0.0${numbers}`;
    if (numberLength === 2) return `0.${numbers}`;

    return numbers.slice(0, -2) + '.' + numbers.slice(-2);
  },
};

export const useFieldMask = (
  form: UseFormReturn<any>,
  configs: MaskConfig[]
) => {
  const { setValue, getValues } = form;

  const applyMask = useCallback((config: MaskConfig, value: string) => {
    const { field, mask, unmasked = defaultUnmask, onChange } = config;
    
    // Apply mask
    const maskedValue = typeof mask === 'string' 
      ? createMaskFunction(mask)(value)
      : mask(value);
    
    // Store both masked and raw values
    setValue(field, maskedValue, { shouldValidate: true });
    setValue(`${field}_raw`, unmasked(maskedValue), { shouldValidate: false });
    
    onChange?.(maskedValue);
    
    return maskedValue;
  }, [setValue]);

  const getMaskedValue = useCallback((field: string) => {
    return getValues(field);
  }, [getValues]);

  const getRawValue = useCallback((field: string) => {
    return getValues(`${field}_raw`);
  }, [getValues]);

  const createMaskHandler = useCallback((config: MaskConfig) => {
    return (event: { target: { value: string } }) => {
      const { value } = event.target;
      applyMask(config, value);
    };
  }, [applyMask]);

  return {
    applyMask,
    getMaskedValue,
    getRawValue,
    createMaskHandler,
  };
};